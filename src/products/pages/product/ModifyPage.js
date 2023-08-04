import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/product/ModifyComponent";
import useQueryObj from "../../hooks/useQueryObj";


const ModifyPage = () => {

    const { moveRead, moveList } = useQueryObj();

    const { id } = useParams()

    console.log(id, 'modifyPage');

    return ( 
        <div>
            <div className="text-2xl"> modifyPage </div>
            <ModifyComponent id={id} moveList={moveList} moveRead={moveRead}></ModifyComponent>
        </div>
     );
}
 
export default ModifyPage;