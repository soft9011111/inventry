import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function AddInventry() {
  const navigate = useNavigate();
  const [Inventry, setInventry] = useState([]);

  useEffect(() => {
    getInventry();
  }, []);

  async function getInventry() {
    const { data } = await supabase.from("inventry").select();
    setInventry(data);
  }

  return (
    <div className="listjobs">
      <Container>
        
        <Table striped bordered hover>
        <thead>
            <tr>
              <th >Category Name</th>
              <th >Sub Category Name</th>
              <th >Sec Sub Category Name</th>
              <th >Current Value</th>
              <th >Unit</th>
            </tr>
          </thead>
          <tbody>
            {Inventry.map((material) => (
              <tr>
                <td>{material.cate_name} </td>
                <td>{material.sub_cate_name}</td>
                <td>{material.sec_sub_cate_name}</td>
                <td>{material.current_value}</td>
                <td>{material.unit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>);
}
export default AddInventry;