import axios from "axios"
import { createSearchParams } from "react-router-dom"
import jwtAxios from "../../users/jwt/jwtUtil";
import { backServer } from "../../commons/Loc";

export const getListProduct = async(queryObj) => {

    const queryString = createSearchParams(queryObj).toString();

    const {data} = await jwtAxios.get(`${backServer}/product/list?${queryString}`)

    return data
}

export const getOneProduct = async(id) => {

    const {data} = await jwtAxios.get(`${backServer}/product/${id}`)

    return data
}

export const modifyProduct = async(form) => {

    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await jwtAxios.put(`${backServer}/product/`, form, header)

    return data;

}

export const deleteProduct = async(id) => {

    const {data} = await jwtAxios.delete(`${backServer}/product/${id}`)

    return data
    
}