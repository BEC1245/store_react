import { Link } from "react-router-dom";


const BasicNav = () => {
    return ( 
        <div className="w-full ">
            <div className="bg-white w-full flex justify-center h-20">
                <div className="text-2xl mt-6 mr-6 font-bold">Convenient Spotter</div>
                <div className="mt-6 h-14 w-64 flex justify-center">
                    <input className="border-2 h-10 w-60 rounded-s-lg border-black" type="text" value={''}></input>
                    <button className="border-y-2 border-r-2 rounded-r-lg bg-sky-400 h-10 w-14 border-black">
                        검색
                    </button>
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