import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RankGraph from '../screens/rank/RankGraph';

const Stack = createStackNavigator();

const RankGraphNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="RankGraph"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="RankGraph" component={RankGraph}></Stack.Screen>
    </Stack.Navigator>
  );
};

export {RankGraphNavigation};