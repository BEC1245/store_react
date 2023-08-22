import axios from "axios";
import { getCookie, setCookie } from "./cookieUtils";
import { useDispatch } from "react-redux";
import { postLoginThunk } from "../../store/reducer/loginSlice";
import { backServer } from "../../commons/Loc";

const jwtAxios = axios.create()

const beforeReq = async(config) => {

    console.log("beforeRequest.................")

    console.log(getCookie("login"))

    if(!getCookie("login")){
        await guestLogin()
    }

    const {accessToken} = getCookie("login")

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

const requestFail = (err) => {

    console.log("request fail..............")

    return Promise.reject(err)
}

const beforeRes = async(res) => {

    console.log("2xx Response.............")

    console.log(res)

    if(res.data.error === 'EXPIRED'){

        const cookieValue = getCookie("login")

        console.log("Access Token has expired")
        const newAccessToken = await refreshJWT(cookieValue).catch(async err => {

            alert('로그인이 완전히 만료 되였습니다')
            const { accessToken } = await guestLogin()
            return accessToken
            
        })

        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return await axios(originalRequest)

    }

    return res

}

const responseFail  = (err) => {
    console.log("response fail...........")

    return Promise.reject(err)
}

// used methods
const refreshJWT = async (cookieValue) => {

    const {accessToken, refreshToken} = cookieValue

    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const res = await axios.get(`${backServer}/api/user/refresh?refreshToken=${refreshToken}`, header)

    const newAccess = res.data.accessToken
    const newRefresh = res.data.refreshToken

    console.log("--------------------------------")
    console.log("new access :" + newAccess)
    console.log("new refresh :" + newRefresh)


    cookieValue.accessToken = newAccess
    cookieValue.refreshToken = newRefresh
    console.log("--------------------------------")
    console.log(cookieValue)

    setCookie("login", JSON.stringify(cookieValue), 1)

    return newAccess

}

const guestLogin = async() => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const formData = new FormData()

    formData.append("username", "guest")
    formData.append("password", "1111")

    const {data} = await axios.post(`${backServer}/api/user/login`, formData, header)

    setCookie("login", JSON.stringify(data), 1)

    return data;
}

// 요청 하기전
jwtAxios.interceptors.request.use(beforeReq, requestFail)

// 응답 받기전
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios