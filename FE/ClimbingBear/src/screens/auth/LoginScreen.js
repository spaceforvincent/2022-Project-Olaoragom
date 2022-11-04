import React, {useCallback, useEffect, useState} from 'react';

import {postLogin} from '../../apis/Auth';

import {useNavigation} from '@react-navigation/native';
import {
  Image,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AuthInput from '../../components/auth/AuthInput';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

const LoginScreen = ({navigation}) => {
  // const navigation = useNavigation();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback(text => {
    setId(text.trim());
  }, []);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  // 로그인
  const login = async (id, password) => {
    if (!id || !id.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    } else if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    } else {
      const isAuthenticated = await postLogin(id, password);
      // (임시) 사이드바 해결되면 네비게이터 수정하기!!
      if (isAuthenticated === true) {
        return navigation.navigate('SignupScreen');
      } else {
        return Alert.alert('알림', '아이디와 비밀번호를 확인해주세요.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require(`../../assets/images/LoginLogo.png`)}
        style={styles.image}
      />

      <TextExtraBold style={styles.title}>올라오라곰</TextExtraBold>

      <AuthInput
        title={'id'}
        value={id}
        placeholder={'아이디'}
        onChangeText={onChangeId}
      />
      <AuthInput
        title={'password'}
        value={password}
        placeholder={'비밀번호'}
        secureTextEntry={true}
        onChangeText={onChangePassword}
      />

      <Pressable style={styles.loginButton}>
        <TextMedium
          style={styles.loginText}
          onPress={() => login(id, password)}>
          로그인
        </TextMedium>
      </Pressable>

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
    alignItems: 'center',
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
  },
});

export default LoginScreen;
