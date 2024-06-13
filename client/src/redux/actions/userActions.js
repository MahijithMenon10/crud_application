import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const BASE_URL = `http://localhost:5000/api`;
const BASE_URL = `https://crud-application-backend-6e5y.onrender.com/api`;
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/fetchuser/${id}`);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const response = await axios.delete(`${BASE_URL}/deleteuser/${id}`, id);
  return response.data;
});
