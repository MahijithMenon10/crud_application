import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id) => {
    const response = await axios.get(
      `https://crud-application-backend-6e5y.onrender.com/api/fetchuser/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  }
);
