import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// ClimbingNavigation 에서 사용(이동)할 페이지 import
import ClimbingHome from '../screens/climbing/ClimbingHome';
import ClimbingGPS from '../screens/climbing/ClimbingGPS';
import ClimbingFinish from '../screens/climbing/ClimbingFinish';

// Navigator 사용을 위해 Stack 설정
const Stack = createStackNavigator();

const ClimbingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClimbingHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClimbingHome" component={ClimbingHome} />
      <Stack.Screen name="ClimbingGPS" component={ClimbingGPS} />
      <Stack.Screen name="ClimbingFinish" component={ClimbingFinish} />
    </Stack.Navigator>
  );
};

export {ClimbingNavigation};
