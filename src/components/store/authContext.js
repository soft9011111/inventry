import { createContext, useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  async function logIn(username,password)  {
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
  function logOut() {
     
  } 

  return (
    <userAuthContext.Provider
      value={{ isLoggedIn, user, logIn, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}