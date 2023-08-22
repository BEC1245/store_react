import { backServer } from "../../commons/Loc";
import jwtAxios from "../../users/jwt/jwtUtil";

export const getReviewList = async(cursor, product_id) => {

    const {data} = await jwtAxios.get(`${backServer}/review/list?cursor=${cursor}&id=${product_id}`)

    return data;
}

export const getReview = async(review_id) => {

    const {data} = await jwtAxios.get(`${backServer}/review/${review_id}`)

    return data;
}

export const postReview = async(formData) => {
    
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await jwtAxios.post(`${backServer}/review/`, formData, header)

    return data
}

export const deleteReview = async(review_id) => {
    
    await jwtAxios.delete(`${backServer}/review/${review_id}`)

}

export const putReview = async(formData) => {
    
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }
    
    await jwtAxios.put(`${backServer}/review/`, formData, header)
}




