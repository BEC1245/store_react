import axios from "axios"
import { createSearchParams } from "react-router-dom"

export const getListProduct = async(queryObj) => {

    const queryString = createSearchParams(queryObj).toString();

    const {data} = await axios.get(`http://localhost:8080/product/list?${queryString}`)

    return data
}