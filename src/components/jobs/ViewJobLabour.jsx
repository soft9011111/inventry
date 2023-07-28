import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewJobIntent(Probs) {
  const [JobLabour, setJobLabour] = useState([]);
  const [LabourWorkNameList, setLabourWorkNameList] = useState([]);


  useEffect(() => {
    getJobLabour();
    getLabourWorkName();

  }, []);

  async function getLabourWorkName() {
    const { data, error } = await supabase.from("labour_work_name")
        .select();
    setLabourWorkNameList(data);
}
  async function getJobLabour() {
    const { data, error } = await supabase.from("job_labour")
      .select()
      .eq('job_id', Probs.job_id);
      setJobLabour(data)
  }

  function getWorkName(row){
    var workname_ = LabourWorkNameList.filter(LabourWorkNameList => LabourWorkNameList.id == row.work_name_id)
    if(workname_[0] != null){
    return workname_[0].name;}
  }

  return (
    <div >
      <Container>
      <div>
        <Table striped bordered hover>
        <thead>
            <tr>
              <th >Work</th>
              <th >Resource Name</th>
              <th >Work hour</th>
              <th >amount</th>
              <th>Added By</th>
            </tr>
          </thead>
          {JobLabour.map((labour) => (
            <tbody>
              <tr><td>{getWorkName(labour)} </td><td>{labour.resource_name} </td>
              <td>{labour.work_hr} </td><td>{labour.amount}</td>
              <td>{labour.created_by}</td></tr>
            </tbody>
          ))}
        </Table>
        </div>
      </Container>
    </div>);
}
export default ViewJobIntent;