import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MountainDetailInfo = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여기는 날씨 / 난이도 등 산 정보 컴포넌트 입니다!
      </Text>
    </View>
  );
};

export default MountainDetailInfo;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
