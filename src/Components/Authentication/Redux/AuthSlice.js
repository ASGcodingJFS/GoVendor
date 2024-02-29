import { createSlice } from "@reduxjs/toolkit";




export const AuthSlice = createSlice({

    name : 'auth',
    initialState : {

       // email : '',
       // isAuthenticated : false,
       
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        email: localStorage.getItem('email') || '',
        //isAdmin: false,
        isAdmin: localStorage.getItem('isAdmin') === 'true',
        firstName: localStorage.getItem('firstName') || '',

    },

    reducers : {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.firstName = action.payload.firstName;
          
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('firstName', action.payload.firstName);
            localStorage.setItem('isAdmin', action.payload.isAdmin);
        },

        logout : (state) => {

            state.isAuthenticated = false;
            state.email = '';
            state.isAdmin = false;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('email');
            localStorage.removeItem('isAdmin');
        },

    },
});


export const {login , logout} = AuthSlice.actions;
export const selectAuth = (state) => state.auth;
export default AuthSlice.reducer;