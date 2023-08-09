import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQueryObj from "../../hooks/useQueryObj";
import axios from "axios";
import { useSelector } from "react-redux";


const BasicNav = () => {

    const navigate = useNavigate();

    const selector = useSelector(select => select.login)

    const [search, setSearch] = useState('');

    const enter = () => {
        navigate(`/product/list?keyword=${search}`)
        setSearch('')
    }

    return ( 
        <div className="w-full">
            <div className="bg-white w-full flex justify-between h-20">
                <div></div>
                <div className="flex justify-center">
                    <div className="text-2xl mt-6 mr-6 font-bold">Convenient Spotter</div>
                    <div className="mt-6 h-14 w-64 flex justify-center">
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
                { selector.roleNames.includes('GUEST') ? 
                        <div className="mt-6 mr-36">
                            현재 게스트 상태
                        </div> :
                        <div className="mt-6 mr-36">
                            현재 로그인 상태
                        </div> 
                }
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