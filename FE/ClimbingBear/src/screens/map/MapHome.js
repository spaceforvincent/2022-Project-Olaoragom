import React, {useEffect, useState} from 'react';
import MapView from 'react-native-map-clustering';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getMountainList} from '../../apis/Map';
import SearchBar from '../../components/map/SearchBar';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapHome = () => {

  const navigation = useNavigation()

  const [cluster, setCluster] = useState(true);
  const [markers, setMarker] = useState([]);
  const markerLat = useSelector(state => state.map.markerLat);
  const markerLon = useSelector(state => state.map.markerLon);

  useEffect(() => {
    const initialData = async () => {
      const response = await getMountainList();
      setMarker(response);
    };
    initialData();
  }, []);

  return (
    <>
      {cluster ? (
        <SafeAreaView>
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
              // onClusterPress={(cluster, markers) => {navigation.navigate('MountainDetail', {mountainId: marker.mntnSeq})}}
              provider={PROVIDER_GOOGLE}
              zoomEnabled={true}>
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(marker.mntnLat),
                    longitude: parseFloat(marker.mntnLon),
                  }}>
                  <Image
                    style={styles.marker}
                    source={require(`../../assets/images/marker6.png`)}></Image>
                </Marker>
              ))}
            </MapView>
          </View>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.clusterButton}
              onPress={() => setCluster(true)}>
              <TextMedium style={styles.buttonTitle}>전체 산</TextMedium>
            </TouchableOpacity>
            <SearchBar setCluster={setCluster} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
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
                  }}>
                  <Image
                    style={styles.marker}
                    source={require(`../../assets/images/marker2.png`)}></Image>
                </Marker>
              ))}
            </MapView>
          </View>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.clusterButton}
              onPress={() => setCluster(true)}>
              <TextMedium style={styles.buttonTitle}>전체 산</TextMedium>
            </TouchableOpacity>
            <SearchBar setCluster={setCluster} />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default MapHome;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
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
    flexDirection: 'row',
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
    backgroundColor: '#3E7C17',
    height: windowHeight * 0.06,
    borderRadius: 5,
  },
  buttonTitle: {
    color: 'white',
  },
});
