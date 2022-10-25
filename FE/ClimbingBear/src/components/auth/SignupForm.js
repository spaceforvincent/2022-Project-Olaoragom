import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const SignupForm = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        여긴 회원가입 폼을 만드는 컴포넌트입니다!
      </Text>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
