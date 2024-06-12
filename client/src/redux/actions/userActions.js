import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = `http://localhost:5000/api`;
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/fetchuser/${id}`);
    console.log(response.data.data);
    return response.data.data;
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const response = await axios.delete(`${BASE_URL}/deleteuser/${id}`, id);
  return response.data;
});
