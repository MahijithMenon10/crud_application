import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  countDocuments: 0,
};

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
    console.log(response.data);
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

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },

    fetchDataById: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[index] = action.payload;
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

    setPage: (state, action) => {
      state.page = action.payload;
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.countDocuments = action.payload.countDocuments;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(updateUsers.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(updateUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        state.data[index] = action.payload;
      })

      .addCase(updateUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setData,
  addData,
  updateData,
  deleteData,
  incrementPage,
  setPage,
} = dataSlice.actions;

export default dataSlice.reducer;
