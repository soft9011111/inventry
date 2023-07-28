import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";
import Config from "../../scripts/config";
import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ListBills() {
  const navigate = useNavigate();
  const [Bills, setBills] = useState([]);
  const [UserRole, setUserRole] = useState("");
  const [UserName, setUserName] = useState("");

  useEffect(() => {
    getBills();
    getSession();
  }, []);

  async function getBills() {
    const { data } = await supabase.from("bills").select();
    setBills(data);
  }

  async function getSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userrole = sessionStorage.getItem('userrole');
    const username = sessionStorage.getItem('username');
    if (isLoggedIn != null) {
      setUserRole(userrole);
      setUserName(username);
    } else {
      navigate("/");
    }
  }

  const viewbill = (bill) => {
    navigate({
      pathname: "/viewbill",
      search: createSearchParams({
        bill_id: bill.id
      }).toString()
    });
  }
  return (
    <div className="listjobs">
      <Header menu={true} username={UserName} />
      <Container>
        <div className="addjobbtn">
          <Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/addbill" >Add Bill</Button>  &nbsp;&nbsp;
          <Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/searchbill" >Search Bill</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th >Bill No</th>
              <th >Vendor Name</th>
              <th >Date</th>
              <th>Created by</th>
            </tr>
          </thead>
          <tbody>
            {Bills.map((bill) => (
              <tr key={bill.id} onClick={() => { viewbill(bill) }}>
                <td>{bill.bill_no}</td>
                <td>{bill.vendor_name}</td>
                <td>{bill.bill_date}</td>
                <td>{bill.created_by}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>);
}
export default ListBills;