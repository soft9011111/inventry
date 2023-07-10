import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createClient } from "@supabase/supabase-js";
import Table from 'react-bootstrap/Table';
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);


export default function AddJobIntent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [jobIntent, setJobIntent] = useState({
        job_id: "", intent_value: "", material_ref_id: "", category_id: "-1", sub_category_id: "-1",
        sec_sub_category_id: "-1",
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [secSubCategories, setSecSubCategories] = useState([]);
    const [JobDetails, setJobDetails] = useState([]);

    useEffect(() => {
        jobIntent.job_id = searchParams.get("job_id");
        jobIntent.intent_value = 0.0;
        getCategories();
        getJobDetails();
        
    }, []);

    async function getCategories() {
        const { data, error } = await supabase.from("category")
            .select()
        setCategories(data);
    }

    async function getJobDetails() {
        const { data, error } = await supabase.from("jobs")
            .select()
            .eq('id', jobIntent.job_id);
        setJobDetails(data);
    }

    // update category 
    const changeHandler = (e) => {
        setJobIntent({ ...jobIntent, [e.target.name]: e.target.value });
        if (e.target.value !== -1) {
            getSubCategories(e.target.value);
        } else {
            setJobIntent({ ...jobIntent, category_id: "-1" });
            getSecSubCategories(-1);
        }

    };
    async function getSubCategories(cate_id) {
        const { data, error } = await supabase.from("sub_category")
            .select()
            .eq('cate_id', cate_id);
        setSubCategories(data);
    }

    // update subcategory 
    const subCategoryHandler = (e) => {
        getSecSubCategories(e.target.value);
    };
    async function getSecSubCategories(sub_cate_id) {
        const { data, error } = await supabase.from("sec_sub_category")
            .select()
            .eq('sub_cate_id', sub_cate_id);
        if (data.length == 0 && sub_cate_id != "-1") {
            setJobIntent({ ...jobIntent, sub_category_id: sub_cate_id, sec_sub_category_id: "0" });
        } else {
            setJobIntent({ ...jobIntent, sub_category_id: sub_cate_id, sec_sub_category_id: "-1" });
        }
        setSecSubCategories(data);
    }

    // update subcategory 
    const secSubCategoryHandler = (e) => {
        setJobIntent({ ...jobIntent, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (jobIntent.category_id != "-1" && jobIntent.sub_category_id != "-1"
            && jobIntent.sec_sub_category_id != "-1") {
            jobIntent.material_ref_id = jobIntent.category_id + "_" +jobIntent.sub_category_id + "_"+jobIntent.sec_sub_category_id;
            const { data, error } = await supabase.from("job_intent").insert(
                {
                    job_id: jobIntent.job_id,
                    intent_value: jobIntent.intent_value,
                    //material_ref_id: jobIntent.material_ref_id
                });
            console.log(error);
            console.log(data);
            navigate('/listjobs');
        }

    };

    return (
        <div className="addjobform">
            <Container>
                <h3 className="new">Add New Intent</h3>
                <div>
                    <Table striped bordered hover>
                        {JobDetails.map((JobDetail) => (
                            <tbody>
                                <tr><td>Client Name</td><td>{JobDetail.client_name}</td></tr>
                                <tr><td>Vehicle No</td><td>{JobDetail.vehicle_no} </td></tr>
                                <tr><td>Job Type</td><td>{JobDetail.job_type} </td></tr>
                            </tbody>
                        ))}
                    </Table>
                </div>

                <form onSubmit={handleSubmit}>
                    <Row>Catagory</Row>
                    <Row ><select style={{ height: 40 }} name="category_id" onChange={changeHandler}>
                        <option value="-1" >Select</option>
                        {categories.map((categoriy) => (
                            <option value={categoriy.id}>{categoriy.name}</option>
                        ))}
                    </select>
                    </Row><br />
                    <Row>Sub Catagory</Row>
                    <Row ><select style={{ height: 40 }} name="sub_category_id" onChange={subCategoryHandler}>
                        <option value="-1" >Select</option>
                        {subCategories.map((subCategory) => (
                            <option value={subCategory.id}>{subCategory.name}</option>
                        ))}
                    </select>
                    </Row><br />
                    <Row>Sec Sub Catagory</Row>
                    <Row ><select style={{ height: 40 }} name="sec_sub_category_id" onChange={secSubCategoryHandler}>
                        <option value="-1" >Select</option>
                        {secSubCategories.map((secSubCategory) => (
                            <option value={secSubCategory.id}>{secSubCategory.name}</option>
                        ))}
                    </select>
                    </Row><br />
                    <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">SUBMIT</Button></Row>
                </form>
            </Container>
        </div>
    );
}
