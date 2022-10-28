import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native';
// 서체 import
import {TextLight} from '../../components/common/TextFont';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ClimbingButton = ({setMapType, setPlaceType}) => {
  // (공부) useRef 와 useState 차이

  // false가 기본값 (standard), true 일 때 (satellite)
  const changeMapTypeStatus = useRef(false);
  // false가 주요 거점 띄우지 않는 것, true 가 띄우는 것
  const placeTypeStatus = useRef(false);

  // 위성지도 - 일반지도 mapType 바꿔주는 함수
  function changeMapType(payload) {
    // 현재 기본지도일 때 == 위성지도로 바꾸고 싶을 때
    if (!changeMapTypeStatus.current) {
      changeMapTypeStatus.current = true;
      setMapType(payload);
    }
    // 현재 위성지도일 때 == 기본지도로 바꾸고 싶을 때
    else {
      changeMapTypeStatus.current = false;
      setMapType(payload);
    }
  }
  // 주요거점 띄워주고 끄는 함수
  function changePlaceButton() {
    // 현재 주요거점 안보일 때 == 주요거점 보고 싶을 때
    if (!placeTypeStatus.current) {
      placeTypeStatus.current = true;
      setPlaceType(true);
    }
    // 현재 주요거점 보일 때 == 주요거점 안보고 싶을 때
    else {
      placeTypeStatus.current = false;
      setPlaceType(false);
    }
  }

  return (
    // (수정) 조금 하드코딩인거 같아서 추후 수정 필요할듯
    // 위성지도, 일반지도 바뀌는 부분만 const 해서 수정하면 될듯?
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonbackground}>
        <TextLight style={styles.unclickbuttontext} onPress={() => {}}>
          일행위치
        </TextLight>
      </TouchableOpacity>
      {!changeMapTypeStatus.current && (
        <TouchableOpacity style={styles.buttonbackground}>
          <TextLight
            style={styles.unclickbuttontext}
            onPress={() => changeMapType('satellite')}>
            위성지도
          </TextLight>
        </TouchableOpacity>
      )}
      {changeMapTypeStatus.current && (
        <TouchableOpacity style={styles.buttonbackground}>
          <TextLight
            style={styles.clickbuttontext}
            onPress={() => changeMapType('standard')}>
            일반지도
          </TextLight>
        </TouchableOpacity>
      )}

      {!placeTypeStatus.current && (
        <TouchableOpacity style={styles.buttonbackground}>
          <TextLight
            style={styles.unclickbuttontext}
            onPress={() => changePlaceButton()}>
            주요거점
          </TextLight>
        </TouchableOpacity>
      )}
      {placeTypeStatus.current && (
        <TouchableOpacity style={styles.buttonbackground}>
          <TextLight
            style={styles.clickbuttontext}
            onPress={() => changePlaceButton()}>
            주요거점
          </TextLight>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ClimbingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: heightPixel * 0.185,
    right: widthPixel * 0.0005,
  },
  buttonbackground: {
    alignItems: 'flex-end',
    paddingBottom: widthPixel * 0.007,
    paddingRight: widthPixel * 0.01,
  },
  unclickbuttontext: {
    paddingHorizontal: widthPixel * 0.015,
    paddingVertical: widthPixel * 0.006,
    backgroundColor: '#91C788',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  clickbuttontext: {
    paddingHorizontal: widthPixel * 0.015,
    paddingVertical: widthPixel * 0.006,
    backgroundColor: '#3D5B4F',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
});
