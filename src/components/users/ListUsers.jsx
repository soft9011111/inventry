import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";
import Config from "../../scripts/config";
import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ListUsers() {
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);
  const [UserRole, setUserRole] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserRoles, setUserRoles] = useState([]);

  useEffect(() => {
    getUsers();
    getSession();
    getUserRoles();

  }, []);

  async function getUsers() {
    const { data } = await supabase.from("users").select();
    setUsers(data);
  }

  async function getUserRoles() {
    const { data } = await supabase.from("user_role").select();
    setUserRoles(data);
  }

  function getUserRoleName(row) {
    var inventry_ = UserRoles.filter(UserRoles => UserRoles.id == row.role);
    if (inventry_[0] != null) {
      return inventry_[0].name;
    }
  }
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

  function updateUser(user) {
    navigate({
      pathname: "/updateuser",
      search: createSearchParams({
        user_id: user.id
      }).toString()
    });
  }
  return (
    <div className="listjobs">
      <Header menu={true} username={UserName} />
      <Container>
        <div className="addjobbtn"><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/adduser" >Add User</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th >Name</th>
              <th >User Name</th>
              <th >Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Users.map((User) => (
              <tr key={User.id} onClick={() => {  }}>
                <td>{User.name} </td>
                <td>{User.username} </td>
                <td>{getUserRoleName(User)} </td>
                {/* <td><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" onClick={() => { updateUser(User) }} >Update</Button></td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>);
}
export default ListUsers;