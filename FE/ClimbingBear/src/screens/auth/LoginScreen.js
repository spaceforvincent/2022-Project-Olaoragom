import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthInput from '../../components/auth/AuthInput';

const login = async( id, password ) => {
  console.log(id)
  console.log(password)
  try {
    const response = await axios({
      method: "post",
      url: `http://k7d109.p.ssafy.io:8080/user/login`,
      data: {
        id: id,
        pw: password
      }
    })
    console.log(response.data)
    console.log(response.data.data.accessToken)
  }
    catch (error) {
      console.log(error)
      console.log(error.response.data);
      console.log(error.response.headers);
    }
  }

const LoginScreen = () => {

  const navigation = useNavigation();

  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require(`../../assets/images/LoginLogo.png`)} style={styles.image}/>

      <Text style={styles.title}>올라오라곰</Text>

        <AuthInput 
          title={'email'}
          value={id}
          placeholder={'아이디'}
          onChangeText={(text) => setId(text)}
        />
        <AuthInput
          title={'password'}
          value={password}
          placeholder={'비밀번호'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      
      <Pressable style={styles.loginButton}>
        <Text style={styles.loginText} onPress = {() => login( id, password )}>로그인</Text>
      </Pressable>

      <Text>아직 회원이 아니신가요?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.signupText}>회원가입하러가기</Text>
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