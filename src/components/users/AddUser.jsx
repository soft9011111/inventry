import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import Config from "../../scripts/config";
import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);


export default function AddUser() {
    const navigate = useNavigate();

    const [UserRole, setUserRole] = useState("");
    const [UserName, setUserName] = useState("");
    const [UserRoles, setUserRoles] = useState([]);

    useEffect(() => {
        getSession();
        getUserRoles();
    }, []);

    async function getSession() {
        const isLoggedIn = sessionStorage.getItem(Config.IS_LOGGED_IN);
        const userrole = sessionStorage.getItem(Config.SESSION_USER_ROLE);
        const username = sessionStorage.getItem(Config.SESSION_USER_NAME);
        if (isLoggedIn != null ) {
            setUserRole(userrole);
            setUserName(username);
        } else {
            sessionStorage.clear();
            navigate("/");
        }
    }
    async function getUserRoles() {
        const { data } = await supabase.from("user_role").select();
        setUserRoles(data);
    }
    const [UserInfo, setUserInfo] = useState({
        name: "", user_name: "", password: "", role: "",
    });
    // update our state with the value 
    const changeHandler = (e) => {
        setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(UserInfo);
        const { data, error } = await supabase.from("users").insert(
            {
                name: UserInfo.name,
                username: UserInfo.user_name,
                password: UserInfo.password,
                role: UserInfo.role
            });
        navigate('/users');
    };

    return (
        <div className="addjobform">
            <Header menu={true} username={UserName} />
            <Container>
                <h4 className="new">Add New User</h4>
                <form onSubmit={handleSubmit}>
                    <Row>Name</Row>
                    <Row ><input type="text" style={{ height: 40 }} name="name" height="20" placeholder=""
                        value={UserInfo.name} onChange={changeHandler} ></input>
                    </Row><br />
                    <Row>Login Name</Row>
                    <Row><input type="text" style={{ height: 40 }} name="user_name" placeholder=""
                        value={UserInfo.user_name} onChange={changeHandler}></input>
                    </Row><br />
                    <Row>Password</Row>
                    <Row><input type="text" style={{ height: 40 }} name="password" placeholder=""
                        value={UserInfo.password} onChange={changeHandler}></input>
                    </Row><br />
                    <Row>Role</Row>
                    <Row ><select style={{ height: 40 }} name="role" onChange={changeHandler}>
                        <option value="-1" >Select</option>
                        {UserRoles.map((role) => (
                            <option value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    </Row><br />
                    <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">SUBMIT</Button></Row>
                    <br />
                    <Row><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/listusers" >Back</Button>
                    </Row>
                </form>
            </Container>
        </div>
    );
}