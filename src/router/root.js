import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../products/pages/LoadingPage";

const Loading = <LoadingPage></LoadingPage>
const Product_Index = lazy(() => import("../products/pages/product/IndexPage"))
const Product_List = lazy(() => import("../products/pages/product/ListPage"))

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

