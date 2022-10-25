import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
// 자식 컴포넌트에서 navigation 을 사용하기 위한 모듈 import
import {useNavigation} from '@react-navigation/native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
// (임시) 개발을 위해 각 페이지에 라우트하는 버튼 생성
const LoginForm = () => {
  // 위에 import 한 모듈로 navigation 선언
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.temptext}>
        여긴 로그인폼을 만드는 컴포넌트입니다!
      </Text>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
  templogin: {
    margin: 50,
  },
  tempbutton: {
    margin: 20,
  },
});
