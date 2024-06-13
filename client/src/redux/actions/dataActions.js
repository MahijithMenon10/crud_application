import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// const BASE_URL = `https://crud-application-9hzn.onrender.com/api`;
const BASE_URL = `http://localhost:5000/api`;

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
  async ({ date, status, email, name, page }) => {
    const response = await axios.get(`${BASE_URL}/fetchUsers`, {
      params: {
        page,
        date,
        status,
        email,
        name,
      },
    });
    return response.data;
  }
);

export const updateUsers = createAsyncThunk('data/updateData', async (data) => {
  const response = await axios.put(`${BASE_URL}/updateuser/${data.id}`, data);
  return response.data;
});
