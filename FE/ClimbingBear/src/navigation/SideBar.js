import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { AuthNavigation} from './AuthNavigation';
import { CalendarNavigation } from './CalendarNavigation';
import { MapNavigation } from './MapNavigation';
import { ClimbingNavigation } from './ClimbingNavigation';
import { ChatNavigation } from './ChatNavigation'

import { useSelector } from 'react-redux';

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <drawer.Navigator useLegacyImplementation initialRouteName="Login">
          <drawer.Screen name="Calendar" options={{unmountOnBlur: true, headerTitle:''}} component={CalendarNavigation} />
          <drawer.Screen name="Climbing" options={{unmountOnBlur: true, headerTitle:''}} component={ClimbingNavigation} />
          <drawer.Screen name="Map" options={{unmountOnBlur: true, headerTitle:''}} component={MapNavigation} />
          <drawer.Screen name="ChatRoom" options={{unmountOnBlur: true, headerTitle:''}} component={ChatNavigation} />
        </drawer.Navigator>
      ) : (
        <drawer.Navigator useLegacyImplementation initialRouteName="Login">
          <drawer.Screen
            name="Login"
            component={AuthNavigation}
            options={{headerShown: false}}
          />
        </drawer.Navigator>
      )}
    </>
  );
}

export default DrawerNavigator;
