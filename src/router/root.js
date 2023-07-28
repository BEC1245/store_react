import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../products/pages/LoadingPage";

const Loading = <LoadingPage></LoadingPage>
const Product_Index = lazy(() => import("../products/pages/product/IndexPage"))
const Product_List = lazy(() => import("../products/pages/product/ListPage"))
const Product_Read = lazy(() => import("../products/pages/product/ReadPage"))

const router = createBrowserRouter([
    {
        path: '/product/',
        element: <Suspense fallback={Loading}><Product_Index/></Suspense>,
        children: [
            {
                path: 'list',
                element:<Suspense fallback={Loading}><Product_List/></Suspense>
            },
            {
                path: 'read/:id',
                element:<Suspense fallback={Loading}><Product_Read/></Suspense>
            }
        ]
    },
])

export default router;

