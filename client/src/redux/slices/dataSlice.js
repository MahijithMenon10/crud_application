import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: [],
  extraData: [],
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
import { deleteUser } from '../actions/userActions.js';
import { useDispatch } from 'react-redux';
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
    setError: (state, action) => {
      state.error = action.payload;
    },

    updateStatus: (state, action) => {
      const index = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index].status = action.payload.status;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        const totalData = action.payload.count;
        const displayedCount = 5;
        state.status = 'succeeded';
        state.data = action.payload.data.slice(0, displayedCount);
        state.extraData = action.payload.data.slice(displayedCount, totalData);
        state.countDocuments = action.payload.count;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(updateStatus.pending, (state) => {
        state.updateStatus = 'loading';
      })

      .addCase(updateStatus.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.data = state.data.map((item, i) =>
            i === index ? { ...item, status: action.payload.data.status } : item
          );
        }
      })

      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(updateUsers.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(updateUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex(
          (item) => item._id === action.payload.data._id
        );
        state.data[index] = { ...state.data[index], ...action.payload.data };
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
        state.data.unshift(action.payload);
        if (state.data.length > 5) {
          state.extraData = state.data.slice(5);
          state.data = state.data.slice(0, 5);
          state.countDocuments = state.countDocuments + 1;
        }
      })

      .addCase(addUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      if (state.extraData.length > 0) {
        const newItem = state.extraData.shift();
        if (newItem) state.data.push(newItem);
      }
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
