import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginThunk } from "../../store/reducer/loginSlice";
import useQueryObj from "../../commons/hooks/useQueryObj";
import { useRef } from "react";

const initState = {
    email: '',
    password: ''
}

const LoginComponent = () => {

    const [login, setLogin] = useState(initState)

    const { moveProductList } = useQueryObj()

    const selector = useSelector(select => select.login)

    const dispatch = useDispatch()

    const ref = useRef()

    useEffect(() => {

        if(selector.errorMsg) {
            console.log(selector.errorMsg, 'check errorMsg in loginComponent');
            console.log("login fail................")
            
        } else if(selector.roleNames.includes('USER') || selector.roleNames.includes('ADMIN')){
            moveProductList()
        }

    }, [selector])

    const handleOnChange = (e) => {
        login[e.target.name] = e.target.value
        setLogin({...login})
    }

    const handleLoginClick = () => {
        
        const formData = new FormData()

        formData.append("username", login.email)
        formData.append("password", login.password)

        dispatch(postLoginThunk(formData))
    }

    return ( 
        <div>
            { selector.errorMsg ? <div className="text-2xl text-red-500"> 로그인 실패 </div> : <></> }
            <div>
                email: <input type="text" name="email" onChange={handleOnChange} className="border-2"></input>
            </div>
            <div>
                password: <input type="text" name="password" onChange={handleOnChange} className="border-2"></input>
            </div>
            <button onClick={handleLoginClick} className="m-3 h-8 w-16 rounded-lg bg-red-600 text-white"> Login </button>
            <a href="http://localhost:8080/oauth2/authorization/kakao" className="p-4">
                <div className="w-full h-16 bg-yellow-400"> 카카오 로그인 </div>
            </a>
        </div>
     );
}
 
export default LoginComponent;