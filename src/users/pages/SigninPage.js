

const SinginPage = () => {

    return ( 
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="w-1/3 h-auto">
                    <div className="mb-3 bg-white w-28">
                        <div className="text-2xl text-center"> 회원가입 </div>
                    </div>
                    <div className="p-3 bg-white">
                        <div className="flex justify-center">
                            <img 
                            src={`http://localhost/user_profile/someUserProfile.jpg`} 
                            className="h-32 w-32 border-4 rounded-3xl border-gray-600"></img>
                        </div>
                        <div className="my-3">
                            email: <input type="text" className="border-2"/>
                            <button className="w-10 h-6 ml-3 bg-sky-500 text-xs"> 채크 </button>
                            { false ? <div className="text-sm mt-2 text-red-600"> 채크를 요합니다 </div> :
                              <div className="text-sm mt-2 text-blue-600"> 사용 가능합니다 </div>  
                            }
                        </div>
                        <div className="my-3">
                            password: <input type="text" className="border-2"/>
                        </div>
                        <div className="my-3">
                            nickName: <input type="text" className="border-2"/>
                        </div>
                        <div className="my-3">
                            <button className="w-20 h-7 bg-amber-300 rounded-lg"> 가입하기 </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SinginPage;