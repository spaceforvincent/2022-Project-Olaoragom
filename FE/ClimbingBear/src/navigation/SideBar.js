import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import LoginScreen from '../screens/auth/LoginScreen';
import CalendarHome from '../screens/calendar/CalendarHome';
import ChatRoom from '../screens/chat/ChatRoom';
import MapHome from '../screens/map/MapHome';
import LogoutScreen from '../screens/auth/LogoutScreen'
import { AuthNavigation} from './AuthNavigation';
import { CalendarNavigation } from './CalendarNavigation';
import { MapNavigation } from './MapNavigation';
import { ClimbingNavigation } from './ClimbingNavigation';

import { useSelector } from 'react-redux';

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
  return (
    <>
      {/* 로그인O */}
      {isAuthenticated && (
        <drawer.Navigator useLegacyImplementation initialRouteName="Login">
          <drawer.Screen name="Calendar" component={CalendarNavigation} />
          <drawer.Screen name="Climbing" component={ClimbingNavigation} />
          <drawer.Screen name="Map" component={MapNavigation} />
          <drawer.Screen name="ChatRoom" component={ChatRoom} />
          <drawer.Screen name="logout" component={LogoutScreen}/>
        </drawer.Navigator>
      )}
      {/* 로그인X */}
      {isAuthenticated === false && (
        <drawer.Navigator useLegacyImplementation initialRouteName="Login">
          <drawer.Screen name="Login" component={AuthNavigation} options={{headerShown: false}}/>
        </drawer.Navigator>
      )}
    </>
  );
}

export default DrawerNavigator;
