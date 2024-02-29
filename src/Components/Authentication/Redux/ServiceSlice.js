import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    
    data : [],

    isApproved : false, 
    category : ''
  },
  reducers: {
   
    addService: (state, action) => {
      const { vendorKey, service } = action.payload;
     
        // Retrieve existing services from local storage
    const existingServices = JSON.parse(localStorage.getItem('services')) || [];
    
    // Add the new service to the existing services array
    const updatedServices = [...existingServices, { vendorKey, ...service }];
    
    // Update state with the updated services array
    state = updatedServices;

    // Save the updated services array to local storage
    localStorage.setItem('services', JSON.stringify(updatedServices));
    }, 

    fetchServicesForVendor: (state, action) => {
      const { vendorKey } = action.payload;
      try {
        // Retrieve services from localStorage for the given vendorKey
        const storedServices = JSON.parse(localStorage.getItem('services')) || {};
        const vendorServices = storedServices[vendorKey] || [];
        // Update the state with the fetched services
        return vendorServices;
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    },

  }
});

export const { addService , fetchServicesForVendor} = serviceSlice.actions;
export const selectServices = (state) => state.services;
export default serviceSlice.reducer;



