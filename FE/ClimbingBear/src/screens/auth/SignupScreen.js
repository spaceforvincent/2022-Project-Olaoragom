import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
// 회원가입폼 컴포넌트 import
import SignupForm from '../../components/auth/SignupForm';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const SignupScreen = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여긴 회원가입이 들어간 회원가입 스크린입니다!
      </Text>
      <SignupForm />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
