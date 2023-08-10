import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSocialThunk, initAll, postLoginThunk, setSocial } from "../../store/reducer/loginSlice";
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

            dispatch(initAll())
            dispatch(setSocial(socialData))
            navi('/user/modify')

        } else {

            // 여기에 slice에 저장해 놓을 소셜 회원 정보를 넣어놔야함
            dispatch(initAll())
            dispatch(setSocial(data))
            navi('/product/list')

        }

    }, [data])

    return ( 
        <div>
            이 창이 보이면 카카오 로그인 중 문제가 있었다는 겁니다....
        </div>
    );
}
 
export default KakaoResultPage;