import { useEffect, useRef, useState } from "react";
import { getReviewList } from "../../api/ReviewAPI";

const initState = {
    list: [],
    total: 0,
    isEnd: false
}

const ReviewComponent = ({id}) => {

    let [page, setPage] = useState(1);

    const [Review, setReview] = useState(initState);

    useEffect(() => {
        getReviewList(0, id).then(data => {
            console.log(data, 'end');
            const change = data.list.length === data.total
            setReview({isEnd:change, ...data})
        })
    }, [id])

    const callback = () => {

        getReviewList(page, id).then(data => {

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

    return ( 
        <div>
            {Review.list.map((ele, idx) => 
            <div key={idx}
            className="p-2 w-2/3"
            >
                <div className="mb-3 bg-red-400"> 
                    <header className="flex p-2">
                        <img src={`http://localhost/user_profile/${ele.profile}`}></img>
                        <div className="ml-3 font-bold"> { ele.nickName } </div>
                        <div className="ml-3 font-bold"> { ele.score } </div>
                    </header>
                    <div className="p-2">
                        { ele.content }
                    </div>
                </div>
            </div>)}
            <div className="w-full h-12 p-1 flex justify-center"> 
                { Review.isEnd ? 
                 <></> : <div className="h-full w-1/2 border-2 bg-slate-500 text-center text-2xl text-white" onClick={callback}>다음</div>}
            </div>
        </div>
    );
}
 
export default ReviewComponent;