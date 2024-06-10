import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const updateStatus = createAsyncThunk(
  'data/updateStatus',
  async (data) => {
    const response = await axios.put(
      `https://crud-application-backend-6e5y.onrender.com/api/statusupdate/${data.id}`,
      data
    );
    return response.data;
  }
);

export const addUsers = createAsyncThunk('data/addData', async (data) => {
  const response = await axios.post(
    'https://crud-application-backend-6e5y.onrender.com/api/createuser',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

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
  const response = await axios.put(
    `https://crud-application-backend-6e5y.onrender.com/api/updateuser/${data.id}`,
    data
  );
  return response.data;
});
