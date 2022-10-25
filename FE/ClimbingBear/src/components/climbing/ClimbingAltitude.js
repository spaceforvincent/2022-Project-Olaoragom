import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ClimbingAltitude = () => {
  return (
    <View>
      <Text style={styles.temptext}>고도 그래프를 그릴 컴포넌트 입니다!</Text>
    </View>
  );
};

export default ClimbingAltitude;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 20,
  },
});
