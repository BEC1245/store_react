import { useParams } from "react-router-dom";
import ReadComponent from "../../components/product/ReadComponent";
import ReviewComponent from "../../components/product/ReviewComponent";


const ReadPage = () => {

    console.log('changed read page')

    const { id } = useParams();

    return ( 
        <div>
            <div className="text-3xl">readPage {id}</div>
            <div>
                <ReadComponent id={id}></ReadComponent>
                <ReviewComponent></ReviewComponent>
            </div>
        </div>
    );
}
 
export default ReadPage;