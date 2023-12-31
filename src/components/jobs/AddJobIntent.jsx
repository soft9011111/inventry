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


export default function AddJobIntent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [jobIntent, setJobIntent] = useState({
        job_id: "", intent_value: "0", material_ref_id: "", category_id: "-1", sub_category_id: "-1",
        sec_sub_category_id: "-1",
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [secSubCategories, setSecSubCategories] = useState([]);
    const [UserRole, setUserRole] = useState("");
    const [UserName, setUserName] = useState("");

    useEffect(() => {
        jobIntent.job_id = searchParams.get("job_id");
        jobIntent.intent_value = 0.0;
        getCategories();
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
    async function getCategories() {
        const { data, error } = await supabase.from("category")
            .select()
        setCategories(data);
    }

    async function selectInventry() {
        if (jobIntent.sec_sub_category_id != null && jobIntent.sub_category_id != null) {
            const { data } = await supabase.from("inventry").select()
                .eq('cate_id', jobIntent.category_id)
                .eq('sub_cate_id', jobIntent.sub_category_id)
                .eq('sec_sub_cate_id', jobIntent.sec_sub_category_id);
            updateInventry(data[0]);
        } else if (jobIntent.sec_sub_category_id == null && jobIntent.sub_category_id != null) {
            const { data } = await supabase.from("inventry").select()
                .eq('cate_id', jobIntent.category_id)
                .eq('sub_cate_id', jobIntent.sub_category_id);
            updateInventry(data[0]);
        } else if (jobIntent.sec_sub_category_id == null && jobIntent.sub_category_id == null) {
            const { data } = await supabase.from("inventry").select()
                .eq('cate_id', jobIntent.category_id);
            updateInventry(data[0]);
        }

    }

    async function updateInventry(data) {
        console.log(data.id);

        console.log(data.current_value);
        if (data.current_value > jobIntent.intent_value) {
            const updatec_value = parseFloat(data.current_value) -
                parseFloat(jobIntent.intent_value);

            const { updatepvalue } = await supabase.from("inventry")
                .update({ 'current_value': updatec_value })
                .eq('id', data.id);
        }


    }


    // update category 
    const changeHandler = (e) => {
        getSubCategories(e.target.value);
    };
    async function getSubCategories(cate_id) {
        const { data, error } = await supabase.from("sub_category")
            .select()
            .eq('cate_id', cate_id);

        if (data.length == 0 && cate_id != "-1") {
            setJobIntent({ ...jobIntent, category_id: cate_id, sub_category_id: "0", sec_sub_category_id: "0" });
        } else {
            setJobIntent({ ...jobIntent, category_id: cate_id, sub_category_id: "-1", sec_sub_category_id: "-1" });
        }
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
        console.log(jobIntent.category_id)
        if (jobIntent.category_id != "-1" && jobIntent.sub_category_id != "-1"
            && jobIntent.sec_sub_category_id != "-1") {
            if (jobIntent.sub_category_id == 0) {
                jobIntent.sub_category_id = null;
            }
            if (jobIntent.sec_sub_category_id == 0) {
                jobIntent.sec_sub_category_id = null;
            }

            const { data, error } = await supabase.from("job_intent").insert(
                {
                    job_id: jobIntent.job_id,
                    intent_value: jobIntent.intent_value,
                    cate_id: jobIntent.category_id,
                    sub_cate_id: jobIntent.sub_category_id,
                    sec_sub_cate_id: jobIntent.sec_sub_category_id,
                    created_by: UserName,
                });
            selectInventry();

            navigate({
                pathname: "/viewjob",
                search: createSearchParams({
                    job_id: jobIntent.job_id
                }).toString()
            });

        }
    };
    const valueHandler = (e) => {
        setJobIntent({ ...jobIntent, [e.target.name]: e.target.value });
    };

    return (
        <div className="addjobform">
            <Header menu={true} username={UserName} />
            <Container>
                <h4 className="new">Add Material Intent</h4>
                <div>
                    <ViewJobDetails job_id={searchParams.get("job_id")} />
                </div>
                <div>
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
                        <Row>Value</Row>
                        <Row><input type="text" style={{ height: 40 }} name="intent_value" placeholder=""
                            value={jobIntent.intent_value} onChange={valueHandler}></input>
                        </Row><br />
                        <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">SUBMIT</Button></Row>
                    </form>
                </div>
            </Container>
        </div>
    );
}
