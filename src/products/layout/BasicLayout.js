import BasicNav from "./nav/BasicNav";


const BasicLayout = ({children}) => {
    return ( 
        <div>
            <BasicNav></BasicNav>
            <div>
                {children}
            </div>
        </div>
     );
}
 
export default BasicLayout;