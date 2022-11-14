import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// CalendarNavigation 에서 사용(이동)할 페이지 import
import CalendarHome from '../screens/calendar/CalendarHome';
import CalendarRecord from '../screens/calendar/CalendarRecord';

// Navigator 사용을 위해 Stack 설정
const Stack = createStackNavigator();

const CalendarNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="CalendarHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CalendarHome" component={CalendarHome} />
      <Stack.Screen name="CalendarRecord" component={CalendarRecord} />
    </Stack.Navigator>
  );
};

export {CalendarNavigation};
