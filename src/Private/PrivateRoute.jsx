import { Navigate, useLocation } from "react-router";
import { MoonLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    if(loading){
        return <MoonLoader></MoonLoader>
    }
    if(!user){
        return(
            <Navigate
  to="/login"
  state={location}
  replace
/>
        )
    }
    return children
};

export default PrivateRouter;