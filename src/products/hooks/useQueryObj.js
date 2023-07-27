import { useSearchParams } from "react-router-dom";

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

const useQueryObj = () => {

    const [search, setSearch] = useSearchParams();

    const page = search.get('page') || 1
    const size = search.get('size') || 10
    const limit = search.get('limit') || 30
    const keyword = search.get('keyword')
    const searchType = search.get('searchType')
    const orderBy = search.get('orderBy')

    const queryObj = nullCheck({page, size, limit, keyword, searchType, orderBy})

    return {queryObj, setSearch}
    
}

export default useQueryObj