import { createSlice } from "@reduxjs/toolkit";

export const VendorSlice = createSlice({

    name : 'vendors',
    initialState : [] ,
    reducers : {

      updatedVendorStatus: (state, action) => {
        const { vendorKey, status, firstName, lastName, email, rDate } = action.payload;
        console.log("payload", action.payload);
       
        const vendorIndex = state.findIndex(vendor => vendor.vendorKey === vendorKey);

    console.log("vendorIndex", vendorIndex);
        if (vendorIndex !== -1) {
            // Vendor exists, update its properties immutably
            state = state.map((vendor, index) => {
                if (index === vendorIndex) {
                    return { ...vendor, vendorKey, status, firstName, lastName, email, rDate };
                }
                return vendor;
            });
        } else {
            // Vendor doesn't exist, add a new vendor to the state immutably
            state = [...state, { vendorKey, status, firstName, lastName , email, rDate}];
        }
    
        // No need to update localStorage here, as this is responsibility of the component
        return state;
    },
    

        // updatedVendorStatus : (state, action) => {
        //         // const {vendorKey , status , firstName} = action.payload;
        //         // state[vendorKey] = {...state[vendorKey], status, firstName}
        //         // console.log(`action.payload is: ${ action.payload }`);
               
        //         const { vendorKey, status, firstName , lastName } = action.payload;
        //         const vendorIndex = state.findIndex(vendor => vendor.vendorKey === vendorKey);
        //         if (vendorIndex !== -1) {
        //           state[vendorIndex] = { ...state[vendorIndex], status, firstName , lastName};
        //         } else {
        //           state.push({ vendorKey, status, firstName , lastName});
        //         }
        //         // Update localStorage with the new state
        //          // updateLocalStorage(state);
        //       },

              // toggleVendorStatus: (state, action) => {
              //   const { vendorKey } = action.payload;
              //  // const vendorToUpdate = state.find(vendor => vendor.vendorKey === vendorKey);
              
              
              //   console.log("checkKeyVendor", vendorKey);
              //   console.log("arrayKey", Object.keys(localStorage));
              //   const vendorToUpdate = state.find(vendor => vendor.vendorKey === vendorKey);
              // //  const plainVendorToUpdate = JSON.parse(JSON.stringify(vendorToUpdate));

              // //  console.log("plain", plainVendorToUpdate);

              //   //console.log("vendortoupdate", vendorToUpdate);
              //   if (vendorToUpdate) {
              //     vendorToUpdate.status = vendorToUpdate.status === 'inactive' ? 'active' : 'inactive';
              //     // Update localStorage
              //     //const key = vendorToUpdate.vendorKey;
              //     const key = `vendors_${vendorToUpdate.vendorKey}`;
              //     console.log("key",key);
              //     localStorage.setItem(key, JSON.stringify(vendorToUpdate));
              //   }
              // },

              // toggleVendorStatus: (state, action) => {
              //   const { vendor } = action.payload; // Destructure the vendor object from payload
              //   const vendors = getVendorsFromLocalStorage();
              //   console.log("vendorlist", vendors);
              //   console.log("statusofvendor", vendor.status)
              //   const vendorIndex = state.findIndex(v => v.vendorKey === vendor.vendorKey);
              //   if (vendorIndex !== -1 && 'status' in vendor) { // Check if the vendor object contains the status property
              //     state[vendorIndex].status = vendor.status === 'inactive' ? 'active' : 'inactive';
              //     // Update localStorage 
              //     localStorage.setItem(`vendors_${vendor.vendorKey}`, JSON.stringify(vendor));
              //   }
              // },
              
              

              

              fetchVendors: (state) => {
                // Retrieve vendors from local storage
                const vendors = getVendorsFromLocalStorage();
                // Update Redux state with fetched vendors
               // state.push(...vendors);
              // return [...state, ...vendors];
              return vendors; 

              

            },
          
 }
            
          

});

export const {updatedVendorStatus, toggleVendorStatus, fetchVendors} = VendorSlice.actions;
export const selectVendors = (state) => state.vendors;
export default VendorSlice.reducer;

             
            
        




function getVendorsFromLocalStorage() {
    const vendors = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('vendors_')) {
        const vendorData = JSON.parse(localStorage.getItem(key));
        vendors.push(vendorData);
      }

    }
    return vendors;
  }

 // Function to update vendors in localStorage
    // const updateLocalStorage = (vendors) => {
    // vendors.forEach(vendor => {
    //   const key = `vendors_${vendor.vendorKey}`;
    //  localStorage.setItem(key, JSON.stringify(vendor));
    
    // });

    // }
