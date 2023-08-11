import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const nullCheck = (obj) => {

    const result = {}

    for(let attr in obj){
        const attrName = attr
        const attrValue = obj[attr]
    
        if(attrValue && attrValue !== 'null'){
          result[attrName] = attrValue
        }
    }

    return result
}

const searchInit = {
    page: 1,
    size: 10,
    limit: 30,
    keyword: '',
    searchType: '',
    orderBy: ''
}

const useQueryObj = () => {

    // queryObj Part
    const [search, setSearch] = useSearchParams();

    const page = search.get('page') || 1
    const size = search.get('size') || 10
    const limit = search.get('limit') || 30
    const keyword = search.get('keyword')
    const searchType = search.get('searchType')
    const orderBy = search.get('orderBy')

    const queryObj = nullCheck({page, size, limit, keyword, searchType, orderBy})

    const navigate = useNavigate();

    const moveList = () => {
        const searchParams = createSearchParams(queryObj).toString();

        navigate(`../list?${searchParams}`)
    }

    const moveRead = (id) => {
        const searchParams = createSearchParams(queryObj).toString();

        navigate(`../read/${id}?${searchParams}`)
    }

    const moveModify = (id) => {

        console.log(id, 'modify id');

        const searchParams = createSearchParams(queryObj).toString();

        navigate(`../modify/${id}?${searchParams}`)
    }

    const moveProductList = () => {
        navigate('/product/list')
    }

    return {queryObj, setSearch, moveList, moveRead, moveModify, moveProductList}
    
}

export default useQueryObj