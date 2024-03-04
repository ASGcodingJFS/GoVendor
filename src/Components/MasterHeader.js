import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import GroupIcon from '@mui/icons-material/Group';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Settings } from '@mui/icons-material';
import { AccountCircle, Person, LogoutRounded } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './Authentication/Redux/AuthSlice';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#673AB7',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MasterHeader() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  //const history = use
  const { email } = useSelector((state) => state.auth)
  const { isAdmin } = useSelector((state) => state.auth)
  //   const vendorKey  = `vendors_${email}`;

  //   const vendorDetails = useSelector(state => state.vendors.find(vendor => vendor.vendorKey === vendorKey));
  //   const vendorStatus = vendorDetails ? vendorDetails.status : 'Unknown';
  // console.log("mheader_vendorStatus", vendorStatus);

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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
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
                style={{ marginTop: '40px', height: 300, width: '50ch' }}
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
                open={Boolean(anchorEl)}
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
                  {/*check*/}
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
                  <Typography style={{ fontSize: 14 }}>Logout
                  </Typography></MenuItem>

              </Menu>

            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}

            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

          </ListItem>

          {isAuthenticated && (

            <>
              {isAdmin ? (
                <>

                  <ListItem disablePadding sx={{ display: 'block' }}>

                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}>
                        <GroupIcon />
                      </ListItemIcon>
                      <ListItemText primary="Vendors" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding sx={{ display: 'block' }}>

                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}>
                        <AutoGraphIcon />
                      </ListItemIcon>
                      <ListItemText primary="Track Activity" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>

                </>
              ) : (
                <>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}

                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}

                      >
                        <AddTaskIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Service" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}>
                        <HomeRepairServiceIcon />
                      </ListItemIcon>
                      <ListItemText primary="Services" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>


                </>

              )}
            </>
          )}
        </List>

        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

      </Drawer>

    </>
  );
}