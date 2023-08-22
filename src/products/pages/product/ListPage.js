import ProductListComponent from "../../components/product/ListComponent";
import ListOrderByComponent from "../../components/product/ListOrderByComponent";
import useQueryObj from "../../../commons/hooks/useQueryObj";
import useCheckState from "../../../commons/hooks/useCheckState";

const ProductListPage = () => {

    useCheckState()

    const {queryObj, setSearch, moveRead} = useQueryObj();

    const changeOrderBy = (OrderBy) => {
        queryObj.orderBy = OrderBy;
        setSearch({...queryObj})
    }

    const changeSearchType = (search) => {

        console.log(search, 'getted Search Type');

        queryObj.page = 1
        queryObj.size = 10
        queryObj.searchType = search;
        setSearch({...queryObj})
    }

    const movePage = (page) => {
        queryObj.page = page;
        setSearch({...queryObj})
    }

    return ( 
        <div>
            <div className="text-3xl">product list</div>
            <div>
                <ListOrderByComponent changeOrderBy={changeOrderBy} changeSearchType={changeSearchType} queryObj={queryObj}></ListOrderByComponent>
                <ProductListComponent queryObj={queryObj} movePage={movePage} moveRead={moveRead}></ProductListComponent>
            </div>
        </div>
    );
}
 
export default ProductListPage;