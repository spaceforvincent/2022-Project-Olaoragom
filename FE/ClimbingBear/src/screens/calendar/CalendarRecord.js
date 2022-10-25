import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const CalendarRecord = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여긴 기록을 볼 수 있는 기록 스크린입니다!
      </Text>
    </View>
  );
};

export default CalendarRecord;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
