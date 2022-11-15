import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    markerLat: 37.573898277022,
    markerLon: 126.9731314753,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        marker(state, action) {
            state.markerLat = action.payload.markerLat
            state.markerLon = action.payload.markerLon
        }
    }
})

export const mapActions = mapSlice.actions
export default mapSlice.reducer