import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

import {getMountainDetail, getMountainWeather} from '../../apis/Map';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MountainDetail = ({navigation, route}) => {
  const [mountainData, setMountainData] = useState([]);
  const [mountainWeather, setMountainWeather] = useState([]);
  const mntnId = route.params.mountainId;
  const lat = route.params.mountainLat;
  const lon = route.params.mountainLon;

  useLayoutEffect(() => {
    const initialData = async () => {
      const response = await getMountainDetail(mntnId);
      console.log(response);
      setMountainData(response);
    };
    initialData();
  }, []);

  useEffect(() => {
    const tempData = async() => {
      const response = await getMountainWeather(lat, lon)
      setMountainWeather(response)
    }
    tempData();
  }, [])

  return (
    <ScrollView>
      {/* 산 이미지 */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.mntnImage}
          source={{
            uri: `https://storage.googleapis.com/climbingbear/1-${mntnId}.jpg`,
          }}></Image>
      </View>

      {/* 산 정보 */}
      <View style={styles.detailContainer}>
        <View style={styles.textContainer}>
          <View style={styles.detailHeader}>
            <View style={styles.detailTitle}>
              <TextExtraBold style={styles.mntnTitle}>
                {mountainData.mntnNm}
              </TextExtraBold>
              <TextBold style={styles.mntnHeight}>
                <Image
                  source={require('../../assets/images/mntn.png')}
                  style={styles.icon}></Image>
                {mountainData.mntnHeight}
              </TextBold>
            </View>
            <TouchableOpacity
              style={styles.climbingButton}
              onPress={() =>
                navigation.navigate('ClimbingHome', {mntnId: mntnId})
              }>
              <TextMedium style={styles.buttonTitle}>등산하기</TextMedium>
            </TouchableOpacity>
          </View>
          <TextMedium style={styles.region}>
            {mountainData.mntnRegion}
          </TextMedium>
          <TextBold style={styles.subnm}>{mountainData.mntnSubnm}</TextBold>
          <TextLight style={styles.detail}>
            {mountainData.mntnDetails}
          </TextLight>
          <TextBold style={styles.reasonTitle}>100대 명산 선정 이유</TextBold>
          <TextLight style={styles.reason}>{mountainData.mntnReason}</TextLight>
          {/* <Text>{mountainData.mntnEtccourse}오는 길</Text>
          <Text>{mountainData.mntnTransport}교통수단</Text> */}
        </View>
      </View>

      <View style={styles.detailBody}>
        {/* 산 난이도 */}
        <View style={styles.difficultyContainer}>
          <View style={styles.difficultyTextContainer}>
            <View style={styles.difficultyHeader}>
              <TextExtraBold style={styles.difficultyTitle}>
                난이도
              </TextExtraBold>
              <TextExtraBold style={styles.difficultyContent}>
                {mountainData.level}
              </TextExtraBold>
            </View>
            {mountainData.level == '쉬움' && (
              <TextBold style={styles.difficultText}>
                이 정도는 산책 그 잡채!
              </TextBold>
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
          <View>
            {mountainData.level == '쉬움' && (
              <Image
                source={require('../../assets/images/easy.png')}
                style={styles.difficultyImage}></Image>
            )}
            {mountainData.level == '중간' && (
              <Image
                source={require('../../assets/images/normal.png')}
                style={styles.difficultyImage}></Image>
            )}
            {mountainData.level == '어려움' && (
              <Image
                source={require('../../assets/images/hard.png')}
                style={styles.difficultyImage}></Image>
            )}
          </View>
        </View>

        {/* 날씨 */}
        <View style={styles.weatherContainer}>
        <TextBold style={styles.weatherTemp}>{Math.round(mountainWeather.main.temp - 272)}</TextBold>
          <View style={styles.weatherHeader}>
          <TextBold style={styles.weatherText}>{mountainWeather.weather[0].main}</TextBold>
          <TextBold style={styles.weatherHumidity}>습도 {mountainWeather.main.humidity}</TextBold>
          </View>
          <Image
            style={styles.weatherImage}
            source={{
              uri: `http://openweathermap.org/img/wn/${mountainWeather.weather[0].icon}.png`,
            }}></Image>
        </View>
      </View>

      {/* 등산로 */}
      <View style={styles.imageContainer}>
        {mountainData.mntnPathImg == 'x' && (
          <View style={styles.nopathImage}>
            <TextBold>등산로 정보 준비중😥</TextBold>
          </View>
        )}
        <Image
          style={styles.pathImage}
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
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textContainer: {
    margin: 10,
    justifyContent: 'center',
  },
  detailTitle: {
    flexDirection: 'row',
  },
  detailBody: {
    flexDirection: 'row'
  },
  difficultyContainer: {
    margin: 10,
    // marginRight: windowWidth * 0.01,
    marginBottom: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B2B2B2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherContainer: {
    marginLeft: 0,
    margin: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B2B2B2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    width: windowWidth * 0.33,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mntnImage: {
    margin: 10,
    height: windowHeight * 0.3,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  mntnTitle: {
    fontSize: 30,
    marginBottom: 10,
  },
  mntnHeight: {
    marginTop: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
    marginRight: windowWidth * 0.2,
  },
  reasonTitle: {
    marginTop: 10,
    color: '#F57328',
    fontSize: 15,
  },
  reason: {
    marginTop: 10,
  },
  region: {
    marginBottom: 10,
  },
  subnm: {
    color: '#367E18',
  },
  detail: {
    marginTop: 10,
  },
  buttonTitle: {
    color: 'white',
  },
  difficultyHeader: {
    flexDirection: 'row',
  },
  difficultyTitle: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 0,
  },
  difficultyContent: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 0,
    color: '#FF6464',
  },
  difficultText: {
    margin: 10,
  },
  difficultyTextContainer: {
    flexDirection: 'column',
  },
  climbingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    backgroundColor: '#91C483',
    height: 40,
    borderRadius: 4,
  },
  pathImage: {
    margin: 10,
    height: windowHeight * 0.3,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  nopathImage: {
    margin: 10,
    height: windowHeight * 0.3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B2B2B2',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    marginTop: 0,
    width: 20,
    height: 20,
  },
  difficultyImage: {
    margin: 10,
    marginRight: 10,
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
  weatherImage: {
    margin: 10,
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
  weatherTemp: {
    fontSize: 30,
    margin: 20,
    marginRight: 10,
  },
  weatherHeader: {
    flexDirection: 'column',
    marginTop: 20,
  },
});
