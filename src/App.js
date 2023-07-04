import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import ListJobs from "./components/jobs/ListJobs";
import AddJob from "./components/jobs/AddJob";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="listjobs" element={<ListJobs />} />
            <Route path="addjob" element={<AddJob />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
