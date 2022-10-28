import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions} from 'react-native';

// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// (수정) 일단 altitude 변화에 따라 그래프 그릴 수 있는지 구현 후 실시간 데이터 구현
const ClimbingAltitude = ({altitude}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.temptext}>고도 그래프를 그릴 컴포넌트 입니다!</Text>
    </View>
  );
};

export default ClimbingAltitude;

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.65,
    width: windowWidth,
  },
  temptext: {
    fontSize: 20,
  },
});
