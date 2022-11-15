import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { getMountainWeather } from "../../apis/Map";

const MountainWeather = ({lat, lon}) => {

    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        console.log('위도', lat)
        console.log('경도', lon)
        const initialData = async() => {
            const response = await getMountainWeather(lat, lon)
            console.log(response.data)
            setWeather(response)
        }
        initialData()
        console.log('날씨', weather)
    }, [])

    return(
        <View>

        </View>
    )
}

export default MountainWeather;