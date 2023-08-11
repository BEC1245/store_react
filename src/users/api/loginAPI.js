import axios from "axios"

export const login = async(formData) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.post(`http://localhost:8080/api/user/login`, formData, header)

    return data;
    
}

export const modifyInfo = async(formData) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.put(`http://localhost:8080/api/user/modify`, formData, header)

    return data;
    
}

export const getOneUser = async(email) => {

    const {data} = await axios.get(`http://localhost:8080/api/user/email?email=${email}`)

    return data

}

export const registUser = async(formData) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.post(`http://localhost:8080/api/user/signin`, formData, header)

    return data;
    
}

export const deleteUser = async(id) => {

    const {data} = await axios.delete(`http://localhost:8080/api/user/resign/${id}`)

    return data

}

export const restoreUser = async(id) => {

    const {data} = await axios.put(`http://localhost:8080/api/user/restore/${id}`)

    return data

}
