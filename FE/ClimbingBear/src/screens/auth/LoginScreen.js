import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
// 로그인폼 컴포넌트 import
import LoginForm from '../../components/auth/LoginForm';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const LoginScreen = () => {
  return (
    <View>
      <Text style={styles.temptext}>등산곰</Text>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
