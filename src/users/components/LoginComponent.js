import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginThunk } from "../../store/reducer/loginSlice";
import useQueryObj from "../../commons/hooks/useQueryObj";
import { useNavigate } from "react-router-dom";


const initState = {
    email: '',
    password: ''
}

const LoginComponent = () => {

    const [login, setLogin] = useState(initState)

    const { moveList } = useQueryObj()

    const selector = useSelector(select => select.login)

    const dispatch = useDispatch()

    const naviage = useNavigate()

    useEffect(() => {

        if(selector.errorMsg && selector.errorMsg === 'LOGIN_FAILURE') {
            console.log("login fail................")
            
        }else if(selector.roleNames.includes('USER') || selector.roleNames.includes('ADMIN')){
            naviage("/product/list")
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
        </div>
     );
}
 
export default LoginComponent;