import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";
import del_image from "../../asset/clear.jpg"
const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function EditBillMaterial(Probs) {
  const [BillMaterial, setBillMaterial] = useState([]);
  const [Inventry, setInventry] = useState([]);

  useEffect(() => {
    getInventry();
    getBillMaterial();
  }, []);
  async function getInventry() {
    const { data } = await supabase.from("inventry").select();
    setInventry(data);
  }
  async function getBillMaterial() {
    const { data, error } = await supabase.from("bill_details")
      .select()
      .eq('bill_id', Probs.bill_id);
    setBillMaterial(data)
  }

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

  async function removeMaterial(row){
    console.log(row);
    const { data, error } = await supabase.from("bill_details")
    .delete()
    .eq('id', row.id);
    getBillMaterial();
  }

  return (
    <div className="listjobs">
      <Container>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
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
                <tr><td><img style={{ width: 25, height: 25 }} src={del_image}  alt="Remove" onClick={() => { removeMaterial(Material) }} />
                </td><td>{getCategoryName(Material)} </td><td>{getSubCategoryName(Material)} </td>
                  <td>{getSecSubCategoryName(Material)} </td><td>{Material.purchase_unit}</td>
                  <td>{Material.purchase_price}</td></tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
    </div>);
}
export default EditBillMaterial;