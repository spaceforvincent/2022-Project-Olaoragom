import {createSlice} from '@reduxjs/toolkit';

// (임시) 대충 store 만들어 둔 상태로 수정 필요
// 여기서 등산 측정에 필요한 상태를 관리해줄 것

// 위도, 경도 초기값 지정(관악산)
// 등산 하는지 안하는지 초기값(false)
const initialState = {
  climbStatus: false,
  latitude: 37.4565095,
  longitude: 126.9500385,
  altitude: 49,
  distance: 0,
  uri: '',
};

export const nowclimbingSlice = createSlice({
  name: 'nowclimbing',
  initialState,
  reducers: {
    nowMyLocation(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.altitude = action.payload.altitude;
    },
    myClimbStatus(state, action) {
      state.climbStatus = action.payload;
    },
    nowDistance(state, action) {
      state.distance = action.payload.distance;
    },
    mapSnapshot(state, action) {
      state.uri = action.payload.uri;
    },
  },
});

// 위에 지정한 함수들을 action 이 작동하도록 다른 컴포넌트에서 쓰는 것
export const nowclimbingActions = nowclimbingSlice.actions;
