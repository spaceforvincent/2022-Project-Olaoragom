import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ClimbingInfo = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        이건 Climbing 관련 스크린에 띄울 거리, 고도, 시간 컴포넌트입니다
      </Text>
    </View>
  );
};

export default ClimbingInfo;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 20,
  },
});
