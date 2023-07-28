import { useEffect, useState } from "react";
import { getListProduct } from "../../api/ProductAPI";
import { Rating } from "react-simple-star-rating";
import ListPageComponent from "../../common/ListPageComponent";


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

const ProductListComponent = ({queryObj, movePage, moveRead}) => {

    const [listData, setListData] = useState(initState)

    useEffect(() => {
        getListProduct(queryObj).then(data => {
            console.log(data)
            setListData({...data})
        })
    }, [queryObj])

    return ( 
        <div>
            <div className="border-2 p-4">
                <div className="flex flex-wrap justify-center">
                    {listData.list.map(ele =>
                        <div 
                        className="rounded-xl w-60 h-80 border-4 m-4 ml-14 border-yellow-400" 
                        key={ele.id}
                        onClick={() => moveRead(ele.id)}
                        >
                            <div className="w-full h-4/6 flex justify-center"> 
                                <img src={`http://localhost/thumbnail/${ele.img}`}></img>
                            </div>
                            <div className="h-2/6">
                                <div className="w-full h-6 pl-2">{ele.pname}</div>
                                <div className="w-full h-8 pl-2 pt-1 font-bold text-red-700">{ele.price}원 {ele.state ? `- ${ele.state}` : ''}</div>
                                <div className="w-full h-10 text-center font-bold text-gray-500">{ele.avgScore} / {ele.reviewCount} </div>
                            </div>
                        </div>
                    )}
                </div>
                <ListPageComponent movePage={movePage} {...listData}></ListPageComponent>
            </div>
        </div>
    );
}
 
export default ProductListComponent;