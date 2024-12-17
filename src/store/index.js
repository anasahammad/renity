import { configureStore } from '@reduxjs/toolkit';

import { userReducer, vendorReducer } from './reducers/userReducer';

const userInfoFromStorage = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : null;


  const vendorInfoFromStorage = localStorage.getItem("vendorAccount")
  ? JSON.parse(localStorage.getItem("vendorAccount"))
  : null;


const initialState = {
  user: { userInfo: userInfoFromStorage },
  vendor: { vendorInfo: vendorInfoFromStorage },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
  },
  preloadedState: initialState,
});

export default store;