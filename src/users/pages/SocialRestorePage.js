import { useDispatch } from "react-redux";
import SocialRestoreComponent from "../components/SocialRestoreComponent";
import { useParams } from "react-router-dom";
import useQueryObj from "../../commons/hooks/useQueryObj";



const SocialRestorePage = () => {

    const { id } = useParams()

    const { moveProductList } = useQueryObj()

    return ( 
        <div>
            <SocialRestoreComponent moveProductList={moveProductList} id={id} ></SocialRestoreComponent>
        </div>
     );
}
 
export default SocialRestorePage;