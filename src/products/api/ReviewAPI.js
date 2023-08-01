import axios from "axios"

export const getReviewList = async(cursor, product_id) => {

    const {data} = await axios.get(`http://localhost:8080/review/list?cursor=${cursor}&id=${product_id}`)

    return data;
}

export const getReviewImg = async(review_id) => {

    const {data} = await axios.get(`http://localhost:8080/review/img/${review_id}`)

    return data;
}

export const postReview = async(formData) => {
    
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        } 
    }

    const {data} = await axios.post('http://localhost:8080/review/', formData, header)

    return data
}

