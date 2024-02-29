import {React, useState} from 'react';
//import AdminDashboard from "./Components/Authentication/Admin/AdminDashboard";
import Login from "./Authentication/Admin/Login";
import AddService from "./Authentication/Vendor/AddService";
import SignUp from "./Authentication/Vendor/SignUp";
import VendorData from "./Authentication/Vendor/VendorData";
import ViewServices from "./Authentication/Vendor/ViewServices";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewServicesAdmin from './Authentication/Admin/ViewServicesAdmin';
import AdminDashboard from './Authentication/Admin/AdminDashboard';

const AllRoutes = () => {
  return (
    <div>

  
           {/* <AdminHeader/> */}
    
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/register" element = {<SignUp/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/vendordata/:vendorKey" element = {<VendorData/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/addservice/:vendorKey" element={<AddService/>}/>
        <Route path="/viewservice/:vendorkey" element={<ViewServices/>}/>
        <Route path="/viewservicesadmin/:vendorKey" element={<ViewServicesAdmin/>}/>
        {/* </Main> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
     
      


    </div>
  )
}

export default AllRoutes