import { useEffect } from "react";
import { deleteReview, getReview } from "../../../api/ReviewAPI";
import { useState } from "react";

const initState = {
    content:'',
    id:0,
    imgs:[],
    score:0,
    nickName:''
}

const ReadModal = ({id, modalClose, hasModalChange, hasChange}) => {

    // 이미지의 배열을 받는 넘
    const [review, setReview] = useState(initState)

    useEffect(() => {

        console.log(id)

        if(id === null){ return }

        getReview(id).then(data => {
            console.log(data, 'imgModal List')
            setReview({...data})
        })

    }, [id])

    const handleDelete = () => {
        deleteReview(id).then(() => {
            console.log('review is deleted')
            modalClose()  
            hasChange()
        })
    }

    return ( 
        <div>
            <div>
                <div className="text-2xl"> {review.id} </div>
                <textarea value={review.content} readOnly></textarea>
                <div className="text-2xl"> {review.nickName} </div>
                <div className="text-2xl"> {review.score} </div>
                <div className="text-2xl"> {review.imgs[0]} </div>
            </div>
            <div>
                <button className="w-20 h-10 rounded-xl bg-slate-700 ml-1" onClick={hasModalChange}>수정</button>
                <button className="w-20 h-10 rounded-xl bg-slate-700 ml-3" onClick={handleDelete}>삭제</button>
            </div>
        </div>
     );
}

export default ReadModal;