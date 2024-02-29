import React, { useEffect, useState } from 'react'
import { Typography, Grid, Paper, Divider, Button, Accordion, Box} from '@mui/material'
import {useNavigate, useParams } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import DoneIcon from '@mui/icons-material/Done';
import { Cancel } from '@mui/icons-material'
import MasterHeader, { DrawerHeader } from '../../MasterHeader'

const useStyles = makeStyles((theme) => ({
  customFontSize: {
    fontSize: '14px', 
  },

  smallButton: {
    fontSize: '12px', // Adjust the font size to reduce button size
    padding: '8px', // Adjust the padding to reduce button size
    minWidth: '45px', // Optionally adjust minWidth to shrink the button width
  
   // width : '60px'
  },
}));

const ViewServicesAdmin = () => {

  const classes = useStyles();

   
    const {vendorKey} = useParams();
    const [services, setServices] = useState([]);
    const [requestedCategories, setRequestedCategories] = useState([]);
    const navigate = useNavigate();
    


    const isAdminLoggedIn = localStorage.getItem("isAuthenticated") === 'true' 
                                && localStorage.getItem("isAdmin") === 'true'

    useEffect(() => {
  
        console.log("hello from services view");
        const localStorageData = JSON.parse(localStorage.getItem('services')) || [];
        console.log("localstoragedata", localStorageData);
        //const vendorServices = localStorageData.filter(service => service.vendorKey === vendorKey);
        // const vendorServices = localStorageData.filter(service => {
        //   console.log("service.vendorKey:", service.vendorKey.vendorKey);
        //   console.log("vendorKeyUse:", vendorKey);
        //   return service.vendorKey.vendorKey === vendorKey;
        // });
        const vendorServices = localStorageData.filter(service => {
          // Check if vendorKey is an object
          if (typeof service.vendorKey === 'object') {
            return service.vendorKey.vendorKey === vendorKey;
          } else {
            // Otherwise, assume vendorKey is a string
            return service.vendorKey === vendorKey;
          }
        });
        
        console.log("vendorServices", vendorServices);
       // console.log("vendorKeyUse:", vendorKey);
        setServices(vendorServices);
      }, [vendorKey]);

      useEffect(() => {

          const storedTempCategories = JSON.parse(localStorage.getItem('tempcategories')) || [];
          const vendorRequestCategories = storedTempCategories.filter(entry => entry.key === vendorKey);
          setRequestedCategories(vendorRequestCategories);

      },[vendorKey]);  

      useEffect(() => {

        if(!isAdminLoggedIn)
        {
          navigate('/login');
        }
      },[isAdminLoggedIn,navigate]);

      const handleApprove = (categoryName) => {
        const updatedCategories = requestedCategories.filter(category => category.name !== categoryName);
        setRequestedCategories(updatedCategories);
        const listedCategories = JSON.parse(localStorage.getItem('listedcategory')) || [];
        if (!listedCategories.includes(categoryName)) {
          localStorage.setItem('listedcategory', JSON.stringify([...listedCategories, categoryName]));
        }

        const tempCategories = JSON.parse(localStorage.getItem('tempcategories')) || [];
        const updatedTempCategories = tempCategories.filter(category => category.name !== categoryName);
        localStorage.setItem('tempcategories', JSON.stringify(updatedTempCategories));

        setServices(prevServices => prevServices.filter(service => service.name !== categoryName));
      };

      const handleReject = (name) => {
        // Remove the category from tempcategories in localStorage
        const tempCategories = JSON.parse(localStorage.getItem('tempcategories')) || [];
        const updatedTempCategories = tempCategories.filter(category => category.name !== name);
        localStorage.setItem('tempcategories', JSON.stringify(updatedTempCategories));
    
        // Remove the category from the UI by updating state
        setServices(prevServices => prevServices.filter(service => service.name !== name));
      };

  return (
     <Box sx={{display : 'flex'}}>
      <MasterHeader/>
      <Box sx={{flexGrow : 1 , p : 3}}>
        <DrawerHeader/>
     
    {/* <AdminHeader /> */}
    {/* <Typography  gutterBottom variant="h4" style={{padding : "10px"}}>
      View Services
    </Typography> */}
     <Accordion style={{padding : "20px"}}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
               <Typography variant='h5'> View Services
            
               
               </Typography>
               </div>
               </Accordion>
    <Grid container spacing={2}>
    <Grid item xs={6}>
      {services.map((service, index) => (
       
        <Grid key={index} item xs={6}>
          <Paper elevation={3} style={{ padding: '20px', margin: '10px 20px 10px 20px'}}>
            <Typography gutterBottom className={classes.customFontSize}>
             <b> Service Name: </b> {service.name}
            </Typography>
            <Divider />
            <Typography className={classes.customFontSize} mt={1}>
              <b>Cost:</b> {service.cost}
            </Typography>
            <Typography className={classes.customFontSize}>
              <b>Description:</b> {service.description}
            </Typography>
            <Typography className={classes.customFontSize}>
              <b>Category:</b> {service.category}
            </Typography>

           
          </Paper>

          
 
        </Grid>
      ))}
      </Grid>

          <Grid item xs={6}>
          {requestedCategories.map((category, index)=> (
               <Grid key={index} item xs={6}>
                <Paper elevation={3} style={{ padding: '20px', margin: '10px 20px 10px 20px' }}>
            
                <Typography className={classes.customFontSize} mb={2}>
                <b>Requested Category:</b> {category.name}
                </Typography>
                   <Button variant="contained" 
                           className={classes.smallButton} 
                           style={{marginRight: "10px", backgroundColor : '#673AB7'}}
                           onClick={() => handleApprove(category.name)}
                           endIcon={<DoneIcon/>}>
                           Approve</Button>
                   <Button 
                           variant="contained" 
                           className={classes.smallButton} 
                           style={{backgroundColor : '#673AB7'}}
                           onClick={() => handleReject(category.name)}
                           endIcon={<Cancel/>}>Reject</Button>
          
              </Paper>
              </Grid>
           ))}
           </Grid>
    </Grid>
    </Box>
  </Box>
  )
}

export default ViewServicesAdmin