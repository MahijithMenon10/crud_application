import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, deleteUser } from '../actions/userActions';

const initialState = {
  user: null,
  isUserLoadingById: false,
  isUserDeleting: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.isUserLoadingById = true;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isUserLoadingById = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isUserLoadingById = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.isUserDeleting = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.isUserDeleting = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isUserDeleting = false;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
