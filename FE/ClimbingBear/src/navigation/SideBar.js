import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {AuthNavigation} from './AuthNavigation';
import {CalendarNavigation} from './CalendarNavigation';
import {MapNavigation} from './MapNavigation';
import {ChatNavigation} from './ChatNavigation';

import {useSelector} from 'react-redux';

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <drawer.Navigator
          useLegacyImplementation
          initialRouteName="Login"
          screenOptions={{
            headerTransparent: false,
            headerTitle: '',
          }}>
          <drawer.Screen
            name="달력"
            options={{unmountOnBlur: true, headerTitle: ''}}
            component={CalendarNavigation}
          />
          <drawer.Screen
            name="산 검색"
            options={{unmountOnBlur: true, headerTitle: ''}}
            component={MapNavigation}
          />
          <drawer.Screen
            name="채팅"
            options={{unmountOnBlur: true, headerTitle: ''}}
            component={ChatNavigation}
          />
          <drawer.Screen
            name="로그아웃"
            options={{unmountOnBlur: true, headerTitle: ''}}
            component={AuthNavigation}
          />
        </drawer.Navigator>
      ) : (
        <drawer.Navigator useLegacyImplementation initialRouteName="Login">
          <drawer.Screen
            name="로그인"
            component={AuthNavigation}
            options={{headerShown: false}}
          />
        </drawer.Navigator>
      )}
    </>
  );
}

export default DrawerNavigator;
