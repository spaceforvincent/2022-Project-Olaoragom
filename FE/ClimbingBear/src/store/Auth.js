import {createSlice} from '@reduxjs/toolkit';

// (임시) 더미 store 만들어 둔 상태로 수정 필요

const initialState = {
  data: {},
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
