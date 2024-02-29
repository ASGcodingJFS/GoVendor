import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Dialog, DialogContent, DialogActions, Grid, Paper, Box, Avatar } from '@mui/material'
import { Storefront } from '@mui/icons-material';



const Home = () => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  //For Login Button
  const handleClicked = () => {
    navigate('/login');
  }


  //For Sign up button
  const handleRegister = () => {
    navigate('/register');
  }

  //For Dialog Box
  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }



  return (


    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Grid container direction="column" alignItems="center">

        <Paper elevation={3} style={{
          padding: '20px', marginTop: '50px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
          border: '1px solid #673AB7',
        }}
        >
          <Grid container direction="column" alignItems="center" spacing={2} marginBottom={3}> {/* Add Grid container */}
            <Grid item> {/* Grid item for Avatar */}
              <Avatar sx={{ bgcolor: '#673AB7' }}>
                <Storefront />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant='body1' sx={{ color: '#673AB7', fontWeight: 'bold' }}>
                Hi! Welcome
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>Who are you?</Typography>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Button variant="contained"
                fullWidth
                onClick={handleClicked}
                style={{ backgroundColor: '#673AB7' }}>Admin
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained"
                fullWidth
                onClick={handleDialogOpen}
                style={{ backgroundColor: '#673AB7' }}
              >Vendor
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
        >
          <Grid container direction="column" alignItems="center" spacing={1}>
            {/* <Grid item>
                <Typography>Hi! Vendor</Typography>
              </Grid> */}
            <Grid item>
              <DialogContent
                style={{ fontWeight: 'bold', fontSize: '18px' }}>

                What do you want to do?</DialogContent>
            </Grid>
            <Grid item>
              <DialogActions>
                <Button variant="filled"
                  onClick={handleClicked}
                  style={{ backgroundColor: '#673AB7', color: 'white' }} >Login</Button>
                <Button variant="filled"
                  onClick={handleRegister}
                  style={{ backgroundColor: '#673AB7', color: 'white' }}>
                  Create an account</Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>

      </Grid>
    </Box>



  )
}

export default Home;