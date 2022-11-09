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
import {CalendarNavigation} from './CalendarNavigation';
import {MapNavigation} from './MapNavigation';
import HomeNavigation from './HomeNavigation';

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <drawer.Navigator
      useLegacyImplementation
      initialRouteName="산 검색"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
      }}>
      {/* <drawer.Screen
        name="산 검색"
        component={MapNavigation}
        options={{unmountOnBlur: true}}
      /> */}
      <drawer.Screen name="나의 일정" component={CalendarNavigation} />
      <drawer.Screen name="채팅" component={ChatRoom} />
      <drawer.Screen name="(임시) 등산기록측정" component={HomeNavigation} />
    </drawer.Navigator>
  );
}

export default DrawerNavigator;
