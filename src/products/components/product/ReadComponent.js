import { useEffect, useState } from "react";
import { getOneProduct } from "../../api/ProductAPI";

const initState = {
    id: 0,
    pname: '',
    price: 0,
    content: '',
    state: '',
    sname: '',
    img: '',
    delflag: false,
    regDate: '',
    modDate: '',
    avg: 0,
    count: 0
}

const ReadComponent = ({id}) => {

    const [product, setProduct] = useState(initState)

    useEffect(() => {
        getOneProduct(id).then(data => {
            console.log(data);
            setProduct({...data})
        })
    }, [id])

    return ( 
        <div>
            <div className="border-2 p-3 flex justify-center">
                <div className="h-auto w-auto border-2 border-black">
                    <img src={`http://localhost/product_img/${product.img}`}></img>
                </div>
                <div className="h-auto w-96 ml-4 p-2 ">
                    <div className="mt-4 text-xl">{product.pname}</div>
                    <div className="mt-1 mb-3 font-extrabold">{product.state}</div>
                    <hr/>
                    <div className="mt-3 mb-3 text-2xl">{product.price}원</div>
                    <div className="mt-1 h-auto font-extrabold ">{product.content}</div>
                    <div className="mt-10 h-auto text-4xl">{product.sname}</div>
                </div>
            </div>
            { product.avg && product.count ? 
            <div className="bg-cyan-300">
                <div className="text-3xl"> {product.avg} </div>
                <div className="text-3xl"> {product.count} </div>
            </div> : <></>}
        </div>
    );
}
 
export default ReadComponent;