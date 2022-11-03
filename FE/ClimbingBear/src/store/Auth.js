import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveData(state, action) {
      state.data = action.payload.data;
    },
  },
});

export const authActions = authSlice.actions;
