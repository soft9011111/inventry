import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import ViewMaterial from "./ViewJobIntent";
import Config from "../../scripts/config";
import ViewJobDetails from "./ViewJobDetail";
import ViewJobIntent from "./ViewJobIntent";
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

  function addjobintent(){
    navigate({
      pathname: "/addjobintent",
      search: createSearchParams({
        job_id: searchParams.get("job_id")
      }).toString()
    });
  }

  return (
    <div className="listjobs">
      <Header menu={true} username={UserName} />
      <Container>
      <div className="addjobbtn"><Button style={{background:'gray', borderRadius:50}} variant="primary" onClick={()=>{addjobintent()}} >Add Intent</Button> 
        </div>
      <div>
      <ViewJobDetails job_id={searchParams.get("job_id")} />
        </div><br /><br />
        <div>
        <ViewJobIntent job_id={searchParams.get("job_id")} />
        </div>
      </Container>
    </div>);
}
export default ViewJob;