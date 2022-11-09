import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// HomeNavigation 에서 사용(이동)할 페이지 import
// (임시) auth 제외 스크린만 네비게이터 만들어두기
import ClimbingHome from '../screens/climbing/ClimbingHome';
import ClimbingGPS from '../screens/climbing/ClimbingGPS';
import ClimbingFinish from '../screens/climbing/ClimbingFinish';
import ClimbCompanyAdd from '../screens/climbing/ClimbCompanyAdd';

// (공부) Navigator 사용을 위해 Stack 설정
const Stack = createStackNavigator();

const HomeNavigation = () => {
  /* 
    Stack.Navigator 내부에 Stack.Screen 작성하면 네비게이터(라우터)가 생성됨
    Stack.Navigator 에서 처음으로 라우트 할 페이지를 작성하는 것
    (공부) Stack.Group 도 쓸 수 있음
    (공부) 그렇다면 params 가 필요한 라우터 사용법은 어떻게 되는지
  */
  // (임시) 개발에 필요한 초기 페이지로 라우트 시켜놔서 login 연동 후 수정해야 한다
  return (
    <Stack.Navigator
      initialRouteName="ClimbingHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClimbingHome" component={ClimbingHome} />
      <Stack.Screen name="ClimbingGPS" component={ClimbingGPS} />
      <Stack.Screen name="ClimbingFinish" component={ClimbingFinish} />
      <Stack.Screen name="ClimbCompanyAdd" component={ClimbCompanyAdd} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
