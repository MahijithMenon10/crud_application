// Code: This file contains the action creators for the application. It uses the createAsyncThunk function from the Redux Toolkit to create async actions.
// The fetchUserById action fetches a user by their ID from the server.
// The deleteUser action deletes a user by their ID from the server.
// The BASE_URL constant is the base URL of the server API.

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://crud-application-9hzn.onrender.com/api';
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

export const updateUsers = createAsyncThunk(
  'data/updateData',
  async ({ id, changes }) => {
    const response = await axios.put(`${BASE_URL}/updateuser/${id}`, changes);
    return response.data;
  }
);
