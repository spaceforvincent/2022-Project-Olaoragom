import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet} from 'react-native';
import { getMountainDetail } from '../../apis/Map';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MountainDetail = ({navigation: {navigate}, route}) => {

  const mountainId = route.params.mountainId

  const [ mountainData, setMountainData ] = useState([])

  useEffect(() => {
    const initialData = async() => {
      const response = await getMountainDetail(route.params.mountainId)
      console.log(response)
      console.log('이미지', response.mntnImg)
      setMountainData(response)
    }
    initialData()
    console.log('상세', mountainData)
  }, [])

  return (
    <View>
        {/* <Text>{mountainData.mntnDetails}</Text> */}
        <Text>상세페이지</Text>
        <Text>{mountainData.level}</Text>
        <Text>{mountainData.level}</Text>
        <Image source={{ uri: "mountainData.mntnImg" }}
        style={{width: 300, height: 300}}/>
    </View>
  );
};

export default MountainDetail;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
