import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
    return cookies.get(name)
}

export const setCookie = (name, value, days, path="/") => {

    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    return cookies.set(name, value, { path:path, expires:expires })

}

export const removeCookie = (name, path="/") => {
    cookies.remove(name, { path:path })
}