import { useParams } from "react-router-dom";
import ReadComponent from "../../components/product/ReadComponent";
import ReviewComponent from "../../components/review/ReviewComponent";
import ReviewRegistComponent from "../../components/review/ReviewRegistComponent";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import LayoutModal from "../../components/review/modal/layoutModal";


const ReadPage = () => {

    console.log('changed read page')

    let [change, setChange] = useState(false)

    const { id } = useParams()

    const {isOpen, modalOpen, modalClose} = useModal()

    const hasChanged = () => {
        change = !change;
        setChange({change})
    }

    return ( 
        <div>
            <div className="text-3xl">readPage {id}</div>
            <div>
                <ReadComponent id={id} hasChanged={hasChanged}></ReadComponent>
                <ReviewRegistComponent id={id} hasChanged={hasChanged}></ReviewRegistComponent>
                <ReviewComponent id={id} hasChanged={hasChanged}></ReviewComponent>
            </div>
        </div>
    );
}
 
export default ReadPage;