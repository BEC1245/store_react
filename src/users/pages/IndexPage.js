import { Outlet } from "react-router-dom";
import LoginLayout from "./layout/LoginLayout";


const UserPage = () => {
    return ( 
        <LoginLayout>
            <Outlet/>
        </LoginLayout>
    );
}
 
export default UserPage;