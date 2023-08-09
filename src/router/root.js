import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../products/pages/LoadingPage";
import KakaoResultPage from "../users/pages/KakaoResultPage";

const Loading = <LoadingPage></LoadingPage>
const Product_Index = lazy(() => import("../products/pages/product/IndexPage"))
const Product_List = lazy(() => import("../products/pages/product/ListPage"))
const Product_Read = lazy(() => import("../products/pages/product/ReadPage"))
const Product_Modify = lazy(() => import("../products/pages/product/ModifyPage"))
const User_Index = lazy(() => import("../users/pages/IndexPage"))
const User_Login = lazy(() => import("../users/pages/loginPage"))
const User_Modify = lazy(() => import("../users/pages/ModifyPage"))
const User_Singin = lazy(() => import("../users/pages/SigninPage"))

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
            },
            {
                path: 'modify/:id',
                element: <Suspense fallback={Loading}><Product_Modify/></Suspense>
            }
        ]
    },
    {
        path: '/user/',
        element: <Suspense fallback={Loading}><User_Index/></Suspense>,
        children: [
            {
                path: 'login',
                element: <Suspense fallback={Loading}><User_Login/></Suspense>,
            },
            {
                path: 'signin',
                element: <Suspense fallback={Loading}><User_Singin/></Suspense>
            },
            {
                path: 'modify',
                element: <Suspense fallback={Loading}><User_Modify/></Suspense>
            }
        ]
    },
    {
        path: '/kakaologin',
        element: <KakaoResultPage></KakaoResultPage>
    }
])

export default router;

