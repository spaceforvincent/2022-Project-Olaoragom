import React, {useEffect, useState} from 'react';
import MapView from 'react-native-map-clustering';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Button } from '@rneui/themed';
import Geolocation from 'react-native-geolocation-service';
import {TouchableOpacity, PermissionsAndroid, SafeAreaView, ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import SearchBar from '../../components/map/SearchBar';
import { ClusterMap } from 'react-native-cluster-map';
import { Image } from 'react-native';
import { getMountainList } from '../../apis/Map';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapHome = () => {
  const [cluster, setCluster] = useState(true);
  const [markers, setMarker] = useState([]);
  const markerLat = useSelector(state => state.map.markerLat);
  const markerLon = useSelector(state => state.map.markerLon);

  useEffect(() => {
    const initialData = async() => {
      const response = await getMountainList()
      setMarker(response)
      console.log(cluster)
    }
    initialData();
  }, [])

  return (
    <>
    {
      cluster ? (<SafeAreaView>
        <View style={styles.container}>
          <MapView
            region={{
              latitude: 36.34,
              longitude: 127.77,
              latitudeDelta: 4.6,
              longitudeDelta: 4.6,
            }}
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={false}
            provider={PROVIDER_GOOGLE}
            zoomEnabled={true}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(marker.mntnLat),
                  longitude: parseFloat(marker.mntnLon),
                }}></Marker>
            ))}
          </MapView>
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.clusterButton}
            onPress={() => setCluster(true)}>
            <TextMedium style={styles.buttonTitle}>전체 산</TextMedium>
          </TouchableOpacity>
          <SearchBar setCluster={setCluster}/>
        </View>
      </SafeAreaView>) : 
      
      (<SafeAreaView>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: markerLat,
            longitude: markerLon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0001,
          }}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={false}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(marker.mntnLat),
                longitude: parseFloat(marker.mntnLon),
              }}></Marker>
          ))}
        </MapView>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.clusterButton}
          onPress={() => setCluster(true)}>
          <TextMedium style={styles.buttonTitle}>전체 산</TextMedium>
        </TouchableOpacity>
        <SearchBar setCluster={setCluster}/>
      </View>
    </SafeAreaView>)
    }
    </>
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
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
  },
  searchContainer: {
    flexDirection: 'row'
  },

  marker: {
    height: 35,
    width: 35,
  },

  clusterButton: {
    margin: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.18,
    backgroundColor: '#91C483',
    height: windowHeight * 0.06,
    borderRadius: 5,
  },

  buttonTitle: {
    color: 'white'
  }
});
