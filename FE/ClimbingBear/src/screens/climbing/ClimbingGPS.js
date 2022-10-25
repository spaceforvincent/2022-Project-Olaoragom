import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
// GPS 모듈 import
import Geolocation from 'react-native-geolocation-service';
// 타이머 import
import BeforeClimbTimer from '../../components/climbing/BeforeClimbTimer';
// 측정 관련 컴포넌트 import
import ClimbingInfo from '../../components/climbing/ClimbingInfo';
import ClimbingMap from '../../components/climbing/ClimbingMap';
import ClimbingButton from '../../components/climbing/ClimbingButton';
import PlaceTypeButton from '../../components/climbing/PlaceTypeButton';
/* 
useSelector 을 import 함으로서 우리가 만든 reducer state 에 접근 가능
useDispatch 를 import 함으로서 우리가 만든 reducer action 사용 가능
*/
import {useSelector, useDispatch} from 'react-redux';
// dispatch 를 쓰기 위해 선언한 actions 을 스토어에서 import
import {nowclimbingActions} from '../../store/Climbing';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
/* 
여기는 무조건 앱 시작을 거쳐서 들어오게 되므로 권한 설정이 'granted' 돼있을 것이지만
예외처리로 안돼있을 때 다시 묻도록 해주기 + 거절하면 에러창 띄우기
*/
// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// 이 페이지와 상관없이 지도 검색 gps 는 쓸 수 있어야 하므로 상태 관리 따로 할 예정
const ClimbingGPS = () => {
  // action 을 들고 올 dispatch 선언
  const dispatch = useDispatch();
  // useSelector 로 state 값을 들고오기
  const latitude = useSelector(state => state.nowclimbing.latitude);
  const longitude = useSelector(state => state.nowclimbing.longitude);
  const climbStatus = useSelector(state => state.nowclimbing.climbStatus);

  // 세부장소 띄우는 state 상태, false일 때 안 띄우기
  const [placeType, setPlaceType] = useState(false);
  // mapType 지정할 state
  const [mapType, setMapType] = useState('standard');

  // (문제) (수정) 실시간으로 store에 내 위치(gps)를 업데이트 할 수 있도록 설정, 1초마다 위치 재지정
  // useEffect(() => {
  //   Geolocation.watchPosition(
  //     nowPosition => {
  //       const nowLatitude = nowPosition.coords.latitude;
  //       const nowLongitude = nowPosition.coords.longitude;
  //       dispatch(
  //         climbingActions.location({
  //           latitude: nowLatitude,
  //           longitude: nowLongitude,
  //         }),
  //       );
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {interval: 1000},
  //   );
  // }, [])

  // 처음 한 번만 위치 갖고 오는 코드
  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      // 고도는 pos.coords.altitude
      /*
       여기서 등산 기능 전역 위도, 경도 재지정
       store 내부 actions 중에서 선택 (현재는 location 함수) 후 재지정
       */
      dispatch(
        nowclimbingActions.nowMyLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      );
    });
  }, []);

  return (
    // climbStatus 가 true 일 때 기록 시작하고 종료할 때 status false 로 되돌리기
    // (수정) styles 를 props 를 받아서 추가할 수 있는 듯 한데.. 추후 수정
    <View style={styles.container}>
      {!climbStatus && <BeforeClimbTimer />}
      {climbStatus && (
        <View>
          <ClimbingMap
            latitude={latitude}
            longitude={longitude}
            mapType={mapType}
          />
          {placeType && <PlaceTypeButton />}
          <ClimbingButton setMapType={setMapType} setPlaceType={setPlaceType} />
          <ClimbingInfo />
        </View>
      )}
    </View>
  );
};

export default ClimbingGPS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  temptext: {
    fontSize: 50,
  },
});
