import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
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
