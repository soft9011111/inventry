import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewBillDetail(Probs) {
  const [Bills, setBills] = useState([]);

  useEffect(() => {
    getBills();
  }, []);

  async function getBills() {
    const { data, error } = await supabase.from("bills")
      .select()
      .eq('id', Probs.bill_id);
      setBills(data);
  }

  return (
    <div className="listjobs">
      <Container>
      <div>
        <Table striped bordered hover>
          {Bills.map((bill) => (
            <tbody>
              <tr><td>Bill No </td><td>{bill.bill_no}</td></tr>
              <tr><td>Vendor Name</td><td>{bill.vendor_name}</td></tr>
              <tr><td>Date</td><td>{bill.bill_date}</td></tr>
            </tbody>
          ))}
        </Table>
        </div>
      </Container>
    </div>);
}
export default ViewBillDetail;  