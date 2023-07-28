import { useEffect, useRef, useState } from "react";


const ReviewComponent = ({queryObj}) => {

    const target = useRef(null);

    useEffect(() => {
        observer.observe(target.current)
    }, [])

    const callback = () => {
        console.log('observed');
    }

    const observer = new IntersectionObserver(callback);

    return ( 
        <div>
            <div className="h-96 w-96 mt-96"></div>
            <div 
            ref={target} 
            className="h-96 w-96 mt-96 bg-black"
            ></div>
        </div>
    );
}
 
export default ReviewComponent;