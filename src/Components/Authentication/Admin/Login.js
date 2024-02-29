import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as MuiLink, Paper, InputAdornment, IconButton, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Snackbar, SnackbarContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/AuthSlice';
import { Storefront, Visibility, VisibilityOff } from '@mui/icons-material';
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


const defaultTheme = createTheme();


const adminCredentials = {

  email: 'adminasg@gmail.com',
  password: 'adminpass123'
}

const useStyles = makeStyles((theme) =>({

  inputFocused : {

    '& label.Mui-focused': {
      color: '#673AB7',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#673AB7',
  },
},
}))

const Login = () => {

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [formErrors, setFormErrors] = useState({

    email: false,
    password: false,

  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);



  const handleLogin = (event) => {
    event.preventDefault();

    // Create a FormData object from the current target, which is the form element 
    const data = new FormData(event.currentTarget);
    const storedEmail = data.get('email');
    const storedPassword = data.get('password');

    let formIsValid = true;

    const newFormErrors = {
      email: !storedEmail.trim(),
      password: !storedPassword.trim(),
    }

    setFormErrors(newFormErrors);

    // Check if any form field is empty
    if (Object.values(newFormErrors).some(error => error)) {
      formIsValid = false;
    }

    if (formIsValid) {
      if (storedEmail === adminCredentials.email && storedPassword === adminCredentials.password) {
        dispatch(login({ email: storedEmail, isAdmin: true }));
        setSuccessOpen(true);
        setTimeout(() => {
          navigate('/admindashboard');
        }, 1000);
      } else {
        // Check if the entered credentials match any vendor credentials in localStorage
        const matchedVendor = localStorage.getItem(`vendors_${storedEmail}`);

        if (!matchedVendor) {
          setErrorOpen(true);
          console.log('Invalid credentials');
        } else {
          const vendor = JSON.parse(matchedVendor);
          if (vendor.password === storedPassword) {
            // Dispatch the login action for the vendor
            dispatch(login({ email: storedEmail, isAdmin: false }));
            // Navigate to the VendorData component
            setTimeout(() => {
              navigate(`/vendordata/vendors_${storedEmail}`);
            }, 1000);
          } else {
            setErrorOpen(true);
            console.log('Invalid credentials');
          }
        }
      }
    }
  }


  const handleSnackbarClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);

  };


  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       {/* <AdminHeader /> */}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper elevation={5} style={{ padding: '20px', marginTop : '50px' }} >
            <Box
              sx={{
                //marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
            >

              {/* <Avatar sx={{ bgcolor: '#673AB7'}}>
                <Storefront/>
              </Avatar> */}
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
              <Typography component="h1" variant="h6" fontWeight="bold" sx={{color: '#673AB7' }}>
                Hi, Welcome Back
              </Typography>
              <Typography component="h1" variant='subtitle1' sx={{color : '#979998'}}>
                Enter your credentials to continue
              </Typography>
              <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
                <Grid container spacing={2}>


                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      error={formErrors.email}
                      helperText={formErrors.email ? "Email is required" : ""}
                      autoComplete="email"
                      // InputProps={{
                      //   classes : {
                      //     focused : classes.inputFocused
                      //   }
                      // }}
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
                      error={formErrors.password}
                      helperText={formErrors.password ? "Password is required" : ""}
                      autoComplete="new-password"
                      className={classes.inputFocused}

                      InputProps={{
                        endAdornment: (
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
                    />
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"

                  sx={{ mt: 3, mb: 2, backgroundColor: '#673AB7', 
                  '&:hover': {
                    backgroundColor: '#673AB7', // Keep the same color on hover
                  }, }}
                // onClick={handleLogin}
                >
                  Login
                </Button>
                <Divider/>
                <Grid container justifyContent='center'>
                  <Grid item>
                    <MuiLink component={Link} to="/register">
                <Typography m={2}>Don't have an account?</Typography>
                </MuiLink>
                </Grid>
                </Grid>
              </Box>
              
            </Box>
          </Paper>
          <Copyright sx={{ mt: 5 }} />
        </Container>

        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent message="Login Sucessful" style={{ backgroundColor: '#4CAF50' }}></SnackbarContent>
        </Snackbar>

        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent message="Login failed! Either email or password is wrong"
            style={{ backgroundColor: '#F44336' }}></SnackbarContent>
        </Snackbar>

      </ThemeProvider>
    </Box>
  );
}

export default Login;