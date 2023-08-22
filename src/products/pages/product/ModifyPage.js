import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/product/ModifyComponent";
import useQueryObj from "../../../commons/hooks/useQueryObj";
import useCheckState from "../../../commons/hooks/useCheckState";


const ModifyPage = () => {

    const { moveRead, moveList } = useQueryObj();

    const { id } = useParams()
    
    useCheckState("ADMIN", moveList)

    console.log(id, 'modifyPage');

    return ( 
        <div>
            <div className="text-2xl"> modifyPage </div>
            <ModifyComponent id={id} moveList={moveList} moveRead={moveRead}></ModifyComponent>
        </div>
     );
}
 
export default ModifyPage;