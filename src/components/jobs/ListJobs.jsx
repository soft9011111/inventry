import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';      
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";

const supabase = createClient("https://jnklmllknvssnmqrtnue.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impua2xtbGxrbnZzc25tcXJ0bnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyNzg3ODIsImV4cCI6MjAwMzg1NDc4Mn0.PJ6LXiLWtKVloHSjcSbe1gVnT9hTCR2OlaqsZXvIXh0");

function ListJobs() {
  const navigate = useNavigate();
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    const { data } = await supabase.from("jobs").select();
    setJobs(data);
  }
  
const viewjob = (job) => {
  navigate({
    pathname: "/viewjob",
    search: createSearchParams({
        job_id: job.id
    }).toString()
});


 }
  return (
    <div className="listjobs">
      <Container>
        <div className="addjobbtn"><Button style={{background:'gray', borderRadius:50}} variant="primary" href="/addjob" >Add Job</Button> 
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th width="50%">Client Name</th>
              <th width="40%">Veh No</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Jobs.map((job) => (
              <tr key={job.id} onClick={()=>{viewjob(job)}}>
                <td>{job.client_name}
                </td>
                <td>{job.vehicle_no}
                </td>
                {/* <td><img style={{ width: 40, height: 40 }} src={view}  alt="Logo" onClick={Trigger(job)} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>);
}
export default ListJobs;
