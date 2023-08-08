import jwtAxios from "../../users/jwt/jwtUtil";

export const getReviewList = async(cursor, product_id) => {

    const {data} = await jwtAxios.get(`http://localhost:8080/review/list?cursor=${cursor}&id=${product_id}`)

    return data;
}

export const getReview = async(review_id) => {

    const {data} = await jwtAxios.get(`http://localhost:8080/review/${review_id}`)

    return data;
}

export const postReview = async(formData) => {
    
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await jwtAxios.post('http://localhost:8080/review/', formData, header)

    return data
}

export const deleteReview = async(review_id) => {
    
    await jwtAxios.delete(`http://localhost:8080/review/${review_id}`)

}

export const putReview = async(formData) => {
    
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }
    
    await jwtAxios.put('http://localhost:8080/review/', formData, header)
}




