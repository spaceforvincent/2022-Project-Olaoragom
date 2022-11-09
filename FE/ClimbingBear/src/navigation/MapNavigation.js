import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MapHome from '../screens/map/MapHome';
import MountainDetail from '../screens/map/MountainDetail';
import ClimbingHome from '../screens/climbing/ClimbingHome';
import ClimbingGPS from '../screens/climbing/ClimbingGPS';
import ClimbingFinish from '../screens/climbing/ClimbingFinish';
import ClimbCompanyAdd from '../screens/climbing/ClimbCompanyAdd';

const Stack = createStackNavigator();

const MapNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MapHome" component={MapHome} />
      <Stack.Screen name="MountainDetail" component={MountainDetail} />
      <Stack.Screen name="ClimbingHome" component={ClimbingHome} />
      <Stack.Screen name="ClimbingGPS" component={ClimbingGPS} />
      <Stack.Screen name="ClimbingFinish" component={ClimbingFinish} />
      <Stack.Screen name="ClimbCompanyAdd" component={ClimbCompanyAdd} />
    </Stack.Navigator>
  );
};

export {MapNavigation};
