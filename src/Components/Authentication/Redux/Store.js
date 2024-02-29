import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import vendorReducer from "./VendorSlice";
import serviceReducer from "./ServiceSlice";

export const Store = configureStore({

    reducer : {

        auth : authReducer,
        vendors : vendorReducer,
        service : serviceReducer,
    },
});