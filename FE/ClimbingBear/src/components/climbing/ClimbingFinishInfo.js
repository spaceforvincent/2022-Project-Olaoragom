import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions,
  PixelRatio, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const ClimbingFinishInfo = () => {
  const distance = useSelector(state => state.nowclimbing.distance);
  const hour = useSelector(state => state.nowclimbing.hour);
  const min = useSelector(state => state.nowclimbing.min);
  const sec = useSelector(state => state.nowclimbing.sec);

  return (
    <View style={styles.container}>
    <View style={styles.semicontainer}>
      <View >
      <TextMedium style={styles.infotext}>
      등산 거리
      </TextMedium>
      <TextMedium style={styles.infotext}>
      {distance} km
      </TextMedium>
      </View>
      <View>
      <TextMedium style={styles.infotext}>
      등산 시간
      </TextMedium>
      <TextMedium style={styles.infotext}>
      {hour} : {min} : {sec}
      </TextMedium>
      </View>
          </View>
      <TouchableOpacity>
            <TextMedium style={styles.infosave}>기록하기</TextMedium>
          </TouchableOpacity>
    </View>
  );
};

export default ClimbingFinishInfo;

const styles = StyleSheet.create({
  infotext: {
    fontSize: widthPixel * 0.024,
    color: '#000000',
    paddingVertical: widthPixel * 0.005,
  },
  container:{
    // backgroundColor:'black'
  },
  semicontainer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  infosave:{
    backgroundColor: '#74B49B',
    borderRadius: 15,
    paddingVertical: widthPixel * 0.01,
    paddingHorizontal: widthPixel * 0.025,
    fontSize: widthPixel * 0.02,
    color: '#FFFFFF',
  }
});
