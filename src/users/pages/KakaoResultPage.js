import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { postLoginThunk, setEmail } from "../../store/reducer/loginSlice";
import { useEffect } from "react";


const KakaoResultPage = () => {

    const [search] = useSearchParams()

    const navi = useNavigate()

    const data = JSON.parse(search.get('data'))

    const dispatch = useDispatch();

    useEffect(() => {

        console.log(data);

        if(data.isSocial && data.roleNames.includes('GUEST')){

            dispatch(setEmail(data.email))

            navi('/user/modify/social')

        } else {
    
            const formData = new FormData()
    
            formData.append("username", data.email)
            formData.append("password", data.password)
    
            dispatch(postLoginThunk(formData))

            navi('/product/list')

        }

    }, [data])

    return ( 
        <div>
            
        </div>
     );
}
 
export default KakaoResultPage;