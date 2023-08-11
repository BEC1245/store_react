

const ListPageComponent = ({movePage, next, prev, pageNums, start, end}) => {

    const hendleOnClick = (num) => {
        movePage(num)
    }

    return ( 
        <div>
            <div className="h-16 w-full mb-3 flex justify-center bg-green-500">
                { prev ? 
                <div
                key={start - 1}
                className="bg-orange-500 text-center p-2 h-11 mt-3 m-2 border-2 font-bold"
                onClick={() => hendleOnClick(start - 1)}
                >
                    prev
                </div> : <></>}


                { pageNums.map(ele => 
                <div
                key={ele}
                className="bg-orange-500 text-center p-2 h-11 mt-3 m-2 border-2 font-bold"
                onClick={() => hendleOnClick(ele)}
                >
                    {ele}
                </div>
                )}

                { next ? 
                <div
                key={end + 1}
                className="bg-orange-500 text-center p-2 h-11 mt-3 m-2 border-2 font-bold"
                onClick={() => hendleOnClick(end + 1)}
                >
                    next
                </div> : <></>}
            </div>
        </div>
    );
}
 
export default ListPageComponent;