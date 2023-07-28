import React, { useEffect, useContext,createContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";


const AuthContext = createContext ();

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    async function loginHandler  (username,password)  {
        const { data } = await supabase.from("users").select()
        .eq('username', username)
        .eq('password',  password);
        
        console.log(data);
       if (data != null && data.length > 0 ){
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
        setUser(data[0]);
       }
    };
    return (
     <AuthContext.Provider 
        value={{
            user: user,
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler

        }} 
     >
        {props.children}
        
     </AuthContext.Provider>
    );

};

export function useUserAuth() {
    return useContext(AuthContext);
  }