import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import { getMountainDetail } from '../../apis/Map';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const MountainDetail = ({navigation: {navigate}, route}) => {

  const mountainId = route.params.mountainId

  const [ mountainData, setMountainData ] = useState([])

  useEffect(() => {
    const initialData = async() => {
      const response = await getMountainDetail(route.params.mountainId)
      console.log(response)
      setMountainData(response)
    }
    initialData()
    console.log('상세', mountainData)
  }, [])

  return (
    <View>
        <Text>{mountainData.mntnDetails}</Text>
        <Text>{mountainData.level}</Text>
        <Text>{mountainData.level}</Text>
    </View>
  );
};

export default MountainDetail;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
