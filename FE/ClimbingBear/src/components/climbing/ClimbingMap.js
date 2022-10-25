import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
// 지도 모듈 import
import MapView, {Marker, PROVIDER_GOOGLE, Geojson} from 'react-native-maps';
// useSelector 을 import 함으로서 우리가 만든 reducer state 에 접근 가능
import {useSelector} from 'react-redux';
// 지도 위에 띄울 버튼 import
import ClimbingButton from './ClimbingButton';

// (임시) 포인트 찍기 확인용 선언
import {palgongSpotData} from '../../assets/temp/PalgongData';
// import {palgongPathData} from '../../assets/temp/PalgongData';

// (임시) 맵타입 바꾸기
// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);
// 이 페이지와 상관없이 지도 검색 gps 는 쓸 수 있어야 하므로 상태 관리 따로 할 예정

// Polyline, MapType 메인에서 받아와야할듯..
const ClimbingMap = ({latitude, longitude, mapType}) => {
  // useSelector 로 state 값을 들고오기
  // const latitude = useSelector(state => state.nowclimblocation.latitude);
  // const longitude = useSelector(state => state.nowclimblocation.longitude);
  // 실시간으로 데이터 store 에서 받아오도록 해야 한다
  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.001,
        }}
        mapType={mapType}
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}>
        {/* (임시) 포인트, path 확인용 */}
        {/* Each child in a list should have a unique "key" prop 경고 해결 */}
        {/* {palgongSpotData.map(loc => (
          <Marker coordinate={{latitude: loc.lat, longitude: loc.lng}}>
            <Image
              source={require('../../assets/images/HelgiIcon.png')}
              style={styles.tempmarker}
            />
          </Marker>
        ))} */}
        {/* <Geojson
          geojson={palgongPathData}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        /> */}
      </MapView>
    </View>
  );
};

export default ClimbingMap;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
  // (임시) MapView 띄우는 확인 위한 공식 문서 style 에 dimensions 추가해서 화면 꽉 채우도록 설정
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: windowHeight * 0.6,
    width: windowWidth,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // (임시) 마커 사이즈 조정
  // 렉이 걸려서 이미지 크기를 낮춰야 할 듯
  tempmarker: {
    height: 15,
    width: 30,
  },
});
