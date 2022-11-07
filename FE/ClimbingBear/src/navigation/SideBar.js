import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import LoginScreen from '../screens/auth/LoginScreen';
import CalendarHome from '../screens/calendar/CalendarHome';
import MapHome from '../screens/map/MapHome';
import MountainSemiDetail from '../screens/map/MountainSemiDetail';
import {AuthNavigation} from './AuthNavigation';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <drawer.Navigator
      useLegacyImplementation
      initialRouteName="Login"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <drawer.Screen name="Login" component={AuthNavigation} />
      <drawer.Screen name="Calendar" component={CalendarHome} />
      <drawer.Screen name="MapHome" component={MapHome} />
      <drawer.Screen name="MountainSemiDetail" component={MountainSemiDetail}/>
    </drawer.Navigator>
  );
}

export default DrawerNavigator;
