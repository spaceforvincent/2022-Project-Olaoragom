import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// AuthNavigation 에서 사용(이동)할 페이지 import
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import LogoutScreen from '../screens/auth/LogoutScreen';

// Navigator 사용을 위해 Stack 설정
const Stack = createStackNavigator();

// (임시) 더미 auth 네비게이터로 만들고 app.js 에 추가 필요
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen}/>
    </Stack.Navigator>
  );
};

export {AuthNavigation};
