import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Footer from "./components/Footer";
import Loginpage from "./components/loginpage/Loginpage";
import Header from './components/Header';
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
import Navigation from "./components/MainHeader/Navigation";
import PrivateRoutes from "./components/utils/privateRoutes";
import SearchBills from "./components/bills/SearchBills";

function App() {
  return (
    <div className="App">
     
      
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Loginpage />} />
             <Route path="home" element={<Home />} />
            <Route path="listjobs" element={<ListJobs />} />
            <Route path="addjob" element={<AddJob />} />
            <Route path="viewjob" element={<ViewJob />} />
            <Route path="addjobintent" element={<AddJobIntent />} />
            <Route path="listinventry" element={<ListInventry />} />
            <Route path="listbills" element={<ListBills />} />
            <Route path="viewbill" element={<ViewBill />} />
            <Route path="addbill" element={<AddBill />} />
            <Route path="searchbill" element={<SearchBills />} />
            <Route path="addbillmaterial" element={<AddBillMaterial />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
      
    </div>
  );
}

export default App;
