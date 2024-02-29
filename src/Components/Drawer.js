// import React from 'react'

// const Drawer = () => {

//     const [open, setOpen] = React.useState(false);
//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//       };
    
//       const handleDrawerClose = () => {
//         setOpen(false);
//       };
    
//       const handleMenuClose = () => {
    
//         setAnchorEl(false);
//       }


//   return (
//     <Drawer
//     sx={{
//       width: drawerWidth,
//       flexShrink: 0,
//       '& .MuiDrawer-paper': {
//         width: drawerWidth,
//         boxSizing: 'border-box',
//       },
//     }}
//     variant="persistent"
//     anchor="left"
//     open={open}
//   >
//     <DrawerHeader>
//       <IconButton onClick={handleDrawerClose}>
//         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//       </IconButton>
//     </DrawerHeader>
//     <Divider />
//     <List>
//       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//         <ListItem key={text} disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//     <Divider />
//     <List>
//       {['All mail', 'Trash', 'Spam'].map((text, index) => (
//         <ListItem key={text} disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   </Drawer>
//   <Main open={open}>
//     <DrawerHeader />

//   </Main>
// </Box>
//   )
// }

// export default Drawer