import { Outlet, Navigate } from "react-router-dom";
import {useUserAuth} from "../store/authContext";

const PrivateRoutes = ({ children }) => {
    const {isLoggedIn, user } = useUserAuth();
  
    console.log("Check user in Private: ", isLoggedIn);
    return( isLoggedIn ? <Outlet/> : <Navigate to ="/" /> )
  };





export default PrivateRoutes;