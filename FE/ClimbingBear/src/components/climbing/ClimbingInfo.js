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
// 리덕스 스토어 import
import {useSelector, useDispatch} from 'react-redux';
import {nowclimbingActions} from '../../store/Climbing';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// 일시정지 버튼 payload
const pauseInput = {
  PAUSE: 'pause',
  RESTART: 'restart',
};

const ClimbingInfo = ({altitude, distance, setFinishClimb}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 타이머 위해 지정한 변수들
  const [nowHour, setNowHour] = useState(0);
  const [nowMinutes, setNowMinutes] = useState(0);
  const [nowSeconds, setNowSeconds] = useState(0);
  // 일시정지 구현
  const [pause, setPause] = useState(false);
  function pauseCount(payload) {
    if (pauseInput.PAUSE == payload) {
      setPause(true);
    } else if (pauseInput.RESTART == payload) {
      setPause(false);
    }
  }

  // 타이머 지정 위한 변수
  const nowTime = useRef(0);
  const intervalRef = useRef(null);
  // 숫자 00 지정 위한 함수
  function numberPad(n, width) {
    n = n + '';
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join('0') + n;
  }

  // 일시정지하고 풀었을 때 interval 재지정
  useEffect(() => {
    if (!pause) {
      intervalRef.current = setInterval(() => {
        nowTime.current++;
        // 시간, 분, 초 지정해주기
        setNowSeconds(numberPad(nowTime.current % 60, 2));
        setNowMinutes(numberPad(Math.floor(nowTime.current / 60) % 60, 2));
        setNowHour(numberPad(Math.floor(nowTime.current / 3600), 2));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [pause]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {!pause && <TextBold style={styles.titletextcolor}>등산 </TextBold>}
        {pause && <TextBold style={styles.titletextcolor}>쉬는 </TextBold>}
        <TextBold style={styles.titletext}>중 이에요!</TextBold>
      </View>
      <View style={styles.semicontainer}>
        <View>
          <TextMedium style={styles.climbinfo}>등산 거리</TextMedium>
          <TextMedium style={styles.climbinfonum}>
            {distance.toFixed(2)} km
          </TextMedium>
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
      {!pause && (
        <View style={styles.climbbutton}>
          <TouchableOpacity
            onPress={() => {
              pauseCount(pauseInput.PAUSE);
            }}>
            <TextMedium style={styles.climbbuttontext}>일시 정지</TextMedium>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // snapshot 찍기 위해 status 바꾸기
              setFinishClimb(true);
              dispatch(
                nowclimbingActions.climbTime({
                  hour: nowHour,
                  min: nowMinutes,
                  sec: nowSeconds,
                }),
              );
              navigation.navigate('ClimbingFinish');
            }}>
            <TextMedium style={styles.climbbuttontext}>등산 종료</TextMedium>
          </TouchableOpacity>
        </View>
      )}
      {pause && (
        <View style={styles.climbbutton}>
          <TouchableOpacity
            onPress={() => {
              pauseCount(pauseInput.RESTART);
            }}>
            <TextMedium style={styles.climbbuttontext}>등산 재시작</TextMedium>
          </TouchableOpacity>
        </View>
      )}
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
    paddingVertical: widthPixel * 0.005,
  },
  climbinfonum: {
    // 부모 속성 무시하고 싶을 때 alignSelf
    alignSelf: 'flex-end',
    fontSize: widthPixel * 0.024,
    color: '#000000',
    paddingVertical: widthPixel * 0.005,
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
