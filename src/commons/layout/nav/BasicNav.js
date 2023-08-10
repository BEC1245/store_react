import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQueryObj from "../../hooks/useQueryObj";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { initAll } from "../../../store/reducer/loginSlice";


const BasicNav = () => {

    const navigate = useNavigate();

    const selector = useSelector(select => select.login)

    const dispatch = useDispatch()

    const [search, setSearch] = useState('');

    const enter = () => {
        navigate(`/product/list?keyword=${search}`)
        setSearch('')
    }

    const handleOnClick = () => {
        dispatch(initAll())
        navigate(`/product/list`)
    }

    console.log(selector);

    return ( 
        <div className="w-full">
            <div className="bg-white w-full flex justify-around h-20">
                <div className="w-2/6"></div>
                <div className="flex justify-center">
                    <div className="text-2xl mt-5 mr-6 font-bold">Convenient Spotter</div>
                    <div className="mt-5 h-14 w-64 flex justify-center">
                        <input 
                        className="border-2 h-10 w-60 rounded-s-lg border-black" 
                        type="text" 
                        value={search}
                        onChange={e => {setSearch(e.target.value)}}
                        ></input>
                        
                        <button 
                        className="border-y-2 border-r-2 rounded-r-lg bg-sky-400 h-10 w-14 border-black"
                        onClick={enter}
                        >
                            검색
                        </button>
                    </div>
                </div>                
                <div className="w-2/6 h-full p-2">
                    { selector.roleNames.includes('USER') ? 
                        <div className="h-full border-2 rounded-md flex justify-start overflow-hidden">
                            <div className="ml-5 p-2">
                                <img src={`http://localhost/user_profile/s_${selector.profile}`} className="w-11 h-11 rounded-full border-4 border-stone-700"></img>
                            </div>
                            <div className="p-2">
                                <div className="bg-stone-300 "> { selector.nickName } </div>
                                <div className="text-sm bg-stone-400 mt-1 px-1"> { selector.email } </div>
                            </div>
                            <div className="p-2">
                                <button onClick={handleOnClick}  className="w-24 h-full bg-red-500 text-white rounded-md"> 
                                    <div className="text-center text-xl font-mono font-bold pt-2"> logout </div> 
                                </button>
                            </div>
                            <Link to={'/user/modify'} className="p-2">
                                <div className="w-24 h-full bg-purple-600 text-white rounded-md"> 
                                    <div className="text-center text-xl font-mono font-bold pt-2"> modify </div> 
                                </div>
                            </Link>
                        </div>
                        : 
                        <div className="h-full border-2 rounded-md flex justify-start">
                            <Link to={'/user/login'} className="p-2">
                                <div className="w-24 h-full bg-yellow-500 rounded-md"> 
                                    <div className="text-center text-xl font-mono font-bold pt-2"> Login </div> 
                                </div>
                            </Link>
                            <Link to={'/user/signin'} className="p-2">
                                <div className="w-24 h-full bg-red-500 rounded-md"> 
                                    <div  className="text-center text-xl font-mono font-bold pt-2"> signin </div> 
                                </div>
                            </Link>
                        </div>
                    }
                </div> 
            </div>
            <div className="bg-slate-500 w-full flex justify-center h-12">
                <div className="mt-2">
                    <hr></hr>
                    <div className="text-2xl mb-2 text-white">
                        <Link to={'/product/list'}>상품 목록</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicNav;