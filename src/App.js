import {React} from 'react';
import AdminDashboard from "./Components/Authentication/Admin/AdminDashboard";
import Login from "./Components/Authentication/Admin/Login";
import AddService from "./Components/Authentication/Vendor/AddService";
import SignUp from "./Components/Authentication/Vendor/SignUp";
import VendorData from "./Components/Authentication/Vendor/VendorData";
import ViewServices from "./Components/Authentication/Vendor/ViewServices";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewServicesAdmin from './Components/Authentication/Admin/ViewServicesAdmin';
import AdminHeader from './Components/Header';



function App() {


 
  return (
    <div className="App">   
     {/* <Home/> */}
     
     <Router>
           {/* <AdminHeader/> */}
      
      <Routes>
       
       
        <Route path="/" element={<Home />} />
        <Route path="/register" element = {<SignUp/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/vendordata/:vendorKey" element = {<VendorData/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/addservice/:vendorKey" element={<AddService/>}/>
        {/* <Route path="/viewservice/:vendorkey" element={<ViewServices/>}/> */}
        <Route path="/viewservicesadmin/:vendorKey" element={<ViewServicesAdmin/>}/>
        {/* </Main> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
 
    
      
    </Router>
 
    </div>
  );
}

export default App;
