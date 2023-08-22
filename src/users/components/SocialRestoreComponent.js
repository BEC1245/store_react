import { useRef } from "react";
import { restoreUser } from "../api/loginAPI";
import { backServer } from "../../commons/Loc";


const SocialRestoreComponent = ({moveProductList, id}) => {

    const ref = useRef()

    const handleRestore = () => {

        restoreUser(id).then(value => {
            ref.current.click()
        })

    }

    return ( 
        <div>
            <a ref={ref} href={`${backServer}/oauth2/authorization/kakao`} hidden></a>
            <div className="flex justify-center items-center h-screen">
                <div className="w-1/4 bg-white">

                    {/* 여기에 대충 장황한 내용이 들어가면 됨 */}

                    <div className="mt-10 flex p-2">
                        <button className="w-20 h-10 mx-5 bg-green-500 rounded-md text-center pt-1" onClick={moveProductList}> 돌아가기 </button>
                        <button className="w-20 h-10 bg-cyan-600 rounded-md text-center pt-1" onClick={handleRestore}> 회원복구 </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
 
export default SocialRestoreComponent;