import React, {useEffect, useState} from 'react';
// 지도 모듈 import
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// GPS 모듈 import
import Geolocation from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
// 관련 기능 컴포넌트 import
import SearchBar from '../../components/map/SearchBar';
import PlaceButton from '../../components/map/PlaceButton';
import NowPlaceButton from '../../components/map/NowPlaceButton';
import MountainSemiDetail from '../../components/map/MountainSemiDetail';

/* 
(공부) Dimensions 은 모바일의 창 크기를 받아오는 모듈
각기 다른 모바일 창크기를 받아오기 때문에 이를 이용해 비율로 style 지정하면 될 듯

전역으로 관리해도 괜찮을지 논의
*/
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MapHome = () => {
  // 받아온 위치 넣는 state
  // 값이 없으면 위도, 경도가 undefined 라는 에러가 떠서 구미사업장 기준 넣어놨다
  const [latitude, setLatitude] = useState(36.109328);
  const [longitude, setLongitude] = useState(128.415011);
  /*
     useEffect 를 통해 첫 렌더링 때 즉시 실행
    (공부) async, await
    */
  useEffect(() => {
    const gpsPermissionAndroid = async () => {
      // 안드로이드 위치 설정 권한 가져오는 것
      if (Platform.OS === 'android') {
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (res === 'granted') {
          Geolocation.getCurrentPosition(pos => {
            // 고도는 pos.coords.altitude
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
          });
        }
      }
    };
    gpsPermissionAndroid();
  }, []);

  return (
    // (공부) 각 태그 알아두기
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            // 아래 두 개는 보여주는 범위 나타내는 것
            latitudeDelta: 0.005,
            longitudeDelta: 0.0001,
          }}
          style={styles.map}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}></MapView>
      </View>
      {/* 검색어를 치고 검색버튼을 누르는 순간 검색 결과의 위치로 변경해줘야 한다
        따라서 props 기능으로 위/경도 재설정 state 를 보내는 것 */}
      <SearchBar setLatitude={setLatitude} setLongitude={setLongitude} />
      <PlaceButton />
      <MountainSemiDetail />
      <NowPlaceButton />
    </SafeAreaView>
  );
};

export default MapHome;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
  // (임시) MapView 띄우는 확인 위한 공식 문서 style 에 dimensions 추가해서 화면 꽉 채우도록 설정
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
