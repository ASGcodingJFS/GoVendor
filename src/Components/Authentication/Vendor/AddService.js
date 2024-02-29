import React, { useState, useEffect } from 'react'
import {
  Grid, Paper, Box, Typography, Divider, TextField, OutlinedInput, InputAdornment, Button,
  InputLabel, FormControl, Select, MenuItem, Snackbar, Alert,  FormHelperText, Dialog, 
  Chip,
  DialogTitle,
  DialogContent, Skeleton
} from '@mui/material'
//import { styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addService } from '../Redux/ServiceSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { PostAdd } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import MasterHeader, { DrawerHeader } from '../../MasterHeader';


const useStyles = makeStyles((theme) => ({


  inputFocused : {

    '& label.Mui-focused': {
      color: '#673AB7',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#673AB7',
  },
 
},
focusedOutline: {

  '& label.Mui-focused' : {

    color: '#673AB7', 
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
  borderColor: '#673AB7', 
  },// Change the border color when focused
},

}));

const AddService = () => {

  const dispatch = useDispatch();
  // const vendorKey = useSelector((state)=> state.auth.email);
  // const {email} = useSelector((state) => state.auth);

  // const vendorKeyParams = useParams();
  // const vendorKey = vendorKeyParams ? vendorKeyParams.vendorKey : '';
  const vendorKeyParams = useParams();
  const vendorKey = vendorKeyParams && vendorKeyParams.vendorKey ? vendorKeyParams.vendorKey : '';
  const navigate = useNavigate();
  const classes = useStyles();
 


  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [storedCategories, setStoredCategories] = useState([]);

  const [formErrors, setFormErrors] = useState({

    name: false,
    cost: false,
    description: false,
    category: false

  });

  const [additionalCategories, setAdditionalCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [addCategoryError, setAddCategoryError] = useState(false);

  console.log("Vendor Key from add service", vendorKey);
  console.log(addCategoryError);

  const isVendorLoggedIn = localStorage.getItem("isAuthenticated") === 'true' && 
                           localStorage.getItem("isAdmin") === 'false';

  useEffect(() => {

      const finalCategories = JSON.parse(localStorage.getItem('listedcategory'));

      if(finalCategories)
      {
        setStoredCategories(finalCategories);
      }

  },[])

  useEffect(()=> {

    setTimeout(() => {
    if(!isVendorLoggedIn)
    {
     
      navigate('/login');
    }
  },3000)
  },[isVendorLoggedIn,navigate])

  const handleService = () => {

    let hasErrors = false;


    const newFormErrors = {

      name: !name.trim(),
      cost: !cost.trim(),
      description: !description.trim(),
      category: category.trim() === ""
    }
    if (Object.values(newFormErrors).some(error => error)) {
      hasErrors = true;
      setFormErrors(newFormErrors);
    }

    // setFormErrors(newFormErrors);


    if (!hasErrors) {
      const service = {

        name,
        cost,
        description,
        category,
      };
      dispatch(addService({ vendorKey, service }));

      //  .then(() => {
      //    setSnackbarMessage('Service added successfully');
      //    setSnackbarType('success');
      //    setSuccessOpen(true);
      //  })
      //  .catch((error) => {
      //    setSnackbarMessage('Error adding service');
      //    setSnackbarType('error');
      //    setSuccessOpen(true);
      //  });

      setName('');
      setCost('');
      setDescription('');
      setCategory('');
      setSuccessOpen(true);
    }
  };

  const handleChange = (event) => {

    setCategory(event.target.value);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  const handleAddClick = () => {

    setOpenDialog(true);
  };

  const dialogClose = () => {

    setOpenDialog(false);
    setCategoryInput('');
  
  }

  const handleCategoryInputChange = (event) => {

    setCategoryInput(event.target.value);

  }

  const handleAddCategory = () => {
    
    const listedCategories = JSON.parse(localStorage.getItem('listedcategory'))

    if(listedCategories.includes(categoryInput))
    {
      setAddCategoryError(true);
      alert('Category Already Exists');
      return;
    }
    setAdditionalCategories([...additionalCategories , categoryInput]);
    setCategoryInput('');
   
  }

  const handleSubmit = () => {

    //setOpenDialog(false);
    //setCategoryInput('');
    if(category === "Others" && additionalCategories.length === 0)
    {
      setAddCategoryError(true);
      alert("Add at least 1 category");
      return;
    }

    const existingTempCategory = JSON.parse(localStorage.getItem('tempcategories')) || [];

    const newCategories = additionalCategories.map(category =>({

      name : category,
      approvedStatus : false,
      key : vendorKey

    }));


    const updatedCategories = existingTempCategory.concat(newCategories);

    localStorage.setItem('tempcategories' , JSON.stringify(updatedCategories));

 
       setAdditionalCategories([]);
        alert('Submitted for review. Please wait for Admin Approval.');
  
};

if(!isVendorLoggedIn)
{
  return <><Skeleton variant="rectangular" width={210} height={118} /></>
}

  return (
    <Box sx={{display : 'flex'}}>
      <MasterHeader/>
    <Box sx={{flexGrow : 1, p : 3}}>
      {/* <AdminHeader /> */}
      <DrawerHeader/>
      <Typography variant='h6' fontWeight="bold" style={{ padding: '20px' }}>Add Service</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Paper elevation={3} style={{ padding: '25px', margin: '0px 5px 10px 10px' }}>
              <Typography variant='h5' fontWeight="bold" style={{ paddingBottom: '15px' }}>Service Details</Typography>
              <Divider style={{ marginBottom: '15px' }} />
              <Grid container spacing={2}>
                <Grid item>
                  <Typography fontWeight="bold" style={{ paddingBottom: '15px' }} >Name</Typography>
                  <TextField
                    style={{ marginBottom: '15px' }}
                    value={name}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    error={formErrors.name}
                    helperText={formErrors.name ? "This field is required" : ""
                    
                  }
                    onChange={(e) => setName(e.target.value)}
                    className={classes.inputFocused}/>
                </Grid>
                <Grid item>
                  <Typography fontWeight="bold" style={{ paddingBottom: '15px' }}>Cost</Typography>
                  <OutlinedInput
                              value={cost}
                    id="outlined-adornment-weight"
                    onChange={(e) => setCost(e.target.value)}
                    endAdornment={<InputAdornment position="end">&#8377;/hour</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    error={formErrors.cost || parseFloat(cost) <=0}
                    sx={{
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#673AB7'
                      },
                    }}
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                  {formErrors.cost && (
                    <Typography variant="caption" color="error">
                      This field is required
                    </Typography>
                  )}
                   {parseFloat(cost) <= 0 && (
                    <Typography variant="caption" color="error">
                      Cost must be greater than 0
                    </Typography>
                  )}
                </Grid>
              {/* </Grid> */}
              <Grid item xs={12} md={6}>
              <Typography fontWeight="bold" style={{ paddingBottom: '15px' }}>Description</Typography>

              <TextField
                value={description}
                id="description"
                label="Description"
                multiline
                rows={4} // Specify the number of rows you want to display
                fullWidth
                variant="outlined"
                error={formErrors.description}
                helperText={formErrors.description ? "This field is required" : ""}
                onChange={(e) => setDescription(e.target.value)}
                className={classes.inputFocused}
              />
              </Grid>
              </Grid>
              <Button onClick={handleService} 
                      style={{ marginTop: '15px' , backgroundColor : '#673AB7'}} 
                      variant='contained'
                startIcon={<PostAdd />}>Add</Button>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4}>
            <Paper elevation={3} style={{ padding: '25px' }}>
              <Typography fontWeight="bold" style={{ paddingBottom: '15px' }}>Category Details</Typography>
              <FormControl fullWidth error={formErrors.category}  className={classes.focusedOutline}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                 
                >
                  {storedCategories.map((categoryone)=>(

                    <MenuItem key={categoryone} value={categoryone}>{categoryone}</MenuItem>
                  ))}
                  {/* <MenuItem value="Television">Television</MenuItem>
                  <MenuItem value="Carpenter">Carpenter</MenuItem>
                  <MenuItem value="Pest Control">Pest Control</MenuItem>
                  <MenuItem value="Wall Painting">Wall Painting</MenuItem>
                  <MenuItem value="Full Home Cleaning">Full Home Cleaning</MenuItem>
                  <MenuItem value="Modular Kitchen">Modular Kitchen</MenuItem>
                  <MenuItem value="Mobile Repairing">Mobile Repair</MenuItem>
                  <MenuItem value="Dry Cleaning">Dry Cleaning</MenuItem>
                  <MenuItem value="Web Design">Web Design</MenuItem>
                  <MenuItem value="Laptop/Desktop">Laptop/Desktop Repair</MenuItem>
                  <MenuItem value="CCTV">CCTV Installation</MenuItem> */}
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
                {formErrors.category && (
                  <FormHelperText >
                    Category is required
                  </FormHelperText>
                )}

              </FormControl>
              { category === "Others" && (

                  <>
                  <div>
                   {additionalCategories.map((category, index) => (
                    <Chip key={index} label={category} style={{ margin: '5px' }} />
                  ))}
                  </div>
                  <Button variant="contained" onClick={handleAddClick} 
                        style={{margin : '5px', backgroundColor : '#673AB7'}}>Add
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} 
                            style={{margin : '5px', backgroundColor : '#673AB7'}}>
                      Submit 
                    </Button>
                   
                    </>
              )}

            </Paper>
          </Grid>

        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={successOpen}
        autoHideDuration={6000}
        style={{ marginTop: '25px' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          variant='filled'

        >
          Service added successfully
        </Alert></Snackbar>
        <Dialog
          open={openDialog} onClose={dialogClose}>
          <DialogTitle>Add a Category</DialogTitle>
          <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="Category"
            fullWidth
            value={categoryInput}
            onChange={handleCategoryInputChange}
            className={classes.focusedOutline}>
            </TextField>
           
         
            <Button variant="contained" onClick={handleAddCategory} 
                    style={{margin : "5px 5px 5px", backgroundColor : '#673AB7'}}>Add</Button> 
            <Button variant="contained" onClick={dialogClose}
                    style={{backgroundColor : '#673AB7'}}>Cancel</Button>
            {/* <Button variant="contained" onClick={handleSubmit}>Submit</Button> */}
          </DialogContent>
        </Dialog>
        </Box>
    </Box>
  )
}

export default AddService