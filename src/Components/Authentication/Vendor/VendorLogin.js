import React, { useState }  from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link as MuiLink} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Snackbar, SnackbarContent} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/AuthSlice';

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

    email : 'adminasg@gmail.com',
    password : 'adminpass123'
  }

const Login = () => {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //       email: data.get('email'),
    //       password: data.get('password'),
    //     });
    //   };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [successOpen , setSuccessOpen] = useState(false);
    const [errorOpen , setErrorOpen] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();

        //Create a FormData object from the current target, which is the form element 
        const data = new FormData(event.currentTarget); 
        const storedEmail = data.get('email');
        const storedPassword = data.get('password');
        if(storedEmail === adminCredentials.email && storedPassword === adminCredentials.password)
       {  
         
          dispatch(login ({email : storedEmail}));
          setSuccessOpen(true);
          setTimeout (() => {
              navigate('/admindashboard');
       }, 1000 )
      }
      else {
        // Check if the entered credentials match any vendor credentials in localStorage
        const vendorsData = Object.values(localStorage);
        const matchedVendor = vendorsData.find((vendorData) => {
          const vendor = JSON.parse(vendorData);
          return vendor.email === storedEmail && vendor.password === storedPassword;
        });
        if (matchedVendor) {
          // Dispatch the login action for the vendor
          dispatch(login({ email: storedEmail }));
          // Navigate to the VendorData component
          setTimeout(() => {
            navigate(`/vendordata/${storedEmail}`)
        }, 1000)
        }
      else   
      {
        setErrorOpen(true);
        console.log('Invalid credentails');
        alert('Login failed! Either username or password is wrong');
      }
    }
}

const handleSnackbarClose = (event, reason) => {

  if(reason === 'clickaway'){
    return;
}

  setSuccessOpen(false);
  setErrorOpen(false);

};

    
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
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
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                 // onClick={handleLogin}
                >
                  Login
                </Button>
             
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>

          <Snackbar
              open = {successOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              >
                  <SnackbarContent message = "Login Sucessful" style={{backgroundColor:  '#4CAF50'}}></SnackbarContent>
              </Snackbar>

              <Snackbar
              open = {errorOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              >
                  <SnackbarContent message = "Login failed! Either email or password is wrong" 
                  style={{backgroundColor:  '#F44336'}}></SnackbarContent>
              </Snackbar>
              
        </ThemeProvider>
      );
}

export default Login;