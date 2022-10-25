import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Button} from 'react-native';
// 자식 컴포넌트에서 navigation 을 사용하기 위한 모듈 import
import {useNavigation} from '@react-navigation/native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다

const MenuNav = () => {
  // 위에 import 한 모듈로 navigation 선언
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.temptext}>햄버거 버튼 메뉴입니다!</Text>
    </View>
  );
};

export default MenuNav;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
