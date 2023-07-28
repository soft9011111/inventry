import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createClient } from "@supabase/supabase-js";
import Table from 'react-bootstrap/Table';
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import Config from "../../scripts/config";
import ViewJobDetails from "./ViewJobDetail";
import Header from "../Header";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);


export default function AddJobLabour() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [LabourWorkNameList, setLabourWorkNameList] = useState([]);
    const [UserRole, setUserRole] = useState("");
    const [UserName, setUserName] = useState("");
    const [JobLabour, setJobLabour] = useState({
        job_id: "", work_name_id: "", resource_name: "", work_hr: "0", amount: "",
    });

    useEffect(() => {
        JobLabour.job_id = searchParams.get("job_id");
        getJLabourWorkName();
        getSession();
    }, []);
    async function getSession() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const userrole = sessionStorage.getItem('userrole');
        const username = sessionStorage.getItem('username');
        if (isLoggedIn != null) {
            setUserRole(userrole);
            setUserName(username);
        } else {
            navigate("/");
        }
    }
    async function getJLabourWorkName() {
        const { data, error } = await supabase.from("labour_work_name")
            .select();
        setLabourWorkNameList(data);
    }

    const valueHandler = (e) => {
        setJobLabour({ ...JobLabour, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (JobLabour.work_name_id != "-1" && JobLabour.work_hr > 0){
            const { data, error } = await supabase.from("job_labour").insert(
                {
                    job_id: JobLabour.job_id,
                    work_name_id: JobLabour.work_name_id,
                    resource_name: JobLabour.resource_name,
                    work_hr: JobLabour.work_hr,
                    amount: JobLabour.amount,
                    created_by: UserName,
                });
            navigate({
                pathname: "/viewjob",
                search: createSearchParams({
                    job_id: JobLabour.job_id
                }).toString()
            });
        }
    };

    return (
        <div className="addjobform">
            <Header menu={true} username={UserName} />
            <Container>
                <h4 className="new">Add Labour</h4>
                <div>
                    <ViewJobDetails job_id={searchParams.get("job_id")} />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <Row>Work</Row>
                        <Row ><select style={{ height: 40 }} name="work_name_id" onChange={valueHandler}>
                            <option value="-1" >Select</option>
                            {LabourWorkNameList.map((workname) => (
                                <option value={workname.id}>{workname.name}</option>
                            ))}
                        </select>
                        </Row><br />
                        <Row>Resource Name</Row>
                        <Row><input type="text" style={{ height: 40 }} name="resource_name" placeholder=""
                            value={JobLabour.worker_name} onChange={valueHandler}></input>
                        </Row><br />
                        <Row>Working hours</Row>
                        <Row><input type="text" style={{ height: 40 }} name="work_hr" placeholder=""
                            value={JobLabour.work_hr} onChange={valueHandler}></input>
                        </Row><br />
                        <Row>Amount</Row>
                        <Row><input type="text" style={{ height: 40 }} name="amount" placeholder=""
                            value={JobLabour.amount} onChange={valueHandler}></input>
                        </Row><br />
                        <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">SUBMIT</Button></Row>
                    </form>
                </div>
            </Container>
        </div>
    );
}
