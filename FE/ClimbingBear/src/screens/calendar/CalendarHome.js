import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const CalendarHome = () => {
  return (
    <View>
      <Calendar />
    </View>
  );
};

export default CalendarHome;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
