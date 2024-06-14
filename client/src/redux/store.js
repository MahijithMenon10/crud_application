// store.js is the entry point of the Redux store. It is responsible for creating the Redux store and combining the reducers.
import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './slices/dataSlice';
import userSliceReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    data: dataSliceReducer,
    user: userSliceReducer,
  },
});
export default store;
