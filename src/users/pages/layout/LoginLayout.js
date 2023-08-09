

const LoginLayout = ({children}) => {
    return ( 
        <div>
            <div className="w-screen h-screen bg-slate-300">
            {children}
            </div>
        </div>
     );
}
 
export default LoginLayout;