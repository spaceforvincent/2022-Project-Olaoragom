import React, {useEffect, useState} from 'react';
import {Image, Text, Button, View, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarRecord = ({navigation: {navigate}, route}) => {
  //이미지 url(지도, 위성, 고도)
  const mapImage = require('../../assets/images/DummyMap.jpg');
  const heightImage = require('../../assets/images/DummyHeight.png');
  const orbitImage = require('../../assets/images/DummyOrbit.png');
  //화면에 띄울 이미지 상태값(지도, 위성, 고도)
  const [imageState, setImageState] = useState('map');
  //버튼 클릭 상태 확인(지도, 위성, 고도)
  const [isHeightClicked, setIsHeightClicked] = useState(false);
  const [isOrbitClicked, setIsOrbitClicked] = useState(false);
  const [isMapClicked, setIsMapClicked] = useState(true);
  //이동 거리 측정 기록
  const distanceRecord = '3.275';
  //시간 측정 기록
  const timeRecord = '03:27:45';
  //고도 측정 기록
  const heightRecord = '500';
  //이미지 상태값 변경(지도)
  const mapState = () => {
    setImageState('map');
  };
  //이미지 상태값 변경(위성)
  const orbitState = () => {
    setImageState('orbit');
  };
  //이미지 상태값 변경(고도)
  const heightState = () => {
    setImageState('height');
  };

  return (
    <View>
      <TextBold style={styles.date}>{route.params.date}</TextBold>
      <TextExtraBold style={styles.Mountain}>{route.params.name}</TextExtraBold>
      <View style={styles.container}>
        <View>
          <TextExtraBold style={styles.category}>등산 거리</TextExtraBold>
          <TextExtraBold style={styles.category}>
            {distanceRecord}km
          </TextExtraBold>
        </View>
        <View>
          <TextExtraBold style={styles.category}>등산 시간</TextExtraBold>
          <TextExtraBold style={styles.category}>{timeRecord}</TextExtraBold>
        </View>
        <View>
          <TextExtraBold style={styles.category}>최고 고도</TextExtraBold>
          <TextExtraBold style={styles.category}>{heightRecord}m</TextExtraBold>
        </View>
      </View>
      <View style={styles.map}>
        {/* 이미지 상태값에 따라 띄워줄 사진 변경 */}
        {imageState === 'map' ? (
          <Image style={styles.image} source={mapImage} />
        ) : imageState === 'orbit' ? (
          <Image style={styles.image} source={orbitImage} />
        ) : (
          <Image style={styles.image} source={heightImage} />
        )}
        <View style={styles.buttoncontainer}>
          {/* 이미지 상태값 변경 버튼(지도) */}
          <TouchableOpacity
            onPress={() => {
              mapState();
              setIsMapClicked(true);
              setIsOrbitClicked(false);
              setIsHeightClicked(false);
            }}>
            {/* 버튼 눌려진 상태 표시 */}
            {isMapClicked ? (
              <View style={styles.clickedbutton}>
                <TextMedium style={styles.buttontext}>지도사진</TextMedium>
              </View>
            ) : (
              <View style={styles.button}>
                <TextMedium style={styles.buttontext}>지도사진</TextMedium>
              </View>
            )}
          </TouchableOpacity>
          {/* 이미지 상태값 변경 버튼(위성) */}
          <TouchableOpacity
            onPress={() => {
              orbitState();
              setIsOrbitClicked(true);
              setIsHeightClicked(false);
              setIsMapClicked(false);
            }}>
            {/* 버튼 눌려진 상태 표시 */}
            {isOrbitClicked ? (
              <View style={styles.clickedbutton}>
                <TextMedium style={styles.buttontext}>위성사진</TextMedium>
              </View>
            ) : (
              <View style={styles.button}>
                <TextMedium style={styles.buttontext}>위성사진</TextMedium>
              </View>
            )}
          </TouchableOpacity>
          {/* 이미지 상태값 변경 버튼(고도) */}
          <TouchableOpacity
            onPress={() => {
              heightState();
              setIsHeightClicked(true);
              setIsOrbitClicked(false);
              setIsMapClicked(false);
            }}>
            {/* 버튼 눌려진 상태 표시 */}
            {isHeightClicked ? (
              <View style={styles.clickedbutton}>
                <TextMedium style={styles.buttontext}>고도사진</TextMedium>
              </View>
            ) : (
              <View style={styles.button}>
                <TextMedium style={styles.buttontext}>고도사진</TextMedium>
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
    marginTop: windowHeight * 0.07,
  },
  Mountain: {
    fontSize: 50,
    textAlign: 'center',
  },
  recordtext: {
    fontSize: 20,
    marginTop: windowHeight * 0.05,
    marginLeft: windowWidth * 0.05,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: windowHeight * 0.05,
  },
  category: {
    fontSize: 30,
    textAlign: 'center',
  },
  map: {
    marginTop: windowHeight * 0.05,
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
    marginTop: windowHeight * 0.01,
  },
});
