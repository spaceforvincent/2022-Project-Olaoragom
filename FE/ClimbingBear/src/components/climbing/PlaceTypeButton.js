import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PixelRatio,
} from 'react-native';
// 서체 import
import {TextLight} from '../../components/common/TextFont';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const PlaceTypeButton = () => {
  // 기본 opacity
  const buttonOpacity = useRef(new Animated.Value(0.5)).current;

  // 클릭시 opacity 변화와 이미지 변화 (opacity 기준 0.7)

  // View 는 Animated 가 적용되지 않으므로 TouchableOpacity 객체 하나 만들어 줘야 한다
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonbackground}>
        <TextLight style={styles.helgibutton} onPress={() => {}}>
          헬기장
        </TextLight>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonbackground}>
        <TextLight style={styles.aidkitbutton} onPress={() => {}}>
          구급함
        </TextLight>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonbackground}>
        <TextLight style={styles.toiletbutton} onPress={() => {}}>
          화장실
        </TextLight>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonbackground}>
        <TextLight style={styles.dangerbutton} onPress={() => {}}>
          위험
        </TextLight>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonbackground}>
        <TextLight style={styles.summitbutton} onPress={() => {}}>
          정상
        </TextLight>
      </TouchableOpacity>
    </View>
  );
};
export default PlaceTypeButton;

const styles = StyleSheet.create({
  // absolute 일 땐 정렬이 안먹힘
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: heightPixel * 0.008,
    right: widthPixel * 0.05,
  },
  // 가로로 정렬
  buttonbackground: {
    justifyContent: 'space-around',
    // alignItems: 'flex-end',
    paddingBottom: widthPixel * 0.007,
    paddingRight: widthPixel * 0.005,
  },
  // (수정) 이렇게 하나하나 다 스타일 적용해야하는지 의문
  helgibutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#4D823A',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  aidkitbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#A32543',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  toiletbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#5C8BC1',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  dangerbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#D61515',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  summitbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#BBB51E',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
});
