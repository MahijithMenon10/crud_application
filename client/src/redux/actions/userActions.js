// Purpose: Contains the async functions for fetching and deleting a user.
// The fetchUserById action fetches a user by their ID from the server.
// The deleteUser action deletes a user by their ID from the server.
// The BASE_URL constant is the base URL of the server API.
// The fetchUserById action uses axios to make a GET request to the server API to fetch a user by their ID.
// The deleteUser action uses axios to make a DELETE request to the server API to delete a user by their ID.
// The createAsyncThunk function from the Redux Toolkit is used to create async actions.
// The actions are exported to be used in the Redux reducers and components.
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://crud-application-9hzn.onrender.com/api';
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
