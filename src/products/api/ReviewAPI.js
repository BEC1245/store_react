import axios from "axios"

export const getReviewList = async(cursor, product_id) => {

    const {data} = await axios.get(`http://localhost:8080/review/list?cursor=${cursor}&id=${product_id}`)

    return data;
}