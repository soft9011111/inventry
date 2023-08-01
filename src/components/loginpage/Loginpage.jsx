import React, {useState,useContext} from "react";
import { Container,Row } from "react-bootstrap";
import classes from './loginpage.module.css';
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../../contexts/AuthContext";
import Header from "../Header";
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

const Loginpage = (props) => {
    const navigate = useNavigate();
    //const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleSubmit (e) {
        e.preventDefault();       
        const { data } = await supabase.from("users").select()
        .eq('username', username)
        .eq('password',  password)
        .eq('is_active',  true);
        console.log(data);
       if (data != null && data.length > 0 ){
            sessionStorage.setItem(Config.IS_LOGGED_IN, "true");
            sessionStorage.setItem(Config.SESSION_USER_ID, data[0].id);
            sessionStorage.setItem(Config.SESSION_USER_ROLE, data[0].role);
            sessionStorage.setItem(Config.SESSION_USER_NAME, data[0].name);
            navigate('/home');
       }
       else{
        setErrorMessage("Invalid credentials!")
       }
    };

    return (
        <div className="addjobform">
             <Header menu={false} />
            <Container>
                <form  onSubmit={(e)=>handleSubmit(e)}>
                    <h4>Login Here</h4>
                    <Row>
                    <input 
                    type="username" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) =>setUsername(e.target.value)}
                    />
                    </Row><br/>
                    <Row>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    /> 
                    </Row><br/>
                    <Row>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                    </Row>
                    <button type="submit">Login</button>
                </form>
            </Container>
        </div>
    );
};

export default Loginpage;

