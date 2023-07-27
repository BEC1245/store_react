import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProductPage from "../products/pages/product/IndexPage";
import LoadingPage from "../products/pages/LoadingPage";
import ProductListPage from "../products/pages/product/ListPage";

const Loading = <LoadingPage></LoadingPage>
const Product_Index = lazy(() => ProductPage)
const Product_List = lazy(() => ProductListPage)

const router = createBrowserRouter([
    {
        path: '/product/',
        element: <Suspense fallback={Loading}><Product_Index/></Suspense>,
        children: [
            {
                path: 'list',
                element:<Suspense fallback={Loading}><Product_List/></Suspense>
            }
        ]
    },
])

export default router;

