import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';

import {AuthNavigation} from './AuthNavigation';
import {CalendarNavigation} from './CalendarNavigation';
import {MapNavigation} from './MapNavigation';
import {ChatNavigation} from './ChatNavigation';
import {Image} from 'react-native';
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
            headerTitleAlign: 'center',
            drawerStyle: {
              width: 200,
            },
          }}>
          <drawer.Screen
            name="등산 달력"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/drawer2.png')}></Image>
              ),
              unmountOnBlur: true,
              headerTitle: () => (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require('../assets/images/LoginLogo.png')}
                />
              ),
            }}
            component={CalendarNavigation}
          />
          <drawer.Screen
            name="100대 명산"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/drawer1.png')}></Image>
              ),
              unmountOnBlur: true,
              headerTitle: () => (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require('../assets/images/LoginLogo.png')}
                />
              ),
            }}
            component={MapNavigation}
          />
          <drawer.Screen
            name="채팅"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/drawer3.png')}></Image>
              ),
              unmountOnBlur: true,
              headerTitle: () => (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require('../assets/images/LoginLogo.png')}
                />
              ),
            }}
            component={ChatNavigation}
          />
          <drawer.Screen
            name="로그아웃"
            options={{
              unmountOnBlur: true,
              headerTitle: () => (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require('../assets/images/LoginLogo.png')}
                />
              ),
            }}
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

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
