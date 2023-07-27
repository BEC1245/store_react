import BasicNav from "./nav/BasicNav";


const BasicLayout = ({children}) => {
    return ( 
        <div>
            <div className="w-screen h-screen float-none overflow-auto">
            {/* <div className="w-screen h-screen float-none overflow-auto"  style={{backgroundImage: `url("http://localhost/webImg/istockphoto-1190696507-1024x1024.jpg")` }}> 백그라운드 사진 적용 */}
                <BasicNav></BasicNav>
                <div className="flex justify-center items-center">
                    <div className="h-fit w-4/6  ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default BasicLayout;