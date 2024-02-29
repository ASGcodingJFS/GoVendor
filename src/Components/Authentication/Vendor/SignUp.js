import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link as MuiLink, Snackbar, SnackbarContent, 
InputAdornment, IconButton, Paper, Divider} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ErrorOutline, CheckCircleOutline } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updatedVendorStatus } from '../Redux/VendorSlice';
import { useDispatch } from 'react-redux';
import { Storefront } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <MuiLink color="inherit" href="https://mui.com/">
          Your Website
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  //For password validation


  //For email validation

  function validateEmail(email) {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  
  const defaultTheme = createTheme();

  const useStyles = makeStyles((theme)  => ({

    inputFocused : {

      '& label.Mui-focused': {
        color: '#673AB7',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#673AB7',
    },
  },
  }));


  

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successOpen , setSuccessOpen] = useState(false);
  const [SnackbarMessage , setSnackbarMessage] = useState('');
  const [SnackbarType , setSnackbarType] = useState('');
  const [vendorActive , setVendorActive] = useState('inactive');
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const classes = useStyles();
  //Validation
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
});
  
  const [passwordSnackbarOpen, setPasswordSnackbarOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  //   setPasswordSnackbarOpen(true);
  //   console.log("called");
   
  // };
  console.log(setVendorActive);

  const validatePassword = (password) => {
    // Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
  }

  
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based (0-11), so add 1
        const currentDay = currentDate.getDate();

        // Construct the date string in DD-MM-YYYY format
        const formattedDate = `${currentDay.toString().padStart(2, '0')}-${currentMonth.toString().padStart(2, '0')}-${currentYear}`;


        let formIsValid = true;

        const newFormErrors = {

          firstName : !firstName.trim(),
          lastName : !lastName.trim(),
          firstNameLetterCheck : /\d/.test(firstName),
          lastNameLetterCheck : /\d/.test(lastName),
          email : !email.trim(),
          password : !password.trim(),
          confirmPassword : !confirmPassword.trim()

        }

        setFormErrors(newFormErrors);

        // Check if any form field is empty
        if (Object.values(newFormErrors).some(error => error)) {
            formIsValid = false;
        }

        if(formIsValid) {
      
        if(!validateEmail(email))
        {
          setSnackbarMessage('Enter a valid email address');
          setSnackbarType('error');
          setSuccessOpen(true);
          return;
        }

        if(!validatePassword(password))
        {
          setSnackbarMessage('Password should contain atleast 8 letters , 1 Uppercase, 1 lowercase, 1 number and a special character');
          setSnackbarType('error');
          setSuccessOpen(true);
          return;
        }
        
        //Checking whether passwords are matching
        if (password !== confirmPassword) {
          setSnackbarMessage("Passwords didn't match");
          setSnackbarType('error');
          setSuccessOpen(true);
          return;
        }
        
        //Generate a unique key for each vendor
        const vendorKey = `vendors_${email}`;
        console.log("vendorKeyFromSignUp:", vendorKey);

        dispatch(updatedVendorStatus({vendorKey : vendorKey , status : vendorActive, firstName, lastName, email}));
        console.log('dispatch', vendorActive);

        //Check if the vendor with the same email already exists
        
        if (localStorage.getItem(vendorKey)) {
          setSnackbarMessage('Vendor with this email already exists');
          setSnackbarType('error');
          setSuccessOpen(true);
          return;
        }

        const vedorDetails = {

          vendorKey: vendorKey,
          firstName,
          lastName,
          email,
          password,
          status: vendorActive,
          rDate: formattedDate,
        };

        localStorage.setItem(vendorKey, JSON.stringify(vedorDetails));
        
        // Update the 'vendors' key with the latest data. 'vendors' to be later used by Admindashboard.js
        // const allVendors = JSON.parse(localStorage.getItem('vendors')) || {};
        // allVendors[`vendors_${email}`] = { status: 'inactive' };
        // localStorage.setItem('vendors', JSON.stringify(allVendors));

        setSnackbarMessage('Successfully registered as a vendor');
        setSnackbarType('success');
        setSuccessOpen(true);
        setTimeout(() => {
            navigate(`/vendordata/${vendorKey}`)
        }, 1000)
      }

      };


      //Snackbar close
      const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSuccessOpen(false);
        setPasswordSnackbarOpen(false);
      };
    
     

      const renderSnackbarContent = (password) => {

        const criteria =[

          {label : 'At least 8 characters required' , success : validatePassword(password)},
          {label : 'At least 1 uppercase letter', success: /[A-Z]/.test(password)},
          {label : 'At least 1 lowercase letter', success: /[a-z]/.test(password)},
          {label : 'At least 1 number', success:/\d/.test(password)},
          {label : 'At least 1 special character', success: /[^a-zA-Z0-9]/.test(password)}
        ];

        return (

          <div>
            {criteria.map(( item,index ) =>(
                <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom : '4px'}}>

                  { item.success ? <CheckCircleOutline style={{backgroundColor: 'green', marginRight: '4px'}}/> : 
                  <ErrorOutline style={{backgroundColor: 'red', marginRight: '4px'}}></ErrorOutline>}
                  <Typography variant="body2">{item.label}</Typography>
                </div>
             
                )
            )}
            </div>
         
        );
      };
    
      return (
        
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* <AdminHeader/> */}
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={5} style={{padding: '20px', marginTop : '50px'}}>
            <Box
              sx={{
               
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid container alignItems="center" spacing={2} marginBottom={3} ml={20}> {/* Add Grid container */}
                <Grid item> {/* Grid item for Avatar */}
                  <Avatar sx={{ bgcolor: '#673AB7' }}>
                    <Storefront />
                  </Avatar>
                </Grid>
                <Grid item> {/* Grid item for Typography */}
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    GoVendor
                  </Typography>
                </Grid>
              </Grid>
              <Typography component="h1" variant="h6" fontWeight="bold" sx={{color: '#673AB7', mb : 2 }}>
                Sign Up
              </Typography>
              <Typography component="h1" variant='subtitle1' sx={{color : '#979998', mb : 1}}>
                Enter your credentials to continue
              </Typography>
              {/* <Avatar sx={{ bgcolor: '#0955ed' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography variant="subtitle1" fontWeight="5px">
                Sign up with email address
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      error={formErrors.firstName || formErrors.firstNameLetterCheck}
                      helperText={formErrors.firstName ? "First Name is required" 
                            : formErrors.firstNameLetterCheck ? "Invalid input. Name can contain letters only" : ""}
                      className={classes.inputFocused}
                            // onChange={(e) => {
                            //   setFirstName(e.target.value);
                            //   setFormErrors({
                            //       ...formErrors,
                            //       firstName: !e.target.value.trim(),
                            //       firstNameLetterCheck: /\d/.test(e.target.value)
                            //   }); }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      autoFocus
                      error={formErrors.lastName || formErrors.lastNameLetterCheck}
                      helperText={formErrors.lastName ? "Last name is required" 
                          : formErrors.lastNameLetterCheck ? "Invalid input. Name can contain letters only" : ""}
                          className={classes.inputFocused}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={formErrors.email}
                      helperText={formErrors.email ? "Email address is required" : ""}
                      className={classes.inputFocused}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      error={formErrors.password}
                      helperText={formErrors.password ? "Password is required" : ""}
                      className={classes.inputFocused}
                    
                      InputProps={{
                        endAdornment : (
                          <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                           // onMouseDown={handleMouseDownPassword}
                            edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                         </IconButton>
                       </InputAdornment>
                        ),
                      }}
                      //onChange={handleMouseDownPassword}
                    />
                      <Snackbar
                        open={passwordSnackbarOpen}
                        autoHideDuration={null}
                        onClose={handleSnackbarClose}
                       // message={renderSnackbarContent(password)}
                        anchorOrigin={{
                                vertical: 'top',
                                 horizontal: 'right',
                          }}
                        style={{marginTop : '48px'}}
                    >
                      {renderSnackbarContent()}
                </Snackbar>
                    
                  </Grid>

                  <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) =>   setConfirmPassword(e.target.value)}
                    error={formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword ? "This field cannot be empty" : ""}
                    className={classes.inputFocused}
                  />
                </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor : '#673AB7', '&:hover': {
                    backgroundColor: '#673AB7', // Keep the same color on hover
                  }, }}
                >
                  Sign Up
                </Button>
                <Divider/>
                <Grid container justifyContent="center">
                  <Grid item>
                    <MuiLink variant="body2" to = "/login" component={RouterLink}>
                     <Typography m={2}>Already have an account?</Typography>
                    </MuiLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            </Paper>
          
            <Snackbar
              open={successOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              style={{marginTop : '100px', width: '0px'}}
              anchorOrigin={{
                vertical: 'top', 
                horizontal: 'right',
              }}>

                <SnackbarContent 
                style={{ backgroundColor : SnackbarType === 'error' ? '#F44336' : '#4CAF50'}} 
                  message={<div style={{display : 'flex', alignItems : 'center'}}>


                    
                    {SnackbarType === 'error' ? <ErrorOutline style={{marginRight : '8px'}}/> :
                     <CheckCircleOutline style={{marginRight : '8px'}}/>}
                    <span>{SnackbarMessage}</span>

                    </div>
                  }
                  >
                  </SnackbarContent>
              </Snackbar>
            
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
        </Box>
      );
}

export default SignUp