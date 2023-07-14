import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import Config from "../../scripts/config";
import ViewBillDetail from "./ViewBillDetail";
import Table from 'react-bootstrap/Table';
import del_image from "../../asset/clear.jpg"

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);


export default function AddBillMaterial() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [secSubCategories, setSecSubCategories] = useState([]);
    const [BillDetail, setBillDetail] = useState({
        bill_id: "", purchase_value: "0", purchase_price: "0", material_ref_id: "",
        category_id: "-1", sub_category_id: "-1", sec_sub_category_id: "-1",
    });
    const [BillMaterial, setBillMaterial] = useState([]);
    const [Inventry, setInventry] = useState([]);

    useEffect(() => {
        setBillDetail({ ...BillDetail, bill_id: searchParams.get("bill_id") });
        getCategories();
        getInventry();
        getBillMaterial();
    }, []);

    async function getCategories() {
        const { data, error } = await supabase.from("category")
            .select()
        setCategories(data);
    }
    async function getInventry() {
        const { data } = await supabase.from("inventry").select();
        setInventry(data);
    }
    async function getBillMaterial() {
        const { data, error } = await supabase.from("bill_details")
            .select()
            .eq('bill_id', searchParams.get("bill_id"));
        setBillMaterial(data)
    }

    // update our state with the value 
    const categoryHandler = (e) => {
        getSubCategories(e.target.value);
    };
    async function getSubCategories(cate_id) {
        const { data, error } = await supabase.from("sub_category")
            .select()
            .eq('cate_id', cate_id);

        if (data.length == 0 && cate_id != "-1") {
            setBillDetail({ ...BillDetail, category_id: cate_id, sub_category_id: "0", sec_sub_category_id: "0" });
        } else {
            setBillDetail({ ...BillDetail, category_id: cate_id, sub_category_id: "-1", sec_sub_category_id: "-1" });
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
            setBillDetail({ ...BillDetail, sub_category_id: sub_cate_id, sec_sub_category_id: "0" });
        } else {
            setBillDetail({ ...BillDetail, sub_category_id: sub_cate_id, sec_sub_category_id: "-1" });
        }
        setSecSubCategories(data);
    }

    // update subcategory 
    const secSubCategoryHandler = (e) => {
        setBillDetail({ ...BillDetail, [e.target.name]: e.target.value });
    };
    const valueHandler = (e) => {
        setBillDetail({ ...BillDetail, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(BillDetail)
        if (BillDetail.category_id != "-1" && BillDetail.sub_category_id != "-1"
            && BillDetail.sec_sub_category_id != "-1") {
            if (BillDetail.sub_category_id == 0) {
                BillDetail.sub_category_id = null;
            }
            if (BillDetail.sec_sub_category_id == 0) {
                BillDetail.sec_sub_category_id = null;
            }

            const { data, error } = await supabase.from("bill_details").insert(
                {
                    bill_id: BillDetail.bill_id,
                    purchase_unit: BillDetail.purchase_value,
                    purchase_price: BillDetail.purchase_price,
                    cate_id: BillDetail.category_id,
                    sub_cate_id: BillDetail.sub_category_id,
                    sec_sub_cate_id: BillDetail.sec_sub_category_id,
                });
            // navigate({
            //     pathname: "/addbillmaterial",
            //     search: createSearchParams({
            //         bill_id: BillDetail.bill_id
            //     }).toString()
            // });
            setBillDetail({
                ...BillDetail, purchase_value: "0", purchase_price: "0", material_ref_id: "",
                category_id: "-1", sub_category_id: "-1", sec_sub_category_id: "-1"
            });
            getBillMaterial();
        }
    };
    function getCategoryName(row) {
        var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == row.cate_id)
            .filter(Inventry => Inventry.sub_cate_id == row.sub_cate_id)
            .filter(Inventry => Inventry.sec_sub_cate_id == row.sec_sub_cate_id)
        if (inventry_[0] != null) {
            return inventry_[0].cate_name;
        }
    }
    function getSubCategoryName(row) {
        var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == row.cate_id)
            .filter(Inventry => Inventry.sub_cate_id == row.sub_cate_id)
            .filter(Inventry => Inventry.sec_sub_cate_id == row.sec_sub_cate_id)
        if (inventry_[0] != null) {
            return inventry_[0].sub_cate_name;
        }
    }
    function getSecSubCategoryName(row) {
        var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == row.cate_id)
            .filter(Inventry => Inventry.sub_cate_id == row.sub_cate_id)
            .filter(Inventry => Inventry.sec_sub_cate_id == row.sec_sub_cate_id)
        if (inventry_[0] != null) {
            return inventry_[0].sec_sub_cate_name;
        }
    }
    async function removeMaterial(row) {
        console.log(row);
        const { data, error } = await supabase.from("bill_details")
            .delete()
            .eq('id', row.id);
        getBillMaterial();
    }
    return (
        <div className="addjobform">
            <Container>
                <div>
                    <ViewBillDetail bill_id={searchParams.get("bill_id")} />
                </div>
                <br />
                <div>
                    <h3 className="new">Add Bill Details</h3>
                    <form onSubmit={handleSubmit}>
                        <Row>Catagory</Row>
                        <Row ><select style={{ height: 40 }} name="category_id" onChange={categoryHandler}>
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
                        <Row>Purchased Value</Row>
                        <Row><input type="text" style={{ height: 40 }} name="purchase_value" placeholder=""
                            value={BillDetail.purchase_value} onChange={valueHandler}></input>
                        </Row><br />
                        <Row>Purchased Price</Row>
                        <Row><input type="text" style={{ height: 40 }} name="purchase_price" placeholder=""
                            value={BillDetail.purchase_price} onChange={valueHandler}></input>
                        </Row><br />
                        <br />
                        <Row><Button className="submit" style={{ background: 'gray', borderRadius: 50, }} type="submit">Add Material </Button></Row>
                        <br />
                        <Row><Button style={{ background: 'gray', borderRadius: 50 }} variant="primary" href="/listjobs" >Back</Button>
                        </Row>
                    </form>
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr><th ></th>
                                <th >Category</th>
                                <th >Sub Category</th>
                                <th >Sec Sub Category</th>
                                <th >Purchase Value</th>
                                <th >Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        {BillMaterial.map((Material) => (
                            <tbody>
                                <tr><td><img style={{ width: 20, height: 20 }} src={del_image} alt="Remove" onClick={() => { removeMaterial(Material) }} />
                                </td><td>{getCategoryName(Material)} </td><td>{getSubCategoryName(Material)} </td>
                                    <td>{getSecSubCategoryName(Material)} </td><td>{Material.purchase_unit}</td>
                                    <td>{Material.purchase_price}</td></tr>
                            </tbody>
                        ))}
                    </Table>
                </div>
            </Container>
        </div>
    );
}