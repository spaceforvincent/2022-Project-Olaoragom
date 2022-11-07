import React from "react"
import {createStackNavigator} from '@react-navigation/stack'

import MapHome from "../screens/map/MapHome"
import MountainDetail from "../screens/map/MountainDetail"

const Stack = createStackNavigator()

const MapNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="MapHome"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="MapHome" component={MapHome}></Stack.Screen>
            <Stack.Screen name="MountainDetail" component={MountainDetail}></Stack.Screen>
        </Stack.Navigator>
    )
}

export {MapNavigation}