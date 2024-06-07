import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
