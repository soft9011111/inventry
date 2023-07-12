import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { createClient } from "@supabase/supabase-js";
import Config from "../../scripts/config";

const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY);

function ViewMaterial(Probs) {
  const [JobIntent, setJobIntent] = useState([]);
  const [Inventry, setInventry] = useState([]);

  useEffect(() => {
    getInventry();
    getJobIntent();
  }, []);
  async function getInventry() {
    const { data } = await supabase.from("inventry").select();
    setInventry(data);
  }
  async function getJobIntent() {
    const { data, error } = await supabase.from("job_intent")
      .select()
      .eq('job_id', Probs.job_id);
      setJobIntent(data)
      data.map((element, index) => {
        var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == element.cate_id)
                .filter(Inventry => Inventry.sub_cate_id == element.sub_cate_id)
                .filter(Inventry => Inventry.sec_sub_cate_id == element.sec_sub_cate_id)
        // setJobIntent({ ...JobIntent, category_name: inventry_.cate_name, 
        //                              sub_cate_name: inventry_.sub_cate_name, 
        //                              sec_sub_cate_name: inventry_.sec_sub_cate_name,
        //                              intent_value:  element.intent_value}); 
      })
        
  }

 
//   async function getmethod() {
//   Categories.map((element, index) => {
//     var subcategories_ = SubCategories.filter(SubCategories => SubCategories.cate_id == element.id);

//     if (subcategories_.length > 0) {
//       subcategories_.map((sub_element, sub_index) => {
//         var secsubcategories_ = SecSubCategories.filter(SecSubCategories => SecSubCategories.sub_cate_id == sub_element.id);
//         if (secsubcategories_.length > 0) {
//           console.log(secsubcategories_);
//         }
//         else {
//           console.log(subcategories_[sub_index]);
//         }
//       })
//     } else {
//       console.log(element[index])
//     }
//   })
// }

function getCategoryName(row){
  var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == row.cate_id)
                .filter(Inventry => Inventry.sub_cate_id == row.sub_cate_id)
                .filter(Inventry => Inventry.sec_sub_cate_id == row.sec_sub_cate_id)
  if(inventry_[0] != null){
  return inventry_[0].cate_name;
  }
}
function getSubCategoryName(row){
  var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == row.cate_id)
                .filter(Inventry => Inventry.sub_cate_id == row.sub_cate_id)
                .filter(Inventry => Inventry.sec_sub_cate_id == row.sec_sub_cate_id)
  if(inventry_[0] != null){
  return inventry_[0].sub_cate_name;}
}
function getSecSubCategoryName(row){
  var inventry_ = Inventry.filter(Inventry => Inventry.cate_id == row.cate_id)
                .filter(Inventry => Inventry.sub_cate_id == row.sub_cate_id)
                .filter(Inventry => Inventry.sec_sub_cate_id == row.sec_sub_cate_id)
 if(inventry_[0] != null){
  return inventry_[0].sec_sub_cate_name;}
}

  return (
    <div className="listjobs">
      <Container>
      <div>
        <Table striped bordered hover>
        <thead>
            <tr>
              <th width="50%">Category</th>
              <th width="40%">Sub Category</th>
              <th width="40%">Sec Sub Category</th>
              <th width="40%">Value</th>
              <th></th>
            </tr>
          </thead>
          {JobIntent.map((Intent) => (
            <tbody>
              <tr><td>{getCategoryName(Intent)} </td><td>{getSubCategoryName(Intent)} </td><td>{getSecSubCategoryName(Intent)} </td><td>{Intent.intent_value}</td></tr>
            </tbody>
          ))}
        </Table>
        </div>
      </Container>
    </div>);
}
export default ViewMaterial;