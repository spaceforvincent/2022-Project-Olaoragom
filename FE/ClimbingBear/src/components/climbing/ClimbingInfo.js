import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

// 서체 import
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../common/TextFont';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const ClimbingInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextBold style={styles.titletextcolor}>등산 </TextBold>
        <TextBold style={styles.titletext}>중 이에요!</TextBold>
      </View>
      <View style={styles.semicontainer}>
        <View>
          <TextMedium style={styles.climbinfo}>등산 거리</TextMedium>
          <TextMedium style={styles.climbinfonum}>km</TextMedium>
        </View>
        <View>
          <TextMedium style={styles.climbinfo}>누적 시간</TextMedium>
          <TextMedium style={styles.climbinfonum}></TextMedium>
        </View>
        <View>
          <TextMedium style={styles.climbinfo}>현재 고도</TextMedium>
          <TextMedium style={styles.climbinfonum}>m</TextMedium>
        </View>
      </View>
      <View style={styles.climbbutton}>
        <TouchableOpacity>
          <TextMedium style={styles.climbbuttontext}>일시 정지</TextMedium>
        </TouchableOpacity>
        <TouchableOpacity>
          <TextMedium style={styles.climbbuttontext}>등산 종료</TextMedium>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClimbingInfo;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: windowHeight * 0.38,
    width: windowWidth,
  },
  title: {
    flexDirection: 'row',
  },
  titletextcolor: {
    fontSize: widthPixel * 0.035,
    color: '#74B49B',
  },
  titletext: {
    fontSize: widthPixel * 0.035,
    color: '#000000',
  },
  semicontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  climbinfo: {
    fontSize: widthPixel * 0.027,
    color: '#000000',
  },
  climbinfonum: {
    // 부모 속성 무시하고 싶을 때 alignSelf
    alignSelf: 'flex-end',
    fontSize: widthPixel * 0.025,
    color: '#000000',
  },
  climbbutton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  climbbuttontext: {
    fontSize: widthPixel * 0.02,
    color: '#000000',
  },
});
