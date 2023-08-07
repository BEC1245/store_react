import axios from "axios";
import { getCookie, setCookie } from "./cookieUtils";
import { useDispatch } from "react-redux";
import { postLoginThunk } from "../../store/reducer/loginSlice";

const jwtAxios = axios.create()

const beforeReq = async(config) => {

    const formData = new FormData()

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

    if(res.data.error === 'Expired'){

        console.log("Access Token has expired")
        const newAccessToken = await refreshJWT()

        const originalRequest = res.config

        originalRequest.headers.Authorization =`Bearer ${newAccessToken}`

        return await axios(originalRequest)

    }

    return res

}

const responseFail  = (err) => {
    console.log("response fail...........")

    return Promise.reject(err)
}

// used methods
const refreshJWT = async () => {

    const cookieValue = getCookie("login")

    const {accessToken, refreshToken} = cookieValue

    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const res = await axios.get(`http://localhost:8080/api/member/refresh?refreshToken=${refreshToken}`, header)

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

    const {data} = await axios.post('http://localhost:8080/api/user/login', formData, header)

    console.log('-------------------------------------');
    console.log('-------------------------------------');

    console.log(data);

    console.log('-------------------------------------');
    console.log('-------------------------------------');

    setCookie("login", data, 1)

}

// 요청 하기전
jwtAxios.interceptors.request.use(beforeReq, requestFail)

// 응답 받기전
// jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios