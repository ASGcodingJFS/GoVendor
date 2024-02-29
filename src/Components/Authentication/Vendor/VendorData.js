import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVendors } from '../Redux/VendorSlice'
import { DrawerHeader } from '../../Header'
import { Button, Divider, TextField, Skeleton, Box } from '@mui/material'
import { Typography, Paper, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MasterHeader from '../../MasterHeader'


const useStyles = makeStyles((theme) => ({

  customFont: {

    fontSize: '16px'

  },

  serviceNameFont: {

    fontSize: '18px',
    fontWeight: 'bold',
  },

  servicePaper: {

    padding: '20px 5px 0px 20px',
    margin: '10px 0px 5px 5px',
    height: '150px',
    width: '230px',
    border: '2px solid #673AB7',
    borderRadius: '5px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
    position: 'relative'

  },

  dataPaper: {

    margin: '0px 5px 10px 20px', 
    padding: '25px', 
    paddingBottom: '50px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)'

  },

  servicesOfferedPaper: {


    margin: '0px 15px 10px 5px', 
    padding: '25px 5px 25px 10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)'
  },



  verified: {

    position: 'absolute',
    top: 10,
    right: 10,
    color: '#08c411',
    fontSize: '16px'
  },

  inputFocused: {

    '& label.Mui-focused': {
      color: '#673AB7',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#673AB7',
    },
  },



}));



const VendorData = () => {

  const classes = useStyles();

  //Get the vendorKey from the URL params
  const { vendorKey } = useParams();
  console.log("key from data", vendorKey);

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isVendorLoggedIn = localStorage.getItem("isAuthenticated") === 'true' &&
    localStorage.getItem("isAdmin") === 'false';


  useEffect(() => {
    if (!isVendorLoggedIn) {
      navigate('/login');
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [isVendorLoggedIn, navigate]);


  useEffect(() => {

    dispatch(fetchVendors());

  }, [dispatch]);

  const vendorDetails = useSelector(state => state.vendors.find(vendor => vendor.vendorKey === vendorKey));
  console.log("vendorDEtails", vendorDetails);
  const vendorStatus = vendorDetails ? vendorDetails.status : 'Unknown';
  
  useEffect(() => {
    if (vendorDetails) {
      setLoading(false);
     

    }
  }, [vendorDetails]);
 

  useEffect(() => {

    console.log("hello from services view");
    const localStorageData = JSON.parse(localStorage.getItem('services')) || [];
    console.log("localstoragedata", localStorageData);

    // const vendorServices = localStorageData.filter(service => {
    //   console.log("service.vendorKey:", service.vendorKey.vendorKey);
    //   console.log("vendorKeyUse:", vendorKey);
    //   return service.vendorKey.vendorKey === vendorKey;
    // });
    //const vendorServices = localStorageData.filter(service => service.vendorKey === vendorKey);
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

    setServices(vendorServices);
  }, [vendorKey]);

  


  const handleService = () => {

    navigate(`/addservice/${vendorKey}`);

  }

  if (loading) {
    return <div><Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} /></div>
  }

  return (

    <Box sx={{ display: 'flex' }}>
      <MasterHeader />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}
              className={classes.dataPaper}>
              <Typography variant='h4' gutterBottom>Vendor Details</Typography>
              <Divider />
              {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: '5px' }}> */}
              <Grid container spacing={2} style={{ marginTop: '5px' }}>
                <Grid item xs={12} sm={6}>
                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>First Name</Typography>
                  <TextField
                    id="read-only-input"
                    defaultValue={vendorDetails.firstName}
                    className={classes.inputFocused}
                    InputProps={{
                      readOnly: true
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Last Name</Typography>
                  <TextField
                    id="read-only-input"
                    defaultValue={vendorDetails.lastName}
                    className={classes.inputFocused}
                    InputProps={{
                      readOnly: true
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={12} sm={6}>

                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Email</Typography>
                  <TextField
                    id="read-only-input"
                    defaultValue={vendorDetails.email}
                    className={classes.inputFocused}
                    InputProps={{
                      readOnly: true
                    }}
                  ></TextField>

                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Registration Date</Typography>
                  <TextField
                    id="read-only-input"
                   // defaultValue={new Date().toLocaleDateString()}
                   defaultValue={vendorDetails ? (vendorDetails.rDate) : new Date().toLocaleDateString()}
                    className={classes.inputFocused}
                    InputProps={{
                      readOnly: true
                    }}
                  ></TextField>
                </Grid>


                <Grid item xs={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Status</Typography>
                  <TextField
                    id="read-only-input"
                    defaultValue={vendorStatus.charAt(0).toUpperCase() + vendorStatus.slice(1)}
                    className={classes.inputFocused}
                    InputProps={{
                      readOnly: true
                    }}
                  ></TextField>
                </Grid>


                <Grid item xs={12}>
                  <Button variant="contained"
                    onClick={handleService}
                    disabled={vendorStatus !== 'active'}
                    sx={{
                      backgroundColor: '#673AB7', '&:hover': {
                        backgroundColor: '#673AB7', // Keep the same color on hover
                      },
                    }}>Add Service</Button>
                </Grid>

              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>

            <Paper elevation={3} className={classes.servicesOfferedPaper}>


              <Typography variant="h4" gutterBottom style={{ paddingLeft: '25px' }}>
                Services Offered
              </Typography>

              <Divider />
              <div>


                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}> */}
                <Grid container spacing={2}>
                  {services.map((service, index) => (
                    <Grid key={index} item xs={6} sm={6}>
                      <Paper elevation={5}
                        className={classes.servicePaper}>

                        {/* <CheckCircle className={classes.verified}/> */}
                        <Typography className={classes.serviceNameFont}>
                          {service.name &&
                            service.name
                              .split(' ')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')
                          }
                        </Typography>



                        <Typography className={classes.customFont}><b>Category:</b> {service.category}</Typography>
                        <Typography className={classes.customFont}>
                          {service.description && service.description.charAt(0).toUpperCase() + service.description.slice(1)}
                        </Typography>

                        <Typography className={classes.customFont}>&#8377; {service.cost}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>



              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {/* </Main> */}
      {/* </Paper> */}
      {/* </AdminHeader> */}
    </Box>
  )
}

export default VendorData   