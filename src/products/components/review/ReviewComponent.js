import { useEffect, useRef, useState } from "react";
import { getReviewImg, getReviewList } from "../../api/ReviewAPI";
import ReactStars from "react-rating-stars-component";
import useModal from "../../hooks/useModal";
import LayoutModal from "./modal/layoutModal";
import ImgModal from "./modal/ImgModal";

const initState = {
    list: [],
    total: 0,
    isEnd: false
}

const ReviewComponent = ({id, hasChanged}) => {

    let [page, setPage] = useState(1);

    const [reviewId, setReviewId] = useState(null);

    const [Review, setReview] = useState(initState);

    const {isOpen, modalClose, modalOpen} = useModal();

    useEffect(() => {
        getReviewList(0, id).then(data => {
            console.log(data, 'end');

            const change = data.list.length === data.total
            
            setPage(1)
            setReview({isEnd:change, ...data})
        })
    }, [id, hasChanged])

    // 다음 버튼 로직
    const handleNextClick = () => {

        getReviewList(page, id).then(data => {

            console.log(page, 'ReviewComponent');

            for(let ele of data.list){
                Review.list.push(ele)
            }
            Review.total = data.total;

            console.log('info', Review);

            if(Review.list.length === Review.total){ Review.isEnd = true }
            setPage(++page)
            setReview({...Review})

        })

    }

    const handleImgClick = (id) => {
        setReviewId(id)
        modalOpen();
    }

    return ( 
        <div>
            { isOpen && 
            <LayoutModal modalClose={modalClose}>
                <ImgModal id={reviewId}></ImgModal>
            </LayoutModal> }
            {Review.list.map((ele, idx) => 
            <div key={idx} className="flex h-auto">
                <div className="p-2 w-2/3"
                >
                    <div className="mb-3 bg-red-400"> 
                        <header className="flex p-2">
                            <img src={`http://localhost/user_profile/${ele.profile}`}></img>
                            <div className="ml-3 font-bold"> { ele.nickName } </div>
                            <div className="ml-3"> 
                                <ReactStars value={ele.score} edit={false}/>
                            </div>
                        </header>
                        <div className="p-2">
                            { ele.content }
                        </div>
                    </div>
                </div>
                <div className="p-2 w-1/3 h-full" onClick={() => handleImgClick(ele.id)}>
                    <div className="bg-green-500 p-2">
                       { ele.mainImg ? 
                       <img src={`http://localhost/review_img/s_${ele.mainImg}`}></img> : 
                       <div className="text-2xl"> 이미지 없음 </div> }
                    </div>
                </div>
            </div>
            )}
            <div className="w-full h-12 p-1 flex justify-center"> 
                { Review.isEnd ? 
                 <></> : <div className="h-full w-1/2 border-2 bg-slate-500 text-center text-2xl text-white" onClick={handleNextClick}>다음</div>}
            </div>
        </div>
    );
}
 
export default ReviewComponent;


