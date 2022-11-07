import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
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

import SearchBar from '../../components/map/SearchBar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const MapHome = () => {
  // GPS => 기본설정 구미 사업장
  const [ latitude, setLatitude ] = useState(36.109328);
  const [ longitude, setLongitude ] = useState(128.415011);

  // 마커
  const [ markers, setMarkers ] = useState('');

  useEffect(() => {
    // 안드로이드 위치 설정 권한
    const gpsPermissionAndroid = async () => {
      if (Platform.OS === 'android') {
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (res === 'granted') {
          Geolocation.getCurrentPosition(pos => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
          });
        }
      }
    };
    gpsPermissionAndroid();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            // 보여주는 범위
            latitudeDelta: 0.005,
            longitudeDelta: 0.0001,
          }}

          style={styles.map}
          // showsUserLocation={true}
          // showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}

          ></MapView>
        <Marker></Marker>
      </View>
      {/* 검색어를 치고 검색버튼을 누르는 순간 검색 결과의 위치로 변경해줘야 한다
        따라서 props 기능으로 위/경도 재설정 state 를 보내는 것 */}
      <SearchBar setLatitude={setLatitude} setLongitude={setLongitude} />
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
  showsUserLocation: {

  }
});
