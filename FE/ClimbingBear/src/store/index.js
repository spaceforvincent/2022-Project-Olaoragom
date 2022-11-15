import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from './Auth';
import {nowclimbingSlice} from './Climbing';
import { mapSlice } from './Map';

/* 
스토어의 main
타 스토어의 정보를 가져온다

(공부) redux-toolkit 으로 store 관리법
*/
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    nowclimbing: nowclimbingSlice.reducer,
    map: mapSlice.reducer
  },
});

export default store;
