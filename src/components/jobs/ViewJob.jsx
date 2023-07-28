import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import Config from "../../scripts/config";
import ViewJobDetails from "./ViewJobDetail";
import ViewJobIntent from "./ViewJobIntent";
import ViewJobLabour from "./ViewJobLabour";

import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewJob() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [JobDetails, setJobDetails] = useState([]);
  const [UserRole, setUserRole] = useState("");
  const [UserName, setUserName] = useState("");

  useEffect(() => {
    getSession();
    getJobDetails();
  }, []);

  async function getJobDetails() {
    const { data, error } = await supabase.from("jobs")
      .select()
      .eq('id', searchParams.get("job_id"));
    setJobDetails(data);
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

  function addjobintent() {
    navigate({
      pathname: "/addjobintent",
      search: createSearchParams({
        job_id: searchParams.get("job_id")
      }).toString()
    });
  }

  function addjlabourbintent() {
    navigate({
      pathname: "/addlabourintent",
      search: createSearchParams({
        job_id: searchParams.get("job_id")
      }).toString()
    });
  }

  return (
    <div>
      <Header menu={true} username={UserName} />
      <Container>
        <div className="addjobbtn">
          <Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" onClick={() => { addjobintent() }} >Add Material Intent</Button>&nbsp;&nbsp;
          <Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" onClick={() => { addjlabourbintent() }} >Add Labour Intent</Button>
        </div><br />
        <div>
          
          <Row><ViewJobDetails job_id={searchParams.get("job_id")} /></Row>
          <Row><ViewJobIntent job_id={searchParams.get("job_id")} /></Row>
          <Row><ViewJobLabour job_id={searchParams.get("job_id")} /></Row>
        </div>
      </Container>
    </div>);
}
export default ViewJob;