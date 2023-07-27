import { useEffect, useState } from "react";
import { getListProduct } from "../../api/ProductAPI";
import { Rating } from "react-simple-star-rating";


const initState = {
    list: [],
    total: 0,
    next: true,
    prev: false,
    pageNums: [],
    page: 0,
    size: 0,
    limit: 0,
    start: 0,
    end: 0,
    pageRequestDTO: {}
}

const ProductListComponent = ({queryObj}) => {

    const [listData, setListData] = useState(initState)

    useEffect(() => {
        getListProduct(queryObj).then(data => {
            console.log(data)
            setListData({...data})
        })
    }, [queryObj])

    return ( 
        <div>
            <div className="border-2 flex flex-wrap">
                {listData.list.map(ele =>
                    <div 
                    className="rounded-xl w-60 h-80 border-4 m-4 ml-14 border-yellow-400" 
                    key={ele.id}>
                        <div className="w-full h-4/6 flex justify-center"> 
                            <img src={`http://localhost/thumbnail/${ele.img}`}></img>
                        </div>
                        <div className="h-2/6">
                            <div className="w-full h-6 pl-2">{ele.pname}</div>
                            <div className="w-full h-8 pl-2 pt-1 font-bold text-red-700">{ele.price}원 {ele.state ? `- ${ele.state}` : ''}</div>
                            {/* <div className="w-full h-1/3 bg-slate-700">
                                
                            </div> */}
                            <Rating size={20} initialValue={ele.avgScore} ></Rating>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default ProductListComponent;