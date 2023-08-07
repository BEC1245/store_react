import { useEffect, useState } from "react";
import ListPageComponent from "../../../commons/components/ListPageComponent";

const initState = {
    "1+1": false,
    "2+1": false,
    "CU": false,
    "GS25": false,
    "SEVEN-ELEVEN": false
}

const ListOrderByComponent = ({changeOrderBy, changeSearchType, queryObj}) => {

    const [search, setSearch] = useState(initState);

    useEffect(() => {

        if(queryObj.searchType != null){

            const searchType = queryObj.searchType.split(" ");

            for(let ele of searchType){
                console.log(search[ele], ele);
                search[ele] = true;
            }
    
            setSearch({...search})
        }

    }, [queryObj])

    const hendleSearchChange = (e) => {
        search[e.target.name] = !search[e.target.name]
        setSearch({...search})

        const Keys = Object.keys(search);

        let result = ''

        for(let ele = 0; ele < Keys.length; ele++){
            if(search[Keys.at(ele)] === true){
                result += `${Keys.at(ele)} `
            }
        }

        console.log(result, 'result');

        changeSearchType(result)
    }

    return ( 
        <div>
            <div className="p-2 flex">
                <div className="w-1/2 h-10 bg-gray-300">
                    <div className="flex justify-start mt-2">
                        <button className="ml-3" onClick={() => {changeOrderBy('pa')}}>가격낮은순</button>
                        <button className="ml-3" onClick={() => {changeOrderBy('pd')}}>가격높은순</button>
                        <button className="ml-3" onClick={() => {changeOrderBy('rv')}}>리뷰순</button>
                    </div>
                </div>
                <div className="w-1/2 h-10 bg-gray-300">
                    <div className="flex justify-end mt-2">
                        <span className="mr-2">
                            1+1 <input type="checkbox"  name="1+1"   checked={search["1+1"]} onChange={(e) => {hendleSearchChange(e)}}/>
                        </span>
                        <span className="mr-5">
                            2+1 <input type="checkbox"  name="2+1"   checked={search["2+1"]} onChange={(e) => {hendleSearchChange(e)}}/>
                        </span>
                        <span className="mr-2">
                            CU <input type="checkbox"   name="CU"    checked={search.CU} onChange={(e) => {hendleSearchChange(e)}}/>
                        </span>
                        <span className="mr-2">
                            GS25 <input type="checkbox" name="GS25"  checked={search.GS25} onChange={(e) => {hendleSearchChange(e)}}/>
                        </span>
                        <span className="mr-2">
                            SEVEN-ELEVEN <input type="checkbox" name="SEVEN-ELEVEN" checked={search["SEVEN-ELEVEN"]} onChange={(e) => {hendleSearchChange(e)}}/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ListOrderByComponent;