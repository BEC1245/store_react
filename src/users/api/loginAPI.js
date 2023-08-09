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
