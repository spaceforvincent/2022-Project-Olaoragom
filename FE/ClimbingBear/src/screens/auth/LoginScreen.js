import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import AuthInput from '../../components/auth/AuthInput';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require(`../../assets/images/LoginLogo.png`)} style={styles.image}/>
      <Text style={styles.title}>올라오라곰</Text>
      <AuthInput title={'email'} placeholder={'아이디'}/>
      <AuthInput title={'password'} placeholder={'비밀번호'} secureTextEntry={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 40,
    margin: 5,
  }
})

export default LoginScreen;