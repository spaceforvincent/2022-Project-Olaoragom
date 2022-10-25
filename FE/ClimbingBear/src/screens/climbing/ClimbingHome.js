import React, {useEffect, useState, useRef} from 'react';
// (공부) Button 은 커스텀하기 어렵기 때문에 TouchableOpacity 사용
import {
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PixelRatio,
} from 'react-native';
// 자식 컴포넌트에서 navigation 을 사용하기 위한 모듈 import
import {useNavigation} from '@react-navigation/native';
// 서체 import
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

/* 
(논의) Dimensions 창 크기 전역 관리

(공부) 화면 크기는 dp 개념이고 스타일은 px 사용이라 복잡하지만 스타일 반응형으로 해야한다
const {width, height} = 이런 식으로 쓰도록 코드 정리, 픽셀값은 너비로 하나만 정해놔도 될 듯?

(임시) 리액트 네이티브는 height:auto 기능이 없다. 따라서 비율을 구하는 함수를 작성해서 style 을 주거나 라이브러리 사용해야 한다
이미지 쓰는 부분이 별로 없을거 같아서 일단 곰 사진 비율 구해서 상수값으로 넣어뒀다

스타일 디버깅은 배경색 (backgroundColor) 줘서 확인하면 편함
*/
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// dp 를 픽셀로 바꿨음
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
// const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const ClimbingHome = () => {
  // 위에 import 한 모듈로 navigation 선언
  const navigation = useNavigation();
  // 혼자 / 여럿 버튼 누를 때마다 받을 파라미터 선언
  const aloneorTogether = {
    ALONE: 'alone',
    TOGETHER: 'together',
  };
  /* 
  혼자 / 여럿 버튼 선택했을 때 등산 시작 활성화되도록 지정할 상태와 회색 버튼으로 만들 style 상태
  (첫 렌더링 시) true일 때 비활성화이며 회색코드
  (선택 후) false일 때 활성화이며 초록코드

  (공부) 변화했을 때 값을 받아와서 띄워야하므로 useRef 대신 useState 사용
  */
  const [startAble, setStartAble] = useState(true);
  const [startColor, setStartColor] = useState('#D3D3D3');
  // 혼자 / 여럿 선택했을 때 등산 시작 버튼에서 다른 페이지로 라우트 시켜주기 위한 변수 선언
  const checkNavigate = useRef('');
  /* 
  클릭시 opacity 가 변하는 애니메이션 변수 초기값 0.3으로 선언
  opacity 같은 style 은 animated 아니면 적용이 안됨
  */
  const togetherOpacity = useRef(new Animated.Value(0.3)).current;
  const aloneOpacity = useRef(new Animated.Value(0.3)).current;
  // View 는 Animated 가 적용되지 않으므로 TouchableOpacity 객체 하나 만들어 줘야 한다
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  // 누를 때 opacity 변하는 함수 작성
  function togethercheck(payload) {
    // 누르자마자 등산 시작 버튼 활성화 될 것
    setStartAble(false);
    setStartColor('#74B49B');
    if (aloneorTogether.ALONE == payload) {
      // 파라미터에 ALONE 넣어준다
      checkNavigate.current = aloneorTogether.ALONE;
      // 혼자 가는 옵션 활성화
      Animated.timing(aloneOpacity, {
        toValue: 1,
        // 이 옵션이 없으면 WARN 뱉어낸다
        useNativeDriver: true,
      }).start();
      // 여럿이 가는 옵션 비활성화
      Animated.timing(togetherOpacity, {
        toValue: 0.3,
        // 이 옵션이 없으면 WARN 뱉어낸다
        useNativeDriver: true,
      }).start();
    } else {
      // 파라미터에 TOGETHER 넣어준다
      checkNavigate.current = aloneorTogether.TOGETHER;
      // 혼자 가는 옵션 비활성화
      Animated.timing(aloneOpacity, {
        toValue: 0.3,
        // 이 옵션이 없으면 WARN 뱉어낸다
        useNativeDriver: true,
      }).start();
      // 여럿이 가는 옵션 활성화
      Animated.timing(togetherOpacity, {
        toValue: 1,
        // 이 옵션이 없으면 WARN 뱉어낸다
        useNativeDriver: true,
      }).start();
    }
  }
  // 받은 파라미터 값에 따라 다른 페이지로 라우트
  function actualNavigate(payload) {
    if (aloneorTogether.ALONE == payload) {
      navigation.navigate('ClimbingGPS');
    } else {
      navigation.navigate('ClimbCompanyAdd');
    }
  }

  return (
    // 산 이름, 날짜 props로 받아오기
    <View style={styles.container}>
      <View style={styles.infotext}>
        <TextExtraBold style={styles.mountainname}>천생산</TextExtraBold>
        <TextMedium style={styles.todaydate}>2022년 10월 20일</TextMedium>
      </View>
      <View style={styles.imagecheck}>
        <AnimatedTouchable
          onPress={() => togethercheck(aloneorTogether.ALONE)}
          style={[styles.goalone, {opacity: aloneOpacity}]}>
          <Image
            style={styles.climbingbearimage}
            source={require('../../assets/images/ClimbingBear.png')}
            title="ClimbingBear"
          />
          <TextBold style={styles.checktext}>혼자서 갑니다</TextBold>
        </AnimatedTouchable>
        <AnimatedTouchable
          onPress={() => togethercheck(aloneorTogether.TOGETHER)}
          style={[styles.gotogether, {opacity: togetherOpacity}]}>
          <Image
            style={styles.climbingbearimage}
            source={require('../../assets/images/ClimbingBearTogether.png')}
            title="ClimbingBearTogether"
          />
          <TextBold style={styles.checktext}>여럿이 갑니다</TextBold>
        </AnimatedTouchable>
      </View>
      <TouchableOpacity
        style={styles.buttonbackground}
        disabled={startAble}
        onPress={() => actualNavigate(checkNavigate.current)}>
        <View style={[styles.startbutton, {backgroundColor: startColor}]}>
          <TextLight style={styles.startbuttontext}>등산 시작</TextLight>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClimbingHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  infotext: {
    alignItems: 'center',
  },
  mountainname: {
    fontSize: widthPixel * 0.07,
    padding: widthPixel * 0.005,
    color: '#000000',
  },
  todaydate: {
    padding: widthPixel * 0.005,
    fontSize: widthPixel * 0.03,
  },
  imagecheck: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  goalone: {
    alignItems: 'center',
  },
  gotogether: {
    alignItems: 'center',
  },
  checktext: {
    fontSize: widthPixel * 0.027,
    color: '#000000',
  },
  buttonbackground: {
    alignItems: 'center',
  },
  startbutton: {
    padding: widthPixel * 0.015,
    // backgroundColor: '#74B49B',
    borderRadius: 15,
  },
  startbuttontext: {
    fontSize: widthPixel * 0.025,
    color: '#FFFFFF',
  },
  climbingbearimage: {
    resizeMode: 'contain',
    width: widthPixel * 0.16,
    height: widthPixel * 0.16 * 2,
  },
});
