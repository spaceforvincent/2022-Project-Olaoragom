import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
// 리덕스 스토어 import
import {useSelector, useDispatch} from 'react-redux';
import {nowclimbingActions} from '../../store/Climbing';
// 서체 import
import {TextExtraBold} from '../../components/common/TextFont';

// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const BeforeClimbTimer = () => {
  // (공부) Vue 에서 computed 와 비슷한 기능
  const nowTime = useRef(1);
  const [time, setTime] = useState(nowTime.current);
  const dispatch = useDispatch();

  useEffect(() => {
    // 등산 상태를 지정해 줄 selector 와 dispatch 선언
    // 타이머
    const interval = setInterval(() => {
      /*
        (수정) useState 가 read-only 라고 떠서 재지정 해줬다
        useMemo 잘 쓰면 될 것 같아서 추후 수정 예정
        */
      if (nowTime.current == 0) {
        clearInterval(interval);
        // 여기서 등산시작이므로 스토어에서 등산 status 를 true 로 바꿔주기
        dispatch(
          nowclimbingActions.myClimbStatus({
            climbStatus: true,
          }),
        );
      } else {
        setTime(time => time - 1);
        nowTime.current--;
      }
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        {/* {time > 0 && (
          <TextExtraBold style={styles.timetext}>{time}</TextExtraBold>
        )} */}
        {time == 0 && (
          <TextExtraBold style={styles.starttext}>
            <TextExtraBold style={styles.textcolor}>등산 </TextExtraBold>
            시작합니다!
          </TextExtraBold>
        )}
      </View>
    </View>
  );
};

export default BeforeClimbTimer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subcontainer: {
    alignItems: 'center',
  },
  timetext: {
    alignItems: 'center',
    fontSize: widthPixel * 0.15,
    color: '#3B4D46',
  },
  starttext: {
    alignItems: 'center',
    fontSize: widthPixel * 0.05,
    color: '#000000',
  },
  textcolor: {
    color: '#74B49B',
  },
});
