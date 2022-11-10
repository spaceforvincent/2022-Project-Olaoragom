import React, {useEffect, useState} from 'react';
import { ScrollView , Text, View, StyleSheet } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';

import { getMountainDetail } from '../../apis/Map';

const MountainDetail = ({navigation: {navigate}, route}) => {

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
    <ScrollView>
      <View>
        {/* 산 이미지 */}
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.textContainer}>
        <TextExtraBold>{mountainData.mntnNm}</TextExtraBold>
        <Text>{mountainData.mmtnSubnm}</Text>
        <Text>{mountainData.mntnHeight}</Text>
        <Text>{mountainData.mntnRegion}</Text>
        <Text/>
        <Text>{mountainData.mntnDetails}</Text>
        <Text/>
        <Text>{mountainData.mntnEtccourse}</Text>
        <Text/>
        <Text>{mountainData.mntnTransport}</Text>
        <Text>{mountainData.level}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MountainDetail;

const styles = StyleSheet.create({

  detailContainer: {
    borderWidth: 1, 
    margin: 30,
  },
  textContainer: {
    margin: 20,
  },

});
