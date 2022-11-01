import React, {useEffect, useState} from 'react';
import {Image, Text, Button, View, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarRecord = ({navigation: {navigate}, route}) => {
  const [imageState, setImageState] = useState('map');
  const [isHeightClicked, setIsHeightClicked] = useState(false);
  const [isOrbitClicked, setIsOrbitClicked] = useState(false);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const distanceRecord = '3.275';
  const timeRecord = '03:27:45';
  const heightRecord = '500';
  const mapImage = require('../../assets/images/DummyMap.jpg');
  const heightImage = require('../../assets/images/DummyHeight.png');
  const orbitImage = require('../../assets/images/DummyOrbit.png');
  const mapState = () => {
    setImageState('map');
  };
  const orbitState = () => {
    setImageState('orbit');
  };
  const heightState = () => {
    setImageState('height');
  };

  return (
    <View>
      <Text style={styles.date}>{route.params.date}</Text>
      <Text style={styles.Mountain}>{route.params.name}</Text>
      <Text style={styles.recordtext}>내 등산 기록</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.category}>등산 거리</Text>
          <Text style={styles.category}>{distanceRecord}km</Text>
        </View>
        <View>
          <Text style={styles.category}>등산 시간</Text>
          <Text style={styles.category}>{timeRecord}</Text>
        </View>
        <View>
          <Text style={styles.category}>최고 고도</Text>
          <Text style={styles.category}>{heightRecord}m</Text>
        </View>
      </View>
      <View style={styles.map}>
        {imageState === 'map' ? (
          <Image style={styles.image} source={mapImage} />
        ) : imageState === 'orbit' ? (
          <Image style={styles.image} source={orbitImage} />
        ) : (
          <Image style={styles.image} source={heightImage} />
        )}
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            onPress={() => {
              mapState();
              setIsMapClicked(true);
              setIsOrbitClicked(false);
              setIsHeightClicked(false);
            }}>
            {isMapClicked ? (
              <View style={styles.clickedbutton}>
                <Text style={styles.buttontext}>지도사진</Text>
              </View>
            ) : (
              <View style={styles.button}>
                <Text style={styles.buttontext}>지도사진</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              orbitState();
              setIsOrbitClicked(true);
              setIsHeightClicked(false);
              setIsMapClicked(false);
            }}>
            {isOrbitClicked ? (
              <View style={styles.clickedbutton}>
                <Text style={styles.buttontext}>위성사진</Text>
              </View>
            ) : (
              <View style={styles.button}>
                <Text style={styles.buttontext}>위성사진</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              heightState();
              setIsHeightClicked(true);
              setIsOrbitClicked(false);
              setIsMapClicked(false);
            }}>
            {isHeightClicked ? (
              <View style={styles.clickedbutton}>
                <Text style={styles.buttontext}>고도사진</Text>
              </View>
            ) : (
              <View style={styles.button}>
                <Text style={styles.buttontext}>고도사진</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CalendarRecord;

const styles = StyleSheet.create({
  date: {
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    marginTop: windowHeight * 0.05,
  },
  Mountain: {
    fontSize: 50,
    textAlign: 'center',
  },
  recordtext: {
    fontSize: 20,
    marginTop: windowHeight * 0.05,
    marginLeft: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: windowHeight * 0.03,
  },
  category: {
    fontSize: 30,
    textAlign: 'center',
  },
  map: {
    marginTop: 30,
    position: 'relative',
  },
  image: {width: windowWidth, height: windowHeight * 0.5},
  buttoncontainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    width: windowWidth * 0.2,
    marginTop: windowHeight * 0.35,
    marginLeft: windowWidth * 0.78,
  },
  button: {
    backgroundColor: '#91C788',
    height: windowHeight * 0.035,
    borderRadius: 15,
    marginBottom: windowHeight * 0.01,
  },
  clickedbutton: {
    backgroundColor: 'gray',
    height: windowHeight * 0.035,
    borderRadius: 15,
    marginBottom: windowHeight * 0.01,
  },
  buttontext: {
    color: 'white',
    textAlign: 'center',
    marginTop: windowHeight * 0.007,
  },
});
