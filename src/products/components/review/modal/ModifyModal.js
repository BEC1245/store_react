import { useEffect } from "react"
import { useState } from "react"
import { getReview, putReview } from "../../../api/ReviewAPI"
import ReactStars from "react-rating-stars-component";
import { renderIntoDocument } from "react-dom/test-utils";
import { useRef } from "react";


const initState = {
    content:'',
    id:0,
    imgs:[],
    score:0,
    nickName:''
}

const ModifyModal = ({id, hasModalChange, hasChanged}) => {

    // 수정 데이터를 받는 상태
    const [review, setReview] = useState(initState)

    const ref = useRef()

    // 비동기 통신으로 데이터를 가져옴
    useEffect(() => {

        if(id === null){ return }

        getReview(id).then(data => {
            console.log(data, 'imgModal List')
            setReview({...data})
        })

    }, [id])

    // 이미지 삭제 버튼
    const handleImgDelete = (ele) => {
        review.imgs = review.imgs.filter(names => names !== ele)
        setReview({...review})
    }

    // 이미지 수정 버튼
    const handleModify = () => {
        
        const formData = new FormData();

        const files = ref.current.files;

        console.dir(ref.current.files, 'files');

        if(review.score === 0 || review.content === ''){
            console.log(review.score + " / " + review.content);
            alert('내용이 없습니다')
            return
        }

        for(let ele of files){

            const fileName = ele.name.substring(ele.name.lastIndexOf('.') + 1);
            
            if(fileName === 'png' || fileName === 'jpg'){
                formData.append("files", ele);
                continue
            }

            alert('이미지 형식은 png, jpg 만 등록 가능합니다');
            return
        }

        formData.append("id", id)
        formData.append("score", review.score)
        formData.append("content", review.content)
        formData.append("imgs", review.imgs)

        putReview(formData).then(() => {
            hasChanged()
            hasModalChange()
        })
    }

    return ( 
        <div>
            <div className="w-full h-2/4">
                <ReactStars
                count={5}
                size={30}
                value={review.score}
                onChange={(rating) => {
                    review['score'] = rating; 
                    setReview({...review})
                }}
                />

                <textarea 
                className="h-1/3" 
                value={review.content}
                onChange={(e) => {
                    let info = e.target.value;

                    if(info.length > 1000){
                        alert('글자는 1000자가 넘어갈 수 없습니다.')
                        info = info.substring(0, 1000)
                    }

                    review['content'] = info;
                    setReview({...review})
                }}
                ></textarea>

                <input type="file" ref={ref} multiple/>
            </div>
            <div className="w-full h-auto mt-3 flex flex-wrap bg-stone-600">
                {review.imgs.map((ele, idx) => 
                <div 
                key={idx}
                className="w-1/5 mt-3"
                >
                    <div className="w-ful flex justify-center">
                        <img src={`http://localhost/review_img/s_${ele}`}/>
                    </div>
                    <div className="flex justify-center">
                        <div 
                        className="h-10 w-10 pt-2 mt-2 rounded-xl text-center bg-red-600"
                        onClick={() => handleImgDelete(ele)}
                        > x </div>
                    </div>
                </div>
                )}
            </div>
            <div className="w-full h-1/4">
                <button className="w-20 h-10 rounded-xl bg-slate-700 ml-1" onClick={hasModalChange}>돌아가기</button>
                <button className="w-20 h-10 rounded-xl bg-slate-700 ml-3" onClick={handleModify}>수정</button>
            </div>
        </div>
     );
}

export default ModifyModal;