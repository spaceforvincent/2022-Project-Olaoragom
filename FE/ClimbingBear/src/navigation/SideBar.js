import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import LoginScreen from '../screens/auth/LoginScreen';
import CalendarHome from '../screens/calendar/CalendarHome';
import MapHome from '../screens/map/MapHome';
import {AuthNavigation} from './AuthNavigation';

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <drawer.Navigator
      useLegacyImplementation
      initialRouteName="Login">
      <drawer.Screen name="Login" component={AuthNavigation} />
      <drawer.Screen name="Calendar" component={CalendarHome} />
      <drawer.Screen name="MapHome" component={MapHome} />
    </drawer.Navigator>
  );
}

export default DrawerNavigator;
