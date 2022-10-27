import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MountainDetail = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여기는 산 상세정보 띄우는 스크린 입니다!
      </Text>
      <MountainDetailButton />
      <MountainDetailInfo />
    </View>
  );
};

export default MountainDetail;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});