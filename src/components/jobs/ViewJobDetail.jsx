import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
//import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { useNavigate,  createSearchParams } from "react-router-dom";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewJobDetails(Probs) {
  //const navigate = useNavigate();
  const [JobDetails, setJobDetails] = useState([]);
  
  useEffect(() => {
    getJobDetails();
  }, []);

  async function getJobDetails() {
    const { data, error } = await supabase.from("jobs")
      .select()
      .eq('id', Probs.job_id);
    setJobDetails(data);
    console.log(Probs.job_id);
    console.log(data);
  }

  return (
    <div >
      <Container>
      <div>
        <Table striped bordered hover>
          {JobDetails.map((JobDetail) => (
            <tbody>
              <tr><td>Client Name</td><td>{JobDetail.client_name}</td></tr>
              <tr><td>Vehicle No</td><td>{JobDetail.vehicle_no}</td></tr>
              <tr><td>Job Type</td><td>{JobDetail.job_type}</td></tr>
              <tr><td>Completion Date</td><td>{JobDetail.completion_date}</td></tr>
            </tbody>
          ))}
        </Table>
        </div>
      </Container>
    </div>);
}
export default ViewJobDetails;