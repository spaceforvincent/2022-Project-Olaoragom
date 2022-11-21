import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RankHome from '../screens/rank/RankHome';

const Stack = createStackNavigator();

const RankNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="RankHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="RankHome" component={RankHome}></Stack.Screen>
    </Stack.Navigator>
  );
};

export {RankNavigation};
