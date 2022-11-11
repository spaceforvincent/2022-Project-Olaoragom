import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { getMountainWeather } from "../../apis/Map";

const MountainWeather = (props) => {

    const { lat, lng } = props
    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        console.log('위도', lat)
        console.log('경도', lng)
        const initialData = async() => {
            const response = await getMountainWeather(lat, lng)
            console.log(response)
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