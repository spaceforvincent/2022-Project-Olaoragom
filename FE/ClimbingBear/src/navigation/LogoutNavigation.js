import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LogoutScreen from '../screens/auth/LogoutScreen';

const Stack = createStackNavigator();

const LogoutNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Logout"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LogoutScreen" component={LogoutScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export {LogoutNavigation};
