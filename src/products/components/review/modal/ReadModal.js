import { useEffect, useRef } from "react";
import { deleteReview, getReview } from "../../../api/ReviewAPI";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

const initState = {
    content:'',
    id:0,
    imgs:[],
    score:0,
    nickName:'',
    user_id: 0
}

const ReadModal = ({id, modalClose, hasModalChange, hasChange}) => {

    // 이미지의 배열을 받는 넘
    const [review, setReview] = useState(initState)

    const [cursor, setCursor] = useState(0);

    const selector = useSelector(select => select.login)

    const isModifyable = selector.roleNames.includes('ADMIN') || selector.id === review.user_id

    console.log(review.imgs);

    useEffect(() => {

        if(id === null){ return }

        getReview(id).then(data => {
            console.log(data, 'Modal List')
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
            <div className="flex">
                <div className="w-1/2">
                    <img src={`http://localhost/review_img/${review.imgs[cursor]}`}></img>
                </div> 
                <div className="w-1/2">
                    <div className="p-2">
                        <div className="text-2xl mb-2"> {review.nickName} </div>
                        
                        <hr/>
                        
                        <textarea className="text-sm w-full resize-none h-[25vh]" value={review.content} readOnly></textarea>
                        
                        <hr/>

                        <div className="w-full flex flex-wrap">
                            { review.imgs.map((ele, idx) => 
                                <div className="w-1/4 flex justify-center border-2" onClick={() => setCursor(idx)}>
                                    <img src={`http://localhost/review_img/s_${ele}`}/>
                                </div>    
                            )}
                        </div>
                    </div>
                </div>
            </div>
            { isModifyable ? <div>
                <button className="w-20 h-10 rounded-xl bg-slate-700 ml-1" onClick={hasModalChange}>수정</button>
                <button className="w-20 h-10 rounded-xl bg-slate-700 ml-3" onClick={handleDelete}>삭제</button>
            </div> : <></>}
        </div>
     );
}

export default ReadModal;