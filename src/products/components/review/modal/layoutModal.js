

const LayoutModal = ({children, modalClose}) => {

    return ( 
        <div>
            <div className="w-screen h-screen z-30 bg-zinc-900 absolute inset-0 bg-opacity-50" name="background">
                <div className="w-1/2 h-1/2 z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-hidden">
                    <div className="absolute right-5 top-5 h-8 w-16 p-1 rounded-lg bg-red-500 text-center text-white" onClick={modalClose}>
                        X
                    </div>
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default LayoutModal;