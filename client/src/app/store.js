import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from '../features/data/dataSlice';
export const store = configureStore({
  reducer: {
    data: dataSliceReducer,
  },
});
export default store;
