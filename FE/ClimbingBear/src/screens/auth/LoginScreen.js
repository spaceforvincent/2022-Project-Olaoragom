import React, { useCallback, useEffect, useState } from 'react';

import { postLogin, getToken } from '../../apis/Auth';

import { useDispatch } from 'react-redux';

import { Image, View, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';

import AuthInput from '../../components/auth/AuthInput';
import { authActions } from '../../store/Auth';

const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch()

  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');

  // input onchange
  const onChangeLoginId = useCallback(text => {
    setId(text.trim())
  }, [])
  const onChangeLoginPassword = useCallback(text => {
    setPassword(text.trim())
  }, [])


  // 로그인
  const login = async (id, password) => {
    if (!id || !id.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    }
    else if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    else {
      const response = await postLogin(id, password)

      if ( response.status === 'success' ) {
        console.log('로그인 성공!')
        const accessToken = await getToken()
        const nickname = response.data.nickname
        const isAuthenticated = true
        dispatch(authActions.authenticate({
          accessToken,
          nickname,
          isAuthenticated
        }))
        return navigation.navigate('산 검색')
      }
      else {
        return Alert.alert('알림', '아이디와 비밀번호를 확인해주세요.');
      }
    }
  }

  return (

    <View style={styles.container}>

      <Image source={require(`../../assets/images/LoginLogo.png`)} style={styles.image}/>

      <TextExtraBold style={styles.title}>올라오라곰</TextExtraBold>
        <AuthInput 
          title={'id'}
          value={id}
          placeholder={'아이디'}
          onChangeText={onChangeLoginId}
        />

        <AuthInput
          title={'password'}
          value={password}
          placeholder={'비밀번호'}
          secureTextEntry={true}
          onChangeText={onChangeLoginPassword}
        />
      
      <TouchableOpacity style={styles.loginButton}>
        <TextMedium style={styles.loginText} onPress = {() => login(id, password)}>로그인</TextMedium>
      </TouchableOpacity>

      <TextMedium>아직 회원이 아니신가요?</TextMedium>
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <TextMedium style={styles.signupText}>회원가입하러가기</TextMedium>
      </TouchableOpacity>

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
    margin: 10,
  },

  title: {
    fontSize: 40,
    margin: 5,
  },

  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#74B49B',
    height: 40,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },

  loginText: {
    color: 'white',
  },

  signupText: {
    textDecorationLine: 'underline',
  }

})

export default LoginScreen;
