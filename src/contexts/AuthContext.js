import React, { useEffect, useState, useContext } from "react";

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value ={
        authUser, 
        setAuthUser,
        isLoggedIn, 
        setIsLoggedIn
    }

    return(<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
    
};