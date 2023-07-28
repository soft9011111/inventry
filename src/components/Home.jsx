import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
//import { useAuth } from "../contexts/AuthContext";
import Config from "../scripts/config";

const Home = (props) => {
    const navigate = useNavigate();
    const [UserRole, setUserRole] = useState("");
    const [UserName, setUserName] = useState("");
    //const { authUser, isLoggedIn } = useAuth();
    useEffect(() => {
        getSession();
    }, []);
    async function getSession() {
        const isLoggedIn = sessionStorage.getItem(Config.IS_LOGGED_IN);
        const userrole = sessionStorage.getItem(Config.SESSION_USER_ROLE);
        const username = sessionStorage.getItem(Config.SESSION_USER_NAME);
        if (isLoggedIn != null && userrole == Config.ADMIN_ROLE_ID) {
            setUserRole(userrole);
            setUserName(username);
        } else {
            sessionStorage.clear();
            navigate("/");
        }
    }
    return (
        <div>
            <Header menu={true} />
            <Container>
                <h3 className="text-center mt-3">Home</h3>
            </Container>
        </div>);
}

export default Home;