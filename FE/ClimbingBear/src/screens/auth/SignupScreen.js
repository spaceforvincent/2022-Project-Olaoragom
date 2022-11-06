import React, { useCallback, useEffect, useState } from 'react';

import { postSignUp, existNickname, existId } from '../../apis/Auth'

import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';
import Icon from 'react-native-vector-icons/Entypo';

import AuthInput from '../../components/auth/AuthInput';

const SignupScreen = ({navigation}) => {
  
  const [ id, setId ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');

  // 중복검사
  const [ isId, setIsId ] = useState('');
  const [ isNickname, setIsNickname ] = useState('');
  
  // input onchange
  const onchangeSignUpId = useCallback(text => {
    setId(text.trim())
  }, [])
  const onchangeSignUpNickname = useCallback(text => {
    setNickname(text.trim())
  }, [])
  const onchangeSignUpPassword = useCallback(text => {
    setPassword(text.trim())
  }, [])

  // 아이디 중복확인
  const checkId = async( id ) => {
    if (!id || !id.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.')
    } else {
      const res = await existId(id)
      setIsId(res)
    }
  }

  // 닉네임 중복확인
  const checkNickname = async(nickname) => {
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '닉네임을 입력해주세요.');
    } else {
      const res = await existNickname(nickname)
      setIsNickname(res)
    }
  }

  // 회원가입
  const signUp = async(id, password, password2, nickname, isId, isNickname) => {
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요!');
    }
    else if (isId === '' || isId === true || isNickname === '' || isNickname === true) {
      return Alert.alert('알림', '아이디 및 닉네임 중복확인을 진행해주세요😥')
    }
    else {
      console.log(id)
      console.log(nickname)
      console.log(password)
      const isUser = await postSignUp(id, nickname, password)
      if (isUser === true) {
        return navigation.navigate('LoginScreen')        
      }
      else {
        return Alert.alert('알림', '회원가입 폼을 다시 한 번 확인해주세요😥')
      }
    }
  };

  return (

    <View style={styles.container}>

      <Image
        source={require(`../../assets/images/LoginLogo.png`)}
        style={styles.image}
      />

      <Text style={styles.title}>올라오라곰</Text>

      <View style={styles.checkContainer}>
        <AuthInput
          title={'id'}
          value={id}
          placeholder={'아이디'}
          onChangeText={onchangeSignUpId}
        />
        <View>
          {/* 아이디 중복검사 필요 */}
          {isId === true && (
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => checkId(id)}>
              <Text style={styles.signUpText}>중복검사</Text>
            </TouchableOpacity>
          )}
          {isId === '' && (
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => checkId(id)}>
              <Text style={styles.signUpText}>중복검사</Text>
            </TouchableOpacity>
          )}
          {/* 아이디 중복검사 완료 */}
          {isId === false && (
            <Icon
              style={styles.checkIcon}
              name="check"
              size={30}
              color="#74B49B"
            />
          )}
        </View>
      </View>
      <View style={styles.checkWarn}>
        {isId && (
          <TextLight style={styles.checkWarn}>중복된 아이디입니다!</TextLight>
        )}
      </View>

      <View style={styles.checkContainer}>
        <AuthInput
          title={'nickname'}
          value={nickname}
          placeholder={'닉네임'}
          onChangeText={onchangeSignUpNickname}
        />
        <View>
          {/* 닉네임 중복검사 필요 */}
          {isNickname === true && (
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => checkNickname(nickname)}>
              <Text style={styles.signUpText}>중복검사</Text>
            </TouchableOpacity>
          )}
          {isNickname === '' && (
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => checkNickname(nickname)}>
              <Text style={styles.signUpText}>중복검사</Text>
            </TouchableOpacity>
          )}
          {/* 닉네임 중복검사 완료 */}
          {isNickname === false && (
            <Icon
            style={styles.checkIcon}
            name="check"
            size={30}
            color="#74B49B"
          />
          )}
        </View>
      </View>
      <View style={styles.checkWarn}>
        {isNickname && (
          <TextLight style={styles.checkWarn}>중복된 닉네임입니다!</TextLight>
        )}
      </View>

      <AuthInput
        title={'password'}
        value={password}
        placeholder={'비밀번호'}
        secureTextEntry={true}
        onChangeText={onchangeSignUpPassword}
      />
      <AuthInput
        title={'password'}
        value={password2}
        placeholder={'비밀번호 확인'}
        secureTextEntry={true}
        onChangeText={text => setPassword2(text)}
      />
      <View style={styles.checkWarn}>
        {password !== password2 && (
          <TextLight style={styles.checkWarn}>비밀번호가 일치하지 않습니다!</TextLight>
        )}
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => signUp(id, password, password2, nickname, isId, isNickname)}>
        <Text style={styles.signUpText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 40,
    margin: 5,
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#74B49B',
    height: 40,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  signUpText: {
    color: 'white',
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    backgroundColor: '#74B49B',
    height: 40,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  checkWarn: {
    color: 'red',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  checkIcon: {
    marginTop: 15
  }

});

export default SignupScreen;

