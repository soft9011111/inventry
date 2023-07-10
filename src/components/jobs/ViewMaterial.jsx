import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewMaterial(Probs) {
  console.log(Probs.job_id)
  const [jobIntent, setJobIntent] = useState([]);

  useEffect(() => {
    getJobIntent();
  }, []);

  async function getJobIntent() {
    const { data, error } = await supabase.from("job_intent")
      .select()
      .eq('job_id', Probs.job_id);
      setJobIntent(data);
  }
  return (
    <div className="listjobs">
      <Container>
      <div>
        <Table striped bordered hover>
          {jobIntent.map((Intent) => (
            <tbody>
              <tr><td>{Intent.intent_value}</td><td>{Intent.created_at} </td></tr>
            </tbody>
          ))}
        </Table>
        </div>
      </Container>
    </div>);
}
export default ViewMaterial;