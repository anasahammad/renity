import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };
const vendorInitialState = { vendorInfo: null };



// Create a Redux slice for managing user-related state
const userSlice = createSlice({
  name: "user",                   // Specify the slice name
  initialState: userInitialState, // Set the initial state
  reducers: {                     
                                  // Action to set user information in the state
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state, action) {    // Action to reset user information in the state
      state.userInfo = null;
    },
  },
});





// Create a Redux slice for managing vendor-related state
const vendorSlice = createSlice({
  name: "vendor",                 // Specify the slice name
  initialState: vendorInitialState, // Set the initial state
  reducers: {                     
                                  // Action to set vendor information in the state
    setVendorInfo(state, action) {
      state.vendorInfo = action.payload;
    },
    resetVendorInfo(state, action) { // Action to reset vendor information in the state
      state.vendorInfo = null;
    },
  },
});



// Extract the actions and reducer from the user slice
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

// Extract the actions and reducer from the vendor slice
const vendorActions = vendorSlice.actions;
const vendorReducer = vendorSlice.reducer;

export { userActions, userReducer , vendorActions , vendorReducer};