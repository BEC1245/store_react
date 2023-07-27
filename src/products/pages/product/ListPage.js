import { useSearchParams } from "react-router-dom";
import ProductListComponent from "../../components/product/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";


const ProductListPage = () => {

    const {queryObj} = useQueryObj();

    return ( 
        <div>
            <div className="text-3xl">product list</div>
            <div>
                <ProductListComponent queryObj={queryObj}></ProductListComponent>
            </div>
        </div>
    );
}
 
export default ProductListPage;