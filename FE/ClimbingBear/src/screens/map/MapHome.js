import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, SafeAreaView, ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';

import SearchBar from '../../components/map/SearchBar';
import { TextBold } from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapHome = () => {
  // GPS => 
  const [ latitude, setLatitude ] = useState(36.109328);
  const [ longitude, setLongitude ] = useState(128.415011);

  // Marker

  const [ markerLat, setMarkerLat ] = useState('');
  const [ markerLon, setMarkerLon ] = useState('');

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

  useEffect(() => {
    console.log('좀찍혀라', markerLat, markerLon)
  })

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
          showsUserLocation={true}
          showsMyLocationButton={false}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}>

          <Marker
            coordinate={{latitude: latitude, longitude: longitude}}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
      </View>
      
      <SearchBar setMarkerLat={setMarkerLat} setMarkerLon={setMarkerLon}/>
      <TextBold>{markerLat}얍얍{markerLon}</TextBold>
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

  showsUserLocation: {},
});
