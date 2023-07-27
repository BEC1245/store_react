import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";


const ProductPage = () => {

    return ( 
        <BasicLayout>
            <div className="text-3xl">ProductPage</div>
            <div>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
     );
}
 
export default ProductPage;