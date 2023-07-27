import React, { useEffect, useState , useContext, createContext} from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";
import { useNavigate, createSearchParams } from "react-router-dom";
import Header from "../Header";


const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);


export default function AddBill() {
    const navigate = useNavigate();
    const [JobList, setJobList] = useState([]); 
    const [UserRole, setUserRole] = useState("");
    const [UserName, setUserName] = useState("");
    const [Bill, setBill] = useState({
        bill_no: "", vendor_name: "", bill_date: "New Job", job_id: "0",
    });

    useEffect(() => {
        getSession();
        getJobList();
    }, []);

    async function getJobList() {
        const { data, error } = await supabase.from("jobs")
            .select();
            setJobList(data);
    }

    async function getSession(){
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const userrole = sessionStorage.getItem('userrole');
        const username = sessionStorage.getItem('username');
         if( isLoggedIn != null){
            setUserRole(userrole);
            setUserName(username);
         }else{
            navigate("/");
         }
    }

    // update our state with the value 
    const changeHandler = (e) => {
        setBill({ ...Bill, [e.target.name]: e.target.value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        
        const { data, error } = await supabase.from("bills").insert(
            {
                bill_no: Bill.bill_no, vendor_name: Bill.vendor_name,
                job_id: Bill.job_id, bill_date: Bill.bill_date}).select();
        console.log(data);
        console.log(error);
        navigate({
            pathname: "/addbillmaterial",
            search: createSearchParams({
                bill_id: data[0].id
           })
        });
    };

    return (
        <div className="addjobform">
            <Header menu={true} username={UserName} />
            <Container>
                <h3 className="new">Add New Bill</h3>
                <form onSubmit={handleSubmit}>
                    <Row>Bill No</Row>
                    <Row ><input type="text" style={{ height: 40 }} name="bill_no" height="20" placeholder=""
                        value={Bill.bill_no} onChange={changeHandler} ></input>
                    </Row><br />
                    <Row>Vendor Name</Row>
                    <Row><input type="text" style={{ height: 40 }} name="vendor_name" placeholder=""
                        value={Bill.vendor_name} onChange={changeHandler}></input>
                    </Row><br />
                    <Row>Job</Row>
                    <Row ><select style={{ height: 40 }} name="job_id" onChange={changeHandler}>
                        <option value="0" >Select</option>
                        {JobList.map((job) => (
                            <option value={job.id}>{job.client_name}-{job.vehicle_no}</option>
                        ))}
                    </select>
                    </Row><br />
                    <Row>Bill Date</Row>
                    <Row><input type="date" style={{ height: 40 }} name="bill_date" placeholder=""
                        value={Bill.bill_date} onChange={changeHandler}></input>
                    </Row><br />
                    
                    <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">Add Material </Button></Row>
                    <br />
                    <Row><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/listjobs" >Back</Button>
                    </Row>
                </form>
            </Container>
        </div>
    );
}