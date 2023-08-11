

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, modifyInfo } from "../api/loginAPI";
import { Link, useNavigate } from "react-router-dom";
import { postLoginThunk } from "../../store/reducer/loginSlice";
import LayoutModal from "../../commons/modals/layoutModal";
import useModal from "../../commons/hooks/useModal";
import DeleteModal from "./DeleteModal";
import useQueryObj from "../../commons/hooks/useQueryObj";

const initState = {
    accessToken : '',
    id: 0,
    email: '',
    pw:'',
    isSocial: false,
    nickName: '',
    profile: '',
    refreshToken: '',
    roleNames: [],
    isModifyable: false,
    errorMsg: ''
}

const ModifyComponent = () => {

    const selector = useSelector(select => select.login)

    const dispatch = useDispatch()

    const [modify, setModify] = useState(initState)

    const {isOpen, modalClose, modalOpen} = useModal();

    const { moveProductList } = useQueryObj()

    const ref = useRef()

    useEffect(() => {
        setModify({...selector, pw:'', isModifyable:selector.isSocial, errorMsg:''})
    }, [selector])

    // 프로필 클릭시
    const handleClickImg = () => {
        ref.current.click()
    }

    // 내용 수정시
    const handleOnChange = (e) => {

        if(e.target.name === 'email' && e.target.value.length > 50){
            return
        }

        modify[e.target.name] = e.target.value
        setModify({...modify})
    }

    // 이메일 채크 클릭시
    const handleClickChacker = () => {

        const email = modify.email

        if(email === selector.email){
            modify.isModifyable = true
            setModify({...modify})
            return
        }

        getOneUser(email).then(data => {

            // 데이터가 있으면 오류
            if(data){
                modify.errorMsg = '사용할 수 없는 이메일 입니다'
                modify.isModifyable = false
                setModify({...modify})
                return
            }
            modify.isModifyable = true
            setModify({...modify})

        })

    }

    // 수정 클릭시
    const handleClickModify = () => {

        const cancelList = [(modify.isModifyable), 
                            (modify.email !== '' && modify.pw !== '' && modify.nickName !== ''), 
                            modify.email.length > 9 && modify.pw.length > 12]

        for(let ele in cancelList){

            if(cancelList[ele] === false){

                console.log(modify, 'error ocured in modifypage');

                let errorMsg = ''

                switch (ele) {
                    case '0': errorMsg = '이메일을 먼저 채크해야 합니다'; break;
                    case '1': errorMsg = '이메일, 비밀번호, 닉네임은 내용이 들어가 있어야 합니다'; break;
                    case '2': errorMsg = '이메일은 9자 비번은 12자가 넘어야 합니다'; break;
                }

                modify.errorMsg = errorMsg;
                setModify({...modify})
                return;
            }

        }

        const formData = new FormData();

        const files = ref.current.files;

        if(files !== null && files.length > 0){
            const fileName = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
            
            if(fileName === 'png' || fileName === 'jpg'){
                formData.append("file", files[0]);
            } else {
                modify.errorMsg = '이미지 형식은 png, jpg 만 등록 가능합니다';
                setModify({...modify})
                return
            }

        }

        formData.append("id", modify.id)
        formData.append("email", modify.email)
        formData.append("pw", modify.pw)
        formData.append("nickName", modify.nickName)
        formData.append("isSocial", modify.isSocial)
        formData.append("roleNames", modify.roleNames)

        modifyInfo(formData).then(data => {
            alert('회원 정보 수정이 완료되였습니다')

            const loginForm = new FormData()
            loginForm.append("username", modify.email)
            loginForm.append("password", modify.pw)
            
            dispatch(postLoginThunk(loginForm)).unwrap().then(ele => { moveProductList() })
        })
    
    }

    return ( 
        <div>
            { isOpen && 
            <LayoutModal modalClose={modalClose}>
                <DeleteModal selector={selector} dispatch={dispatch} moveProductList={moveProductList}></DeleteModal>
            </LayoutModal> }
            <div className="flex justify-center items-center h-screen overflow-scroll">
                <div className="h-auto w-2/3">
                    <div className="mb-3 bg-white w-28">
                        <div className="text-2xl text-center"> 회원수정 </div>
                    </div>
                    <div className="bg-white p-3">
                        <div>
                            <button className="p-3 bg-lime-400" onClick={handleClickImg}>
                                <img src={`http://localhost/user_profile/${modify.profile}`} className="w-20 h-20 rounded-full bg-neutral-500 border-2"></img>
                                <input type="file" multiple className="hidden" ref={ref}></input>
                            </button>
                        </div>
                        <div className="p-1 mt-3">
                            <div className="mb-3"> 
                                { modify.isSocial ? 
                                    <div>
                                       email: <input type="text" className="w-1/3 mx-2 border-2" value={modify.email} readOnly></input> 
                                    </div>:
                                    <div>
                                       email: <input 
                                        type="text" 
                                        className="w-1/3 mx-2 border-2" 
                                        value={modify.email} 
                                        name="email" 
                                        onChange={handleOnChange}></input>
                                        <button className="w-10 h-6 ml-3 bg-sky-500 text-xs" onClick={handleClickChacker}> 채크 </button>
                                        { modify.isModifyable ? <div className="text-sm mt-2 text-blue-600"> 사용 가능합니다 </div> :
                                                                <div className="text-sm mt-2 text-red-600"> 채크를 요합니다 </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                password: <input type="text" className="w-1/3 mx-2 border-2" name="pw" value={modify.pw} onChange={handleOnChange}></input>
                            </div>
                            <div className="mb-3">
                                nickName: <input type="text" className="w-1/3 mx-2 border-2" name="nickName" value={modify.nickName} onChange={handleOnChange}></input>
                            </div>
                            { modify.errorMsg ? <div className="text-2xl text-rose-500 mb-2"> { modify.errorMsg } </div> : <></>}
                            <div className="flex">
                                <button className="h-9 w-20 rounded-sm border-2 border-gray-900 bg-slate-400" onClick={handleClickModify}> 수정하기 </button>
                                <Link to={'/product/list'}>
                                    <button className="h-9 w-20 ml-4 rounded-sm border-2 border-gray-900 bg-slate-400"> 돌아가기 </button>
                                </Link>
                                <button className="h-9 w-20 ml-4 rounded-sm border-2 border-red-700 bg-red-500" onClick={modalOpen}> 삭제하기 </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 p-3 bg-white">
                        <div className="text-xs mt-2 text-gray-700">
                            프로필 변경은 이미지 부분을 클릭 하면 됩니다.
                        </div>
                       { modify.isSocial && modify.roleNames.includes('GUEST') ? <div className="text-base mt-2 text-red-600">
                            첫 소셜 로그인의 경우 회원 정보 수정이 필요합니다
                        </div> : <></> }
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default ModifyComponent;