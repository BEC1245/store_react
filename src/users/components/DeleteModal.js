

const DeleteModal = () => {

    return ( 
        <div>
            <div className="w-full">
                <div className="text-center text-3xl"> 정말로 탈퇴 하시겠습니까? </div>
                <div className="text-center text-xl"> 회원을 탈퇴하면 복구할 수 없습니다 </div>
                <div className="mt-6 flex justify-center">
                    <div className="w-2/3 p-2 bg-slate-100 flex justify-center">
                        <div>
                            <div className="text-xl text-red-700"> 탈퇴를 원하시면 현 이메일을 입력하시오 </div>
                            <div className="mt-2 flex">
                                <input type="text" className="border-2 border-gray-700"></input>
                            </div>
                            <button className="bg-yellow-400 h-9 w-20 mt-2 pt-1 text-center">  탈퇴하기  </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DeleteModal;