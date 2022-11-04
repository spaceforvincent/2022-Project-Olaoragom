import React, { useCallback, useEffect, useState } from 'react';


import { postSignUp, existNickname } from '../../apis/Auth'
import AuthInput from '../../components/auth/AuthInput';


import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';

// 회원가입
const signUp = async(id, password, nickname) => {

  if (!id || !id.trim()) {
    return Alert.alert('알림', '아이디를 입력해주세요.');
  }
  else if (!nickname || !nickname.trim()) {
    return Alert.alert('알림', '닉네임을 입력해주세요.');
  }
  else if (!password || !password.trim()) {
    return Alert.alert('알림', '비밀번호를 입력해주세요.');
  }
  else if (!password || !password.trim()) {
    return Alert.alert('알림', '비밀번호를 확인해주세요.');
  }

  else {
    const isAuthenticated = await postLogin(id, password)
    // (임시) 사이드바 해결되면 네비게이터 수정하기!!
    if ( isAuthenticated === true ) {
      return navigation.navigate('SignupScreen')
    }
    else {
      return Alert.alert('알림', '아이디와 비밀번호를 확인해주세요.');
    }
  }

};

const SignupScreen = () => {
  
  // 아이디, 비밀번호, 닉네임
  const [ id, setId ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');

  const [ isNickname, setIsNickname ] = useState('');

  const onchangeSignUpId = useCallback(text => {
    setId(text.trim())
  }, [])
  const onchangeSignUpNickname = useCallback(text => {
    setNickname(text.trim())
  }, [])
  const onchangeSignUpPassword = useCallback(text => {
    setPassword(text.trim())
  }, [])

  // 닉네임 중복확인
  const checkNickname = async (nickname) => {
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '닉네임을 입력해주세요.');
    } else {
      const res = await existNickname(nickname)
      setIsNickname(res)
    }
  }

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
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => signUp(id, password, nickname)}>
          <Text style={styles.signUpText}>중복검사</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checkWarn}>
        </View>

      <View style={styles.checkContainer}>
        <AuthInput
          title={'nickname'}
          value={nickname}
          placeholder={'닉네임'}
          onChangeText={onchangeSignUpNickname}
        />
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => checkNickname(nickname)}>
          <Text style={styles.signUpText}>중복검사</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checkWarn}>
        {
          isNickname && <TextLight style={styles.checkWarn}>중복된 닉네임입니다!</TextLight>
        }
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

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => signUp(id, password, nickname)}>
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
  }
});

export default SignupScreen;
