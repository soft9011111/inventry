import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ListBills() {
  const navigate = useNavigate();
  const [Bills, setBills] = useState([]);

  useEffect(() => {
    getBills();
  }, []);

  async function getBills() {
    const { data } = await supabase.from("bills").select();
    setBills(data);
  }

  const viewbill = (bill) => {
    navigate({
      pathname: "/viewbill",
      search: createSearchParams({
        bill_id: bill.id
      }).toString()
    });
  }
  return (
    <div className="listjobs">
      <Container>
        <div className="addjobbtn"><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/addbill" >Add Bill</Button>  &nbsp;&nbsp;
          <Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/searchbill" >Search Bill</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th >Bill No</th>
              <th >Vendor Name</th>
              <th >Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Bills.map((bill) => (
              <tr key={bill.id} onClick={() => { viewbill(bill) }}>
                <td>{bill.bill_no}</td>
                <td>{bill.vendor_name}</td>
                <td>{bill.bill_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>);
}
export default ListBills;