import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  id: '',
  nickname: '',
  accessToken: '',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate(state, action) {
      state.accessToken = action.payload.accessToken
      state.nickname = action.payload.nickname
      state.isAuthenticated = true
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer