import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ClimbingFinishInfo = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        이건 Climbing 끝나고 스크린에 띄울 거리, 고도, 시간, 속도 그리고
        폴리라인 이미지 컴포넌트입니다
      </Text>
    </View>
  );
};

export default ClimbingFinishInfo;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 20,
  },
});
