import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

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
        <div className="addjobbtn"><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/addjob" >Add Job</Button>
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
              <tr key={job.id} onClick={() => { viewjob(job) }}>
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