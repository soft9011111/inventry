import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import Config from "../../scripts/config";
import BillMaterial from "./BillMaterial";
import ViewBillDetail from "./ViewBillDetail";
import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewBill() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [Bills, setBills] = useState([]);
  const [UserRole, setUserRole] = useState("");
  const [UserName, setUserName] = useState("");


  useEffect(() => {
    getBills();
    getSession();
  }, []);
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
  async function getBills() {
    const { data, error } = await supabase.from("bills")
      .select()
      .eq('id', searchParams.get("bill_id"));
    setBills(data);
  }

  return (
    <div >
       <Header menu={true} username={UserName} />
      <Container>
        <div>
          <ViewBillDetail bill_id={searchParams.get("bill_id")} />
        </div>
        <div>
          <BillMaterial bill_id={searchParams.get("bill_id")} />
        </div>
      </Container>
    </div>);
}
export default ViewBill;  