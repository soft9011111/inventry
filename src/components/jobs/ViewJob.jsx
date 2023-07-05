import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useSearchParams } from "react-router-dom";

const supabase = createClient("https://jnklmllknvssnmqrtnue.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impua2xtbGxrbnZzc25tcXJ0bnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyNzg3ODIsImV4cCI6MjAwMzg1NDc4Mn0.PJ6LXiLWtKVloHSjcSbe1gVnT9hTCR2OlaqsZXvIXh0");

function ViewJob() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("job_id"))
  const [JobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    getJobDetails();
  }, []);

  async function getJobDetails() {
    const { data, error } = await supabase.from("jobs")
      .select()
      .eq('id', searchParams.get("job_id"));
    setJobDetails(data);
  }

  return (
    <div className="listjobs">
      <Container>
        <Table striped bordered hover>
          {JobDetails.map((JobDetail) => (
            <tbody>
              <tr><td>Client Name</td><td>{JobDetail.client_name}</td></tr>
              <tr><td>Vehicle No</td><td>{JobDetail.vehicle_no} </td></tr>
              <tr><td>Job Type</td><td>{JobDetail.job_type} </td></tr>
              <tr><td>Completion Date</td><td>{JobDetail.completion_date} </td> </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </div>);
}
export default ViewJob;
