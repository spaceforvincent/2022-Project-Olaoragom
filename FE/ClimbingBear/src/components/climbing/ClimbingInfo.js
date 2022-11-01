import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

// 서체 import
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../common/TextFont';

// 자식 컴포넌트에서 navigation 을 사용하기 위한 모듈 import
import {useNavigation} from '@react-navigation/native';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const ClimbingInfo = ({altitude, distance}) => {
  const navigation = useNavigation();

  // 타이머 위해 지정한 변수들
  const [nowHour, setNowHour] = useState(0);
  const [nowMinutes, setNowMinutes] = useState(0);
  const [nowSeconds, setNowSeconds] = useState(0);
  // 일시정지 구현
  const pause = useRef(false);

  const nowTime = useRef(0);

  // 렌더링 되자마자 시작
  useEffect(() => {
    // interval 1초로 지정해서 시간 재기
    const interval = setInterval(() => {
      if (pause.current) {
        clearInterval(interval);
      } else {
        nowTime.current++;
        // 시간, 분, 초 지정해주기
        setNowSeconds(nowTime.current % 60);
        setNowMinutes(Math.floor(nowTime.current / 60) % 60);
        setNowHour(Math.floor(nowTime.current / 3600));
      }
    }, 1000);
    // 일시정지를 눌렀을 때 (true)
  }, [pause]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextBold style={styles.titletextcolor}>등산 </TextBold>
        <TextBold style={styles.titletext}>중 이에요!</TextBold>
      </View>
      <View style={styles.semicontainer}>
        <View>
          <TextMedium style={styles.climbinfo}>등산 거리</TextMedium>
          <TextMedium style={styles.climbinfonum}>{distance} km</TextMedium>
        </View>
        <View>
          <TextMedium style={styles.climbinfo}>누적 시간</TextMedium>
          <TextMedium style={styles.climbinfonum}>
            {nowHour}:{nowMinutes}:{nowSeconds}
          </TextMedium>
        </View>
        <View>
          <TextMedium style={styles.climbinfo}>현재 고도</TextMedium>
          <TextMedium style={styles.climbinfonum}>
            {Math.round(altitude, 0)} m
          </TextMedium>
        </View>
      </View>
      <View style={styles.climbbutton}>
        <TouchableOpacity>
          <TextMedium style={styles.climbbuttontext}>일시 정지</TextMedium>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ClimbingFinish')}>
          <TextMedium style={styles.climbbuttontext}>등산 종료</TextMedium>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClimbingInfo;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: windowHeight * 0.4,
    width: windowWidth,
    paddingHorizontal: widthPixel * 0.025,
  },
  title: {
    flexDirection: 'row',
  },
  titletextcolor: {
    fontSize: widthPixel * 0.035,
    color: '#74B49B',
  },
  titletext: {
    fontSize: widthPixel * 0.035,
    color: '#000000',
  },
  semicontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  climbinfo: {
    fontSize: widthPixel * 0.025,
    color: '#000000',
  },
  climbinfonum: {
    // 부모 속성 무시하고 싶을 때 alignSelf
    alignSelf: 'flex-end',
    fontSize: widthPixel * 0.025,
    color: '#000000',
  },
  climbbutton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  climbbuttontext: {
    backgroundColor: '#74B49B',
    borderRadius: 15,
    paddingVertical: widthPixel * 0.01,
    paddingHorizontal: widthPixel * 0.025,
    fontSize: widthPixel * 0.02,
    color: '#FFFFFF',
  },
});
