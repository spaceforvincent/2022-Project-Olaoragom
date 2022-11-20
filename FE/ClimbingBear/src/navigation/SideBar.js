import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {StyleSheet, TouchableOpacityComponent} from 'react-native';

import {AuthNavigation} from './AuthNavigation';
import {CalendarNavigation} from './CalendarNavigation';
import {MapNavigation} from './MapNavigation';
import {ChatNavigation} from './ChatNavigation';
import {RankNavigation} from './RankNavigation';
import {RankGraphNavigation} from './RankGraphNavigaion';
import { LogoutNavigation } from './LogoutNavigation';

import {Image, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
              width: 250,
            },
            drawerActiveBackgroundColor: '#E9EFC0',
            drawerActiveTintColor: 'black',
          }}>
          <drawer.Screen
            name="100대 명산 등산"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/drawer1.png')}></Image>
              ),
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
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
            name="등산 달력"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/drawer2.png')}></Image>
              ),
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
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
            name="곰들의 전쟁"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/ranking.png')}></Image>
              ),
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
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
            component={RankNavigation}
          />
          <drawer.Screen
            name="명예의 곰 전당"
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/award.png')}></Image>
              ),
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
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
            component={RankGraphNavigation}
          />
          <drawer.Screen
            name="채팅"
            style={{fontSize: 60}}
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/drawer3.png')}></Image>
              ),
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
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
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
              unmountOnBlur: true,
              drawerIcon: ({focused, size}) => (
                <Image
                  style={styles.icon}
                  source={require('../assets/images/logout.png')}></Image>
              ),
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
            component={LogoutNavigation}
          />
        </drawer.Navigator>
      ) : (
        <drawer.Navigator useLegacyImplementation initialRouteName="Login">
          <drawer.Screen
            name="로그인"
            component={AuthNavigation}
            options={{
              drawerLabelStyle: {fontSize: 15, fontFamily: 'SeoulNamsanL'},
              headerShown: false,
            }}
          />
        </drawer.Navigator>
      )}
    </>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  icon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
  drawerItem: {
    fontSize: 50,
  },
});
