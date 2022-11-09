import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// CalendarNavigation 에서 사용(이동)할 페이지 import
import ChatRoom from '../screens/chat/ChatRoom';

// Navigator 사용을 위해 Stack 설정
const Stack = createStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatRoom"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

export {ChatNavigation};