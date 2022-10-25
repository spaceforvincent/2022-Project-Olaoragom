import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MountainDetailButton = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여기는 등산하기, 일정예약, 대피소 버튼 컴포넌트 입니다!
      </Text>
    </View>
  );
};

export default MountainDetailButton;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
