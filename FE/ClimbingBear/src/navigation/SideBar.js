import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import LogoutScreen from '../screens/auth/LogoutScreen'
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
          <drawer.Screen name="Calendar" component={CalendarNavigation} />
          <drawer.Screen name="Climbing" component={ClimbingNavigation} />
          <drawer.Screen name="Map" component={MapNavigation} />
          <drawer.Screen name="ChatRoom" component={ChatNavigation} />
          <drawer.Screen name="logout" component={LogoutScreen} />
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
