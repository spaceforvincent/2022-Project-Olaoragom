import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  markerLat: 36.34,
  markerLon: 127.77,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    marker(state, action) {
      state.markerLat = action.payload.markerLat;
      state.markerLon = action.payload.markerLon;
    },
  },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
