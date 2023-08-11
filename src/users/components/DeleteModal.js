import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteUser } from "../api/loginAPI";
import { initAll } from "../../store/reducer/loginSlice";

const initState = {
    email: '',
    isMached: false
}

const DeleteModal = ({selector, dispatch, moveProductList}) => {

    const [resign, setResign] = useState(initState)

    useEffect(() => {
        setResign({...initState})
    }, [selector])

    const handleOnChange = (e) => {

        const currentVal = e.target.value

        resign.isMached = currentVal === selector.email;
        resign.email = currentVal
        setResign({...resign})
    
    }

    const handleDelete = () => {

        console.log(resign.isMached, 'delete action started in deletemodal');

        if(resign.isMached === false){
            return
        }

        deleteUser(selector.id).then(data => {

            if(data.result === 'success'){

                console.log('check success in deletemodal');

                dispatch(initAll())
                moveProductList()
            }

        })

    }

    return ( 
        <div>
            <div className="w-full">
                <div className="text-center text-3xl"> 정말로 탈퇴 하시겠습니까? </div>
                <div className="text-center text-xl"> 회원을 탈퇴하면 계정은 정지 상태로 전환됩니다. </div>
                <div className="mt-6 flex justify-center">
                    <div className="w-2/3 p-2 bg-slate-100 flex justify-center">
                        <div>
                            <div className="text-xl text-red-700"> 탈퇴를 원하시면 현 이메일을 입력하시오 </div>
                            <div className="mt-2 flex">
                                <input 
                                type="text" 
                                className="border-2 border-gray-700" 
                                value={resign.email} 
                                onChange={handleOnChange}
                                ></input>
                            </div>
                            { resign.isMached ? <></> : <div className="text-sm"> 이메일이 맞지 않습니다 </div> }
                            <button className="bg-yellow-400 h-9 w-20 mt-2 pt-1 text-center" onClick={handleDelete}>  탈퇴하기  </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DeleteModal;