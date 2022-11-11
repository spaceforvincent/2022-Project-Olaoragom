import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions, Image} from 'react-native';
// 기록 관련 컴포넌트 import
import ClimbingFinishInfo from '../../components/climbing/ClimbingFinishInfo';

import {useSelector, useDispatch} from 'react-redux';

// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ClimbingFinish = () => {
  const imgUri = useSelector(state => state.nowclimbing.uri)
  return (
    <View style={styles.container}>
      <ClimbingFinishInfo />
      {imgUri && <Image source={{ uri: imgUri }} style={{height:400, width:400}}/>}
    </View>
  );
};

export default ClimbingFinish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
