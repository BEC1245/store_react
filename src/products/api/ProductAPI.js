import axios from "axios"
import { createSearchParams } from "react-router-dom"

export const getListProduct = async(queryObj) => {

    const queryString = createSearchParams(queryObj).toString();

    const {data} = await axios.get(`http://localhost:8080/product/list?${queryString}`)

    return data
}

export const getOneProduct = async(id) => {

    const {data} = await axios.get(`http://localhost:8080/product/${id}`)

    return data
}

export const modifyProduct = async(form) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.put(`http://localhost:8080/product/`, form, header)

    return data;

}

export const deleteProduct = async(id) => {

    const {data} = await axios.delete(`http://localhost:8080/product/${id}`)

    return data
    
}