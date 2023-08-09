import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { postLoginThunk, setSocial } from "../../store/reducer/loginSlice";
import { useEffect } from "react";


const KakaoResultPage = () => {

    const [search] = useSearchParams()

    const navi = useNavigate()

    const data = JSON.parse(search.get('data'))

    const dispatch = useDispatch();

    useEffect(() => {

        console.log(data);

        if(data.isSocial && data.roleNames.includes('GUEST')){

            const socialData = {
                id: data.id,
                email: data.email,
                isSocial: data.isSocial,
                roleNames: data.roleNames
            }

            dispatch(setSocial(socialData))

            navi('/user/modify')

        } else {
    
            const formData = new FormData()
    
            formData.append("username", data.email)
            formData.append("password", data.password)
    
            dispatch(postLoginThunk(formData))

            // navi('/product/list')

        }

    }, [data])

    return ( 
        <>
        </>
    );
}
 
export default KakaoResultPage;