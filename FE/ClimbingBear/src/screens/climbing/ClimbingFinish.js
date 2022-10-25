import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
// 기록 관련 컴포넌트 import
import ClimbingFinishInfo from '../../components/climbing/ClimbingFinishInfo';
import ClimbingNormalMap from '../../components/climbing/ClimbingMap';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ClimbingFinish = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여기는 등산 끝나고 기록 띄우는 스크린입니다!
      </Text>
      <ClimbingNormalMap />
      <ClimbingFinishInfo />
    </View>
  );
};

export default ClimbingFinish;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
