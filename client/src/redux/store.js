import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './slices/dataSlice';
export const store = configureStore({
  reducer: {
    data: dataSliceReducer,
  },
});
export default store;
