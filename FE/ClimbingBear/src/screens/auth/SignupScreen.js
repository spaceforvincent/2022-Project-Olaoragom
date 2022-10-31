import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import AuthInput from '../../components/auth/AuthInput';


const SignupScreen = () => {

  const [ id, setId ] = useState('')
  const [ password, setPassword ] = useState('');
  const [ nickname, setNickname ] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require(`../../assets/images/LoginLogo.png`)} style={styles.image}/>

      <Text style={styles.title}>올라오라곰</Text>

      <AuthInput 
        title={'id'}
        placeholder={'아이디'}
        onChangeText={(text) => setId(text)}
      />
      <AuthInput 
        title={'nickname'}
        placeholder={'닉네임'}
        onChangeText={(text) => setNickname(text)}
      />
      <AuthInput 
        title={'password'}
        placeholder={'비밀번호'}
        onChangeText={(text) => setPassword(text)}
      />
      <AuthInput 
        title={'password2'}
        placeholder={'비밀번호 확인'}
        onChangeText={(text) => setPassword(text)}
      />

      <Pressable style={styles.signInButton}>
        <Text style={styles.signInText}>회원가입</Text>
      </Pressable>

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
  },
  signInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#74B49B',
    height: 40,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  signInText: {
    color: 'white',
  },
});

export default SignupScreen;