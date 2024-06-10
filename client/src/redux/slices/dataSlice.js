import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  countDocuments: 0,
};
import {
  fetchUsers,
  updateStatus,
  updateUsers,
  addUsers,
} from '../actions/dataActions.js';
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
        state.countDocuments = action.payload.count;
        state.totalPages = action.payload.totalPages;
        console.log(action.payload);
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(updateStatus.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.data = state.data.map((item, i) =>
            i === index ? { ...item, status: action.payload.status } : item
          );
        }
      })

      .addCase(updateStatus.rejected, (state, action) => {
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

    builder
      .addCase(addUsers.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(addUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })

      .addCase(addUsers.rejected, (state, action) => {
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
  updatestatus,
  setPage,
} = dataSlice.actions;

export default dataSlice.reducer;
