import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";


const Home = (props) => {
    const navigate = useNavigate();
    const [UserRole, setUserRole] = useState("");
    const [UserName, setUserName] = useState("");

    useEffect(() => {
      getSession();
      }, []);
      async function getSession(){
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const userrole = sessionStorage.getItem('userrole');
        const username = sessionStorage.getItem('username');
         if( isLoggedIn != null){
            setUserRole(userrole);
            setUserName(username);
         }else{
            navigate("/");
         }
    }
        return (
            <div>
                <Header menu={true} username={UserName} />
                <Container>
                    <h3 className="text-center mt-3">Home</h3>
                </Container>
            </div>);
    }

export default Home;