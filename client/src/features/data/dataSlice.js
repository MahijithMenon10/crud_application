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

export const fetchUsers = createAsyncThunk('data/fetchUsers', async (page) => {
  const response = await axios.get(
    `https://crud-application-backend-6e5y.onrender.com/api/fetchUsers?page=${page}`
  );
  console.log(response.data);
  return response.data.data;
});

export const fetchUserById = createAsyncThunk(
  'data/fetchUserById',
  async (id) => {
    const response = await axios.get(
      `https://crud-application-backend-6e5y.onrender.com/api/fetchuser/${id}`
    );
    console.log(response.data);
    return response.data.data;
  }
);

export const addUsers = createAsyncThunk('data/addData', async (data) => {
  const response = await axios.post(
    'https://crud-application-backend-6e5y.onrender.com/data/createuser',
    data
  );
  return response.data;
});

export const updateUsers = createAsyncThunk('data/updateData', async (data) => {
  const response = await axios.put(
    `https://crud-application-backend-6e5y.onrender.com/data/updateuser/${data.id}`,
    data
  );
  return response.data;
});

export const deleteUsers = createAsyncThunk('data/deleteData', async (id) => {
  await axios.delete(
    `https://crud-application-backend-6e5y.onrender.com/data/deleteuser/${id}`
  );
  return id;
});

export const updateStatus = createAsyncThunk(
  'data/updateStatus',
  async (data) => {
    const response = await axios.put(
      `https://crud-application-backend-6e5y.onrender.com/data/statusupdate/${data.id}`,
      data
    );
    return response.data;
  }
);

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
        state.data = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
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
      .addCase(deleteUsers.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((item) => item.id !== action.payload);
      })

      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(updateStatus.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        state.data[index].status = action.payload.status;
      })

      .addCase(updateStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
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
  incrementPage,
  setPage,
} = dataSlice.actions;

export default dataSlice.reducer;
