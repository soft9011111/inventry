import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Footer from "./components/Footer";
import Loginpage from "./components/loginpage/Loginpage";
import Home from "./components/Home";
import ListJobs from "./components/jobs/ListJobs";
import AddJob from "./components/jobs/AddJob";
import ViewJob from "./components/jobs/ViewJob";
import AddJobIntent from "./components/jobs/AddJobIntent";
import ListInventry from "./components/materials/ListInventry";
import ListBills from "./components/bills/ListBills";
import ViewBill from "./components/bills/ViewBill";
import AddBill from "./components/bills/AddBill";
import AddBillMaterial from "./components/bills/AddBillMaterial";
import SearchBills from "./components/bills/SearchBills";
import AddJobLabour from "./components/jobs/AddJobLabour";
import ListUsers from "./components/users/ListUsers";
import AddUser from "./components/users/AddUser";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <div className="font">
      <BrowserRouter>
          <Routes>
            <Route path="" element={<Loginpage />} />
            <Route path="home" element={<Home />} />
            <Route path="listjobs" element={<ListJobs />} />
            <Route path="addjob" element={<AddJob />} />
            <Route path="viewjob" element={<ViewJob />} />
            <Route path="addjobintent" element={<AddJobIntent />} />
            <Route path="addlabourintent" element={<AddJobLabour />} />
            <Route path="listinventry" element={<ListInventry />} />
            <Route path="listbills" element={<ListBills />} />
            <Route path="viewbill" element={<ViewBill />} />
            <Route path="addbill" element={<AddBill />} />
            <Route path="searchbill" element={<SearchBills />} />
            <Route path="addbillmaterial" element={<AddBillMaterial />} />
            <Route path="users" element={<ListUsers />} />
            <Route path="adduser" element={<AddUser />} />
          </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
