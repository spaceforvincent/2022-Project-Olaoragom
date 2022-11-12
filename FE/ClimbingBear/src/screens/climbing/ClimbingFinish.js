import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions, Image, PixelRatio,} from 'react-native';
// 기록 관련 컴포넌트 import
import ClimbingFinishInfo from '../../components/climbing/ClimbingFinishInfo';
// 서체 import
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

import {useSelector, useDispatch} from 'react-redux';

// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// dp 를 픽셀로 바꿨음
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const ClimbingFinish = () => {
  const imgUri = useSelector(state => state.nowclimbing.uri)
  return (
    <View style={styles.container}>
      <View style={styles.semicontainer}>
       <TextExtraBold style={styles.mountainname}>천생산</TextExtraBold>
        <TextMedium style={styles.todaydate}>2022년 10월 20일</TextMedium>
        </View>
        <View style={styles.imgcontainer}>
        <View style={styles.title}>
      <TextBold style={styles.titletextcolor}>등산</TextBold>
        <TextBold style={styles.titletext}>이 끝났어요!</TextBold>
      </View>
      {imgUri && <Image source={{ uri: imgUri }} style={styles.image}/>}
      </View>
      <ClimbingFinishInfo />
    </View>
  );
};

export default ClimbingFinish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  semicontainer:{
    alignItems:'center',
  },
  mountainname: {
    fontSize: widthPixel * 0.07,
    padding: widthPixel * 0.005,
    color: '#000000',
  },
  todaydate: {
    padding: widthPixel * 0.005,
    fontSize: widthPixel * 0.03,
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
  imgcontainer:{
    flexDirection:'column',
  },
  image:{
    width: windowWidth * 0.9,
    height:windowHeight * 0.35,
  }
});
