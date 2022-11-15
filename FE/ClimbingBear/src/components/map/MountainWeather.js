import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getMountainWeather } from "../../apis/Map";

const MountainWeather = (props) => {

    const { weatherLat, weatherLon } = props

    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        const initialData = async() => {
            const response = await getMountainWeather(weatherLat, weatherLon)
            console.log(response.data)
            setWeather(response)
        }
        initialData()
        console.log('날씨', weather)
    }, [])

    return(
        <View>
            <Text>얍</Text>
        </View>
    )
}

export default MountainWeather;