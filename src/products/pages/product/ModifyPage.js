import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/product/ModifyComponent";


const ModifyPage = () => {

    const { id } = useParams()

    console.log(id, 'modifyPage');

    return ( 
        <div>
            <div className="text-2xl"> modifyPage </div>
            <ModifyComponent id={id}></ModifyComponent>
        </div>
     );
}
 
export default ModifyPage;