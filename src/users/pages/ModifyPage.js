import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { modifyInfo } from "../api/loginAPI";

const initState = {
    accessToken : '',
    email: '',
    pw:'',
    isSocial: false,
    nickName: '',
    profile: '',
    refreshToken: '',
    roleNames: []
}

const ModifyPage = () => {

    const selector = useSelector(select => select.login)

    const [modify, setModify] = useState(initState)

    const ref = useRef()

    useEffect(() => {
        setModify({...selector, pw:''})
    }, [selector])

    // 프로필 클릭시
    const handleClickImg = () => {
        ref.current.click()
    }

    // 내용 수정시
    const handleOnChange = (e) => {
        modify[e.target.name] = e.target.value
        setModify({modify})
    }

    // 수정 클릭시
    const handleClickModify = () => {
        
        const formData = new FormData();

        const files = ref.current.files;
        
        if(modify.email === '' || modify.pw === ''){
            alert('내용이 없습니다')
            return
        }

        if(files !== null && files.length > 0){
            const fileName = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
            
            if(fileName === 'png' || fileName === 'jpg'){
                formData.append("file", files[0]);
            } else {
                alert('이미지 형식은 png, jpg 만 등록 가능합니다')
                return
            }

        }

        formData.append("email", modify.email)
        formData.append("realEmail", selector.email)
        formData.append("pw", modify.pw)
        formData.append("nickName", modify.nickName)
        formData.append("isSocial", modify.isSocial)
        formData.append("roleNames", modify.roleNames)
    
    }

    return ( 
        <div>
            <div className="flex justify-center items-center h-screen overflow-scroll">
                <div className="h-auto w-2/3">
                    <div className="mb-3 bg-white w-28">
                        <div className="text-2xl text-center"> 회원수정 </div>
                    </div>
                    <div className="bg-white p-3">
                        <div>
                            <button className="p-3 bg-lime-400" onClick={handleClickImg}>
                                <img src={`http://localhost/user_profile/someUserProfile.jpg`} className="w-20 h-20 rounded-full bg-neutral-500 border-2"></img>
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
                                        <button className="w-10 h-6 ml-3 bg-sky-500 text-xs"> 채크 </button>
                                        { false ? <div className="text-sm mt-2 text-red-600"> 채크를 요합니다 </div> :
                                        <div className="text-sm mt-2 text-blue-600"> 사용 가능합니다 </div>  
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
                            <button className="h-9 w-20 rounded-sm border-2 border-gray-900 bg-slate-400" onClick={handleClickModify}> 수정하기 </button>
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
 
export default ModifyPage;