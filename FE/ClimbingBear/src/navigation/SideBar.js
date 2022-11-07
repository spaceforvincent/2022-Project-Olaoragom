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
import {AuthNavigation} from './AuthNavigation';
import { CalendarNavigation } from './CalendarNavigation';
import { MapNavigation } from './MapNavigation';

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <drawer.Navigator
      useLegacyImplementation
      initialRouteName="Login">
      <drawer.Screen name="Login" component={AuthNavigation} />
      <drawer.Screen name="Calendar" component={CalendarNavigation} />
      <drawer.Screen name="Map" component={MapNavigation} />
      <drawer.Screen name="ChatRoom" component={ChatRoom} />
    </drawer.Navigator>
  );
}

export default DrawerNavigator;
