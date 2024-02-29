import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../../Header';
import { Paper, Typography } from '@mui/material';

const ViewServices = () => {
  const  vendorKey   = useParams();
  console.log("key from services", vendorKey);
  const [services, setServices] = useState([]);
  
//   useEffect(() => {
//     // Retrieve services from local storage
//     const localStorageData = JSON.parse(localStorage.getItem('services')); // Replace 'your_localstorage_key' with the actual key used to store data in localStorage
//     if (localStorageData && localStorageData.length > 0) {
//       const vendorData = localStorageData[0]; // Assuming the vendor data is stored in the first element of the array
//       if (vendorData && vendorData.vendorKey) {
//         const vendorKeyFromStorage = vendorData.vendorKey.vendorKey; // Accessing the vendorKey property
//         console.log("vendorKeyfromStorage", vendorKeyFromStorage);
//         console.log("vendorKeyUseEffect", vendorKey);
//         if (vendorKey && vendorKeyFromStorage === vendorKey.vendorKey) {
//         console.log("vendorkeyfromstorage2", vendorKeyFromStorage);
       
//           setServices([vendorData]); // Set services to the data corresponding to the provided vendorKey
//         }

//       }
//         // const filteredServices = localStorageData.filter(service => service.vendorKey.vendorKey === vendorKey);
//         // setServices(filteredServices);
//     }
//   }, [vendorKey]);


useEffect(() => {
    // Retrieve services from local storage
    console.log("entered");
    const localStorageData = JSON.parse(localStorage.getItem('services')) || [];
    console.log("localstoragedata", localStorageData);
    console.log("vendorkeyservices", vendorKey);
    const filteredServices = localStorageData.filter(service => service.vendorKey.vendorKey === vendorKey);
   // console.log("checkKey", ser)

   
    console.log("useService", filteredServices);
    setServices(filteredServices);
  }, [vendorKey]);



  return (
    <>
      <AdminHeader />
      <Typography variant="h4" gutterBottom>
        Services Offered
      </Typography>
      <div>
        {services.map((service, index) => (
          <Paper key={index} elevation={3} style={{ marginBottom: '10px', padding: '10px' }}>
            <Typography variant="h6">{service.name}</Typography>
            <Typography variant="body1">Cost: {service.cost}</Typography>
            <Typography variant="body1">Description: {service.description}</Typography>
            <Typography variant="body1">Category: {service.category}</Typography>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default ViewServices;
