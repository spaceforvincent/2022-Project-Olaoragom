import React, {useEffect, useState} from 'react';
import { ScrollView , View, Text, Image, StyleSheet, Dimensions, PixelRatio, TouchableOpacity } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';

import { getMountainDetail } from '../../apis/Map';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// dp 를 pixel 로 바꿔주는 모듈
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const MountainDetail = ({navigation, route}) => {

  const [mountainData, setMountainData] = useState([]);
  const mntnId = route.params.mountainId;

  useEffect(() => {
    const initialData = async () => {
      const response = await getMountainDetail(mntnId);
      console.log(response);
      setMountainData(response);
    };
    initialData();
    console.log('상세', mountainData);
  }, []);

  return (
    <ScrollView>
      {/* 산 이미지 */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://storage.googleapis.com/climbingbear/1-${mntnId}.jpg`,
          }}></Image>
      </View>

      {/* 산 정보 */}
      <View style={styles.detailContainer}>
        <View style={styles.textContainer}>
          <View style={styles.detailHeader}>
            <TextExtraBold style={styles.mntnTitle}>{mountainData.mntnNm}</TextExtraBold>
            <TouchableOpacity
              style={styles.climbingButton}
              onPress={() =>
                navigation.navigate('ClimbingHome', {mntnId: mntnId})
              }>
              <TextExtraBold style={styles.title}>등산하기</TextExtraBold>
            </TouchableOpacity>
          </View>
          <TextBold style={styles.subnm}>{mountainData.mntnSubnm}</TextBold>
          <TextBold style={styles.mntnHeight}>{mountainData.mntnHeight}</TextBold>
          <TextMedium style={styles.region}>{mountainData.mntnRegion}</TextMedium>
          <TextLight style={styles.detail}>{mountainData.mntnDetails}</TextLight>
          <TextBold style={styles.reasonTitle}>100대 명산 선정 이유</TextBold>
          <TextLight style={styles.reason}>{mountainData.mntnReason}</TextLight>
          {/* <Text>{mountainData.mntnEtccourse}오는 길</Text>
          <Text>{mountainData.mntnTransport}교통수단</Text> */}
        </View>
      </View>

      {/* 산 난이도 */}
      <View style={styles.difficultyContainer}>
        <TextExtraBold style={styles.difficultyTitle}>
          난이도 {mountainData.level}
        </TextExtraBold>
        {mountainData.level == '쉬움' && (
          <TextBold style={styles.difficultText}>이 정도는 산책 그 잡체!</TextBold>
        )}
        {mountainData.level == '중간' && (
          <TextBold style={styles.difficultText}>
            간식의 힘이라면 충분!
          </TextBold>
        )}
        {mountainData.level == '어려움' && (
          <TextBold style={styles.difficultText}>
            중요한 것은 꺾이지 않는 마음!
          </TextBold>
        )}
      </View>

      {/* 날씨 */}
      <View style={styles.weatherContainer}></View>

      {/* 등산로 */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://storage.googleapis.com/climbingbear/${mntnId}.png`,
          }}></Image>
      </View>
    </ScrollView>
  );
};

export default MountainDetail;

const styles = StyleSheet.create({

  detailContainer: {
    borderWidth: 1, 
    borderRadius: 10,
    borderColor: '#B2B2B2',
    margin: 20,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignContent: 'center'
  },
  textContainer: {
    margin: 10,
    justifyContent: 'center'
  },
  difficultyContainer: {
    backgroundColor: '#DFE8CC',
    margin: 20,
    borderWidth: 1, 
    borderRadius: 10,
    borderColor: '#B2B2B2',
  },
  detailHeader: {
    flexDirection: 'row'
  },
  image: {
    margin: 20,
    height: windowHeight * 0.3,
    borderRadius: 10,
    resizeMode: "stretch",
  },

  mntnTitle: {
    fontSize: 30,
    marginBottom: 10,
  },

  reasonTitle: {
    color: '#FF6464',
    marginTop: 10,
  },

  reason: {
    marginTop: 10,
  },

  region: {
    marginTop: 10,
  },
  
  detail: {
    marginTop: 10,
  },

  mntnHeight: {
    marginTop: 10,
  },

  difficultyTitle: {
    fontSize: 15,
    margin: 10,
    marginBottom: 0,
  },

  difficultText: {
    margin: 10,
  },

  climbingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    backgroundColor: '#74B49B',
    color: 'white',
    height: 40,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  }

});
