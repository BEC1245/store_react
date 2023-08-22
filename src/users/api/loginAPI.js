import axios from "axios"
import { backServer } from "../../commons/Loc";

export const login = async(formData) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.post(`${backServer}/api/user/login`, formData, header)

    return data;
    
}

export const modifyInfo = async(formData) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.put(`${backServer}/api/user/modify`, formData, header)

    return data;
    
}

export const getOneUser = async(email) => {

    const {data} = await axios.get(`${backServer}/api/user/email?email=${email}`)

    return data

}

export const registUser = async(formData) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.post(`${backServer}/api/user/signin`, formData, header)

    return data;
    
}

export const deleteUser = async(id) => {

    const {data} = await axios.delete(`${backServer}/api/user/resign/${id}`)

    return data

}

export const restoreUser = async(id) => {

    const {data} = await axios.put(`${backServer}/api/user/restore/${id}`)

    return data

}
