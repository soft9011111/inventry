import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);


export default function AddJob() {
    const navigate = useNavigate();

    const [jobInfo, setJobInfo] = useState({
        client_name: "", veh_no: "", job_type: "New Job", target_date: "",
    });
    // update our state with the value 
    const changeHandler = (e) => {
        setJobInfo({ ...jobInfo, [e.target.name]: e.target.value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        const { data, error } = await supabase.from("jobs").insert(
            {
                client_name: jobInfo.client_name, vehicle_no: jobInfo.veh_no,
                job_type: jobInfo.job_type, completion_date: jobInfo.target_date, status: 'In Progress'
            });
        console.log(error);
        console.log(data);
        navigate('/listjobs');
    };

    return (
        <div className="addjobform">
            <Container>
                <h3 className="new">Add New Job</h3>
                <form onSubmit={handleSubmit}>
                    <Row>Client Name</Row>
                    <Row ><input type="text" style={{ height: 40 }} name="client_name" height="20" placeholder=""
                        value={jobInfo.client_name} onChange={changeHandler} ></input>
                    </Row><br />
                    <Row>Vehicle No</Row>
                    <Row><input type="text" style={{ height: 40 }} name="veh_no" placeholder=""
                        value={jobInfo.veh_no} onChange={changeHandler}></input>
                    </Row><br />
                    <Row>Job Type</Row>
                    <Row>
                        <select style={{ height: 40 }} defaultValue={jobInfo.job_type} name="job_type" onChange={changeHandler}>
                            <option value="New Job">New Job</option>
                            <option value="Service">Service</option>
                        </select>
                    </Row><br />
                    <Row>Completion Date</Row>
                    <Row><input type="date" style={{ height: 40 }} name="target_date" placeholder=""
                        value={jobInfo.target_date} onChange={changeHandler}></input>
                    </Row><br />
                    <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">SUBMIT</Button></Row>
                    <br />
                    <Row><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/listjobs" >Back</Button>
                    </Row>
                </form>
            </Container>
        </div>
    );
}