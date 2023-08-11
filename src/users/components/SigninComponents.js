import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, registInfo, registUser } from "../api/loginAPI";
import { postLoginThunk } from "../../store/reducer/loginSlice";
import useQueryObj from "../../commons/hooks/useQueryObj";


const initState = {
    email: '',
    pw:'',
    nickName: '',
    isRegistable: false,
    errorMsg: ''
}

const SinginComponent = () => {

    const dispatch = useDispatch()

    const [regist, setRegist] = useState(initState)

    const { moveProductList } = useQueryObj()

    const ref = useRef()

    // 프로필 클릭시
    const handleClickImg = () => {
        ref.current.click()
    }

    // 내용 수정시
    const handleOnChange = (e) => {

        if(e.target.name === 'email' && e.target.value.length > 50){
            return
        }

        regist[e.target.name] = e.target.value
        setRegist({...regist})
    }

    // 이메일 채크 클릭시
    const handleClickChacker = () => {

        const email = regist.email

        getOneUser(email).then(data => {

            // 데이터가 있으면 오류
            if(data){
                regist.errorMsg = '사용할 수 없는 이메일 입니다'
                regist.isRegistable = false
                setRegist({...regist})
                return
            }
            regist.isRegistable = true
            setRegist({...regist})

        })

    }

    // 등록 클릭시
    const handleClickregist = () => {

        const cancelList = [(regist.isRegistable), 
                            (regist.email !== '' && regist.pw !== '' && regist.nickName !== ''), 
                            regist.email.length > 9 && regist.pw.length > 12]

        for(let ele in cancelList){

            if(cancelList[ele] === false){

                console.log(regist, 'error ocured in registpage');

                let errorMsg = ''

                switch (ele) {
                    case '0': errorMsg = '이메일을 먼저 채크해야 합니다'; break;
                    case '1': errorMsg = '이메일, 비밀번호, 닉네임은 내용이 들어가 있어야 합니다'; break;
                    case '2': errorMsg = '이메일은 9자 비번은 12자가 넘어야 합니다'; break;
                }

                regist.errorMsg = errorMsg;
                setRegist({...regist})
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
                regist.errorMsg = '이미지 형식은 png, jpg 만 등록 가능합니다';
                setRegist({...regist})
                return
            }

        }

        formData.append("email", regist.email)
        formData.append("pw", regist.pw)
        formData.append("nickName", regist.nickName)
        formData.append("profile", 'NONE')

        registUser(formData).then(data => {

            const loginForm = new FormData()

            loginForm.append("username", regist.email)
            loginForm.append("password", regist.pw)

            dispatch(postLoginThunk(loginForm)).unwrap().then(data => {
                moveProductList()
            })
        })

    }

    return ( 
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="w-1/3 h-auto">
                    <div className="mb-3 bg-white w-28">
                        <div className="text-2xl text-center"> 회원가입 </div>
                    </div>
                    <div className="p-3 bg-white">
                        <div className="flex justify-center">
                            <button>
                                <div 
                                className="h-32 w-32 border-4 rounded-3xl border-gray-600 bg-white"
                                onClick={handleClickImg}
                                ></div>
                                <input type="file" ref={ref} hidden></input>
                            </button>
                        </div>
                        <div className="my-3">
                            email: <input type="text" className="border-2" name="email" onChange={handleOnChange} value={regist.email}/>
                            <button className="w-10 h-6 ml-3 bg-sky-500 text-xs" onClick={handleClickChacker}> 채크 </button>
                            { regist.isRegistable ? <div className="text-sm mt-2 text-blue-600"> 사용 가능합니다 </div> :
                              <div className="text-sm mt-2 text-red-600"> 채크를 요합니다 </div>  
                            }
                        </div>
                        <div className="my-3">
                            password: <input type="text" className="border-2" name="pw" onChange={handleOnChange} value={regist.pw}/>
                        </div>
                        <div className="my-3">
                            nickName: <input type="text" className="border-2" name="nickName" onChange={handleOnChange} value={regist.nickName}/>
                        </div>
                        { regist.errorMsg ? <div className="text-2xl text-rose-500 mb-2"> { regist.errorMsg } </div> : <></>}
                        <div className="my-3">
                            <button className="w-20 h-7 bg-amber-300 rounded-lg" onClick={handleClickregist}> 가입하기 </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SinginComponent;