import React, { useEffect, useState } from "react";
import { Container,Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import { createSearchParams, useNavigate } from "react-router-dom";
import Config from "../../scripts/config";
import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function SearchBills() {
  const navigate = useNavigate();
  const [Bills, setBills] = useState([]);
  const [startDate, setStartDate] =useState ('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    //getBills();
  }, []);

  
  //search bills
  async function searchBillsSubmit(e) {
    e.preventDefault();
    const { data } = await supabase.from("bills").select()
    .gte('bill_date',startDate)
    .lte('bill_date',endDate)
    .order('bill_date', { ascending: true })

    setBills(data);
    console.log(Bills);
    
  }
  const searchHandler=() => {
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
        <tr key={bill.id} >
          <td>{bill.bill_no}</td>
          <td>{bill.vendor_name}</td>
          <td>{bill.bill_date}</td>
        </tr>
      ))}
    </tbody>
  </Table> 

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
       <Header menu={true} />
      <Container>
        <h3 className="new">Search Bill</h3>
        <form onSubmit={searchBillsSubmit}>
          <Row>Bill No</Row>
          <Row ><input type="text" style={{ height: 40 }} 
                  name="bill_no" height="20" placeholder=""></input>
          </Row>
          <br />
          <Row>Bill Starting Date</Row>
          <Row><input type="date" style={{ height: 40 }} name="start_bill_date" placeholder=""
                  value={startDate}  onChange={e => setStartDate(e.target.value)} ></input>
          </Row><br />
          <Row>Bill Ending Date</Row>
          <Row><input type="date" style={{ height: 40 }} name="end_bill_date" placeholder=""
                  value={endDate}  onChange={e => setEndDate( e.target.value )}     ></input>
          </Row><br />
          <Row><Button className="search" style={{ background: 'gray', borderRadius: 50, }} 
                    type="search">Search </Button></Row>
          <br />
         {/* <div className="addjobbtn"><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/addbill" >Add Bill</Button>
        </div> */}
       
        </form>
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
        <tr key={bill.id} >
          <td>{bill.bill_no}</td>
          <td>{bill.vendor_name}</td>
          <td>{bill.bill_date}</td>
        </tr>
      ))}
    </tbody>
  </Table> 
      </Container>
    </div>
  );
}
export default SearchBills;