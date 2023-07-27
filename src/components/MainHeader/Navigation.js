import React, {useContext} from "react";
import { Outlet, Navigate } from "react-router-dom";

import {useUserAuth} from "../store/authContext";


// const Navigation = () => {
//     const { isLoggedIn, user } = useUserAuth();
//     console.log("isLoggedIn"+ isLoggedIn);
//     console.log(user);
//     return(
//     isLoggedIn ? <Outlet/> : <Navigate to ="/" />
//     )
// }

// export default Navigation;

const Navigation = () => {
    const {isLoggedIn, user } = useUserAuth();
  
    console.log("Check user in Private: ", isLoggedIn);
    return( isLoggedIn ? <Outlet/> : <Navigate to ="/" /> )
  };
  
  export default Navigation;