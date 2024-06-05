import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: [],
};

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
  },

  updatestatus: (state, action) => {
    const index = state.data.findIndex((item) => item.id === action.payload.id);
    state.data[index].status = action.payload.status;
  },
});

export const { setData, addData, updateData, deleteData, updatestatus } =
  dataSlice.actions;

export default dataSlice.reducer;
