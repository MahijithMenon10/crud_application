import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = `https://crud-application-backend-6e5y.onrender.com/api`;
export const updateStatus = createAsyncThunk(
  'data/updateStatus',
  async (data) => {
    const response = await axios.put(
      `${BASE_URL}/statusupdate/${data.id}`,
      data
    );
    return response.data;
  }
);

export const addUsers = createAsyncThunk('data/addData', async (data) => {
  const response = await axios.post(`${BASE_URL}/createuser`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});

export const fetchUsers = createAsyncThunk(
  'data/fetchUsers',
  async ({ page, date, status, email, name }) => {
    const response = await axios.get(
      `https://crud-application-backend-6e5y.onrender.com/api/fetchUsers`,
      {
        params: {
          page,
          date,
          status,
          email,
          name,
        },
      }
    );
    return response.data;
  }
);

export const updateUsers = createAsyncThunk('data/updateData', async (data) => {
  const response = await axios.put(`${BASE_URL}/updateuser/${data.id}`, data);
  return response.data;
});
