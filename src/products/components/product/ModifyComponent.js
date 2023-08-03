import { useEffect, useRef, useState } from "react";
import { deleteProduct, getOneProduct, modifyProduct } from "../../api/ProductAPI";

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

const ModifyComponent = ({id}) => {

    const [product, setProduct] = useState(initState)

    const ref = useRef()

    useEffect(() => {
        getOneProduct(id).then(data => {
            console.log(data);
            setProduct({...data})
        })
    }, [id])

    // 상품 내용 수정시
    const handleOnChange = (e) => {
        console.dir(product);

        product[e.target.name] = e.target.value;
        setProduct({...product}) 
    }

    const handleDelete = () => {

        deleteProduct(id).then(() => {
            console.log('product delete')
        })

    }

    // 수정 버튼 클릭시
    const handleModify = () => {
        
        const formData = new FormData();

        const files = ref.current.files;
        
        if(product.pname === '' || product.content === ''){
            console.log(product.pname + " / " + product.content);
            alert('내용이 없습니다')
            return
        }


        if(files !== null && files.length > 0){
            const fileName = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
            
            if(fileName === 'png' || fileName === 'jpg'){
                formData.append("file", files[0]);
            }
        } else {
            alert('이미지 형식은 png, jpg 만 등록 가능합니다');
            return
        }


        formData.append("id", id)
        formData.append("pname", product.pname)
        formData.append("price", product.price)
        formData.append("content", product.content)
        formData.append("state", product.state)
        formData.append("sname", product.sname)

        modifyProduct(formData).then(data => {
            console.log('product modifyed')
        })

    }

    return (  
        <div>
            <div className="flex border-2">
                <div className="p-2 w-3/5">
                    <div className="p-2 bg-slate-300 rounded-md mb-2">
                        <input type="text" name="pname" value={product.pname} onChange={handleOnChange} className=" w-full"></input>
                    </div>
                    <div className="p-2 bg-slate-300 rounded-md mb-2">
                        <textarea rows={10} name="content" value={product.content} onChange={handleOnChange} className="w-4/5"></textarea>
                    </div>
                    <div className="p-2 bg-slate-300 rounded-md mb-2">
                        <input type="number" name="price" value={product.price} onChange={handleOnChange} className=" w-full"></input>
                    </div>
                    <div className="p-2 bg-slate-300 rounded-md mb-2">
                        <select name="state" onChange={handleOnChange} defaultValue={product.state}>
                            <option>1+1</option>
                            <option>2+1</option>
                            <option>NONE</option>
                        </select>
                        <select className="ml-2" name="sname" onChange={handleOnChange} defaultValue={product.sname}>
                            <option>CU</option>
                            <option>GS25</option>
                            <option>SEVEN-ELEVEN</option>
                        </select>
                    </div>
                    <div  className="p-2 bg-slate-300 rounded-md mb-2 mt-2">
                        <input type="file" ref={ref}/>
                    </div>
                    <div className="mt-3 p-2 bg-slate-600 rounded-md w-2/5">
                        <button className="h-10 w-20 rounded-md mx-2 bg-blue-500">돌아가기</button>
                        <button className="h-10 w-14 rounded-md mx-2 bg-purple-500" onClick={handleModify}>수정</button>
                        <button className="h-10 w-14 rounded-md mx-2 bg-red-500" onClick={handleDelete}>삭제</button>
                    </div>
                </div>
                <div className="w-2/5 p-2 flext justify-center">
                    <img className="border-black border-2" src={`http://localhost/product_img/${product.img}`}/>
                </div>
            </div>
        </div>
    );
}
 
export default ModifyComponent;