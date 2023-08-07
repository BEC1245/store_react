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
