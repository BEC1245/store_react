import { useEffect } from "react";
import { getReviewImg } from "../../../api/ReviewAPI";
import { useState } from "react";


const ImgModal = ({id}) => {

    // 이미지의 배열을 받는 넘
    const [imgs, setImgs] = useState([])

    useEffect(() => {

        if(id === null){ return }

        getReviewImg(id).then(data => {
            console.log(data, 'imgModal List')
            setImgs(data)
        })

    }, [id])

    return ( 
        <div>
            <div className="text-2xl"> mid </div>
            <div>
                { imgs !== null ? imgs.map((ele) => <img src={`http://localhost/review_img/${ele}`}></img>) : <></>}
            </div>
        </div>
     );
}
 
export default ImgModal;