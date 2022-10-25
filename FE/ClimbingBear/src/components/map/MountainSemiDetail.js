import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MountainSemiDetail = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        이건 밑에 띄울 산 세미디테일 컴포넌트입니다
      </Text>
    </View>
  );
};

export default MountainSemiDetail;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 20,
  },
});
