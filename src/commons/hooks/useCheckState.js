import { useDispatch, useSelector } from "react-redux";
import { machCookieState } from "../../store/reducer/loginSlice";
import { getCookie } from "../../users/jwt/cookieUtils";
import { useEffect } from "react";

// role == [GUEST, USER, ADMIN]
const useCheckState = (role, loc) => {

    const state = useSelector(select => select.login);

    const dispatch = useDispatch()

    useEffect(() => {

        if(!getCookie("login")){
            return
        }

        const res = getCookie("login")

        const {accessToken, refreshToken, roleNames} = res

        console.log(state.accessToken, state.refreshToken, 'check redux state');
        console.log(accessToken, refreshToken, 'cookie state');
    
        if(state.accessToken !== accessToken || state.refreshToken !== refreshToken){
            dispatch(machCookieState())
        }
    
        if(role && loc && !roleNames.includes(role.toUpperCase())){
            loc()
        }

    }, [state])

    return state
}

export default useCheckState

