import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MailIcon from '@mui/icons-material/Mail';
import { AccountCircle,LogoutRounded, Person, Settings, Visibility } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './Authentication/Redux/AuthSlice';


const drawerWidth = 240;

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
      backgroundColor : '#673AB7',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

 export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminHeader( ) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const[isMenuOpen, setIsMenuOpen] = React.useState(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  //const history = use
  const { email } = useSelector((state) => state.auth)
  const { isAdmin }  = useSelector((state) => state.auth)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  const handleLogout = () => {
    dispatch(logout());
    //history.push('/login'); // Redirect to login page after logout
    navigate('/login');
  };

  const user = useSelector((state) => state.auth);

  console.log("isAdmin", isAdmin);
  console.log("email", email);
  console.log("user", user);




  const handleMenu = (event) => {



  setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle anchorEl
};


const handleMenuClose = () => {

    setAnchorEl(false);
  };



  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          > 
            <MenuIcon />
          
           </IconButton> 
          {/* <Storefront/> */}

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            GoVendor Application
          </Typography>
          {isAuthenticated && (
            <>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2, marginLeft: 2 }}>
                  {/* {`Welcome, ${isAdmin ? 'Admin' : 'Vendor'} `}
                  {`Welcome, ${isAdmin ? 'Admin' : (user && user.firstName ? user.firstName : 'Vendor')}`} */}
                  {
                    isAdmin ? "Welcome, Admin" : "Welcome, Vendor"
                  }

                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                style={{ marginTop: '40px', height : 300, width : '50ch' }}
                variant='menu'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
                getContentAnchorEl={null}
                open ={Boolean(anchorEl)}
                //open={isMenuOpen}
                onClose={handleMenuClose}
              >

                <MenuItem>

                  <ListItemIcon>
                    <Person fontSize='small'>

                    </Person>
                  </ListItemIcon>
                  <Typography style={{ fontSize: 14 }}>
                    Profile
                  </Typography>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize='small'></Settings>
                  </ListItemIcon>
                  <Typography style={{ fontSize: 14 }}>
                    Settings
                  </Typography>

                </MenuItem>
                {/* Display User Email Section */}
                <MenuItem>
                  <ListItemIcon>
                    <MailIcon fontSize='small' />
                  </ListItemIcon>
                  <Typography style={{ fontSize: 14 }}>
                    {email}
                  </Typography>
                </MenuItem>

                <Divider />
                {/* Logout Option */}
                <MenuItem onClick={handleLogout}>

                  <ListItemIcon>
                    <LogoutRounded fontSize='small'></LogoutRounded>
                  </ListItemIcon>
                  <Typography style={{fontSize : 14}}>Logout
                  </Typography></MenuItem>

              </Menu>

            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {


            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <Visibility/> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
      
        <Divider />
      
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home"/>
            </ListItemButton>
          
          </ListItem>
          {isAuthenticated && (

            <>
            { isAdmin ? (
                <>

                    <ListItem disablePadding>

                      <ListItemButton>
                        <ListItemIcon>
                          <GroupIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Vendors"/>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>

                      <ListItemButton>
                        <ListItemIcon>
                          <AutoGraphIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Track Activity"/>
                      </ListItemButton>
                    </ListItem>

                </>
              ) : (
                <>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AddTaskIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Add Service"/>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeRepairServiceIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Services"/>
                    </ListItemButton>
                  </ListItem>
                  

                </>

              )}
        </>
          )}
        </List>
       
      
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
     
      </Main> 
    </>
  );
}
