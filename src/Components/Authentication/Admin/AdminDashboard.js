import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVendors, fetchVendors, updatedVendorStatus } from '../Redux/VendorSlice';
import {
  Accordion, Button, Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Skeleton, Chip, Popover
} from '@mui/material';

import { AdminPanelSettings, Group, Mail, PendingActions, ToggleOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MasterHeader, { DrawerHeader } from '../../MasterHeader';


const AdminDashboard = () => {

  const dispatch = useDispatch();
  const vendors = useSelector(selectVendors);
  const dataFetch = useRef(false);
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(null);

  const isAdminLoggedIn = localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('isAdmin') === 'true';

  const handlePopoverOpen = (event) => {

    setOpenPopover(event.target);
  }

  const handlePopoverClose = () => {

    setOpenPopover(null);

  }

  const openstate = Boolean(openPopover);

  useEffect(() => {

    console.log("hello outside if");

    if (!dataFetch.current) {
      dispatch(fetchVendors());
      dataFetch.current = true;
      console.log("hello renderd");
    }

  }, [dispatch]);

  useEffect(() => {

    if (!isAdminLoggedIn) {
      navigate('/login');

    }

  }, [isAdminLoggedIn, navigate]);


  const handleToggleStatus = (vendorKey) => {
    // Find the vendor index in the Redux store
    const vendorIndex = vendors.findIndex(vendor => vendor.vendorKey === vendorKey);

    if (vendorIndex !== -1) {
      // Toggle the status
      const updatedStatus = vendors[vendorIndex].status === 'inactive' ? 'active' : 'inactive';

      // Update the Redux store
      const updatedVendors = [...vendors];
      updatedVendors[vendorIndex] = { ...vendors[vendorIndex], status: updatedStatus };
      dispatch(updatedVendorStatus(updatedVendors[vendorIndex]));

      // Update localStorage with the updated status
      localStorage.setItem(vendorKey, JSON.stringify(updatedVendors[vendorIndex]));
    }


  };
  //const vendorStatusC = handleToggleStatus(vendors.vendorKey);

  const handleClickVendor = (vendorKey) => {

    navigate(`/viewservicesadmin/${vendorKey}`)
  };


  if (!isAdminLoggedIn) {
    return <><Skeleton variant="rectangular" width={210} height={118} /></>
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <MasterHeader />
      <Box component="main" sx={{ flexGrow: 1, }}>
        <DrawerHeader />


        <Accordion style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant='h5'>Admin Dashboard</Typography>
            <AdminPanelSettings fontSize='medium' />
          </div>

        </Accordion>
        {/* </div> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Box display="flex" alignItems="center" >
                    <b>Vendor Name</b>
                    <Group />
                  </Box></TableCell>

                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <b>Email</b>
                    <Mail />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <b>Status</b>
                    <ToggleOn fontSize='large' />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <b>Action</b>
                    <PendingActions />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <b>Services</b>
                  </Box>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell scope="row">{vendor.firstName} {vendor.lastName}</TableCell>
                  <TableCell scope="row">{vendor.email}</TableCell>
                  <TableCell scope="row" align='center'>
                    <Box display="flex" alignItems="center">
                      <Chip label={vendor.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                        style={{
                          backgroundColor: vendor.status === 'active' ? 'green' : 'red',
                          color: 'white',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',

                        }}
                      ></Chip>



                    </Box></TableCell>
                  <TableCell scope="row"> {/* Button to toggle status */}
                    <Button onClick={() => handleToggleStatus(vendor.vendorKey)}
                      variant='contained'
                      style={{
                        backgroundColor: vendor.status === 'active' ? 'red' : 'green',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.8)',
                      }} >
                      {vendor.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>

                  <TableCell scope="row">
                    <Button variant="contained"
                      aria-owns={openstate ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      onClick={() => handleClickVendor(vendor.vendorKey)}

                      style={{
                        backgroundColor: '#673AB7',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.8)'
                      }}>
                      View Services
                    </Button>
                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: 'none',
                      }}
                      open={openstate}
                      anchorEl={openPopover}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>Click here to view category requests</Typography>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
};

export default AdminDashboard;
