import { useParams } from "react-router-dom";
import ReadComponent from "../../components/product/ReadComponent";
import ReviewComponent from "../../components/review/ReviewComponent";
import ReviewRegistComponent from "../../components/review/ReviewRegistComponent";
import { useState } from "react";
import useQueryObj from "../../../commons/hooks/useQueryObj";

const ReadPage = () => {

    const { moveModify } = useQueryObj();

    let [change, setChange] = useState(false)

    const { id } = useParams()

    const hasChanged = () => {
        change = !change;
        setChange({change})
    }

    return ( 
        <div>
            <div>
                <ReadComponent id={id} hasChanged={hasChanged}></ReadComponent>
                <ReviewRegistComponent id={id} hasChanged={hasChanged}></ReviewRegistComponent>
                <ReviewComponent id={id} hasChanged={hasChanged}></ReviewComponent>
            </div>
            <div className="flex justify-end">
                <div className="h-10 w-20 p-2 rounded-lg bg-purple-500 text-white" onClick={ () => moveModify(id) }> 수정하기 </div>
            </div>
        </div>
    );
}
 
export default ReadPage;