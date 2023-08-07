import { Outlet } from "react-router-dom";
import BasicLayout from "../../../commons/layout/BasicLayout";


const ProductPage = () => {

    return ( 
        <BasicLayout>
            <div>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
     );
}
 
export default ProductPage;