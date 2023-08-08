import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { postReview } from "../../api/ReviewAPI";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

const initState = {
    score: 0,
    content: '',
    product_id:0,
    email:''
}

const ReviewRegistComponent = ({id, hasChanged}) => {

    console.log(id, 'id in reviewRegistComponent');

    const selector = useSelector(select => select.login)

    const [insert, setInsert] = useState(initState)

    const ref = useRef()

    // 여기에 로그인 만들면 slice로 저장한 email 넣어야함
    useEffect(() => {
        insert.email = selector.email
        insert.product_id = id
        setInsert({...insert})
    }, [id])

    // 등록 버튼
    const hendleRegist = () => {
        
        const formData = new FormData();

        const files = ref.current.files;
        
        if(insert.score === 0 || insert.content === ''){
            console.log(insert.score + " / " + insert.content);
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

        formData.append("score", insert.score)
        formData.append("content", insert.content)
        formData.append("product_id", insert.product_id)
        formData.append("email", insert.email) // 여기가 쿠키의 유저 정보

        postReview(formData).then(data => {
            console.log(data);
            setInsert({...initState})
            hasChanged();
        })
    }

    return ( 
        <div>
            <div className="mt-2 pl-2 pb-2 w-full h-auto bg-teal-500">
                <div>
                    <ReactStars
                    count={5}
                    size={30}
                    value={insert.score}
                    onChange={(rating) => {
                        insert['score'] = rating; 
                        setInsert({...insert})
                    }}
                    />
                </div>
                <div>
                    <textarea 
                    className="h-1/3" 
                    value={insert.content}
                    onChange={(e) => {
                        let info = e.target.value;

                        if(info.length > 1000){
                            alert('글자는 1000자가 넘어갈 수 없습니다.')
                            info = info.substring(0, 998)
                        }

                        insert['content'] = info;
                        setInsert({...insert})
                    }}
                    ></textarea>
                </div>
                <div className="">
                    <input type="file" accept="image/*" ref={ref} multiple></input>
                </div>
                <div className="mt-2">
                    <div className="w-28 h-8 border-2 rounded-lg text-center bg-teal-300" onClick={hendleRegist}> 등록 </div>
                </div>
            </div>
        </div>
     );
}
 
export default ReviewRegistComponent;