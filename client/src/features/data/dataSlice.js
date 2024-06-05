import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get(
    'https://crud-application-backend-6e5y.onrender.com/data'
  );
  return response.data;
});

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },

    addData: (state, action) => {
      state.data.push(action.payload);
    },

    updateData: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[index] = action.payload;
    },

    deleteData: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

    updatestatus: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[index].status = action.payload.status;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })

      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setData, addData, updateData, deleteData, updatestatus } =
  dataSlice.actions;

export default dataSlice.reducer;
