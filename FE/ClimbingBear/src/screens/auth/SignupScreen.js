import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

import AuthInput from '../../components/auth/AuthInput';

// 회원가입
const signUp = async (id, password, nickname) => {
  try {
    const response = await axios({
      method: 'post',
      url: `http://k7d109.p.ssafy.io:8080/user/signup`,
      data: {
        id: id,
        nickname: nickname,
        pw: password,
      },
    });
    console.log(response.data);
    console.log(response.data.status)
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    console.log(error.response.headers);
  }
};

const SignupScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // 중복확인
  const [checkNickname, setCheckNickname] = useState(false);
  const [checkId, setCheckId] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require(`../../assets/images/LoginLogo.png`)}
        style={styles.image}
      />

      <Text style={styles.title}>올라오라곰</Text>

      <View style={styles.idContainer}>
        <AuthInput
          title={'id'}
          value={id}
          placeholder={'아이디'}
          onChangeText={text => setId(text)}
        />

        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => signUp(id, password, nickname)}>
          <Text style={styles.signUpText}>중복검사</Text>
        </TouchableOpacity>
      </View>

      <AuthInput
        title={'nickname'}
        value={nickname}
        placeholder={'닉네임'}
        onChangeText={text => setNickname(text)}
      />
      <AuthInput
        title={'password'}
        value={password}
        placeholder={'비밀번호'}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <AuthInput
        title={'password'}
        value={password}
        placeholder={'비밀번호 확인'}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
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
  idContainer: {
    flexDirection: "row"
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
});

export default SignupScreen;
