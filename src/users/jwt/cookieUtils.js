import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
    
    const userInfo = cookies.get(name)

    if(userInfo) {
        userInfo.nickName = decodeURIComponent(userInfo.nickName)
        userInfo.profile = decodeURIComponent(userInfo.profile)
    }

    return userInfo;
    
}

export const setCookie = (name, value, days, path="/") => {

    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);
    
    return cookies.set(name, value, { path:path, expires:expires })


}

export const removeCookie = (name, path="/") => {
    cookies.remove(name, { path:path })
}