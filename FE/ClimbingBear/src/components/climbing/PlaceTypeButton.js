import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PixelRatio,
} from 'react-native';
// 서체 import
import {TextLight} from '../../components/common/TextFont';
import {TextExtraBold} from '../../components/common/TextFont';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const PlaceTypeButton = () => {
  // 처음 등장 시 애니메이션 (내려오기와 각 버튼 Opacity)
  const revealFromTop = useRef(new Animated.Value(0)).current;
  const revealOpacity = useRef(new Animated.Value(0)).current;

  // const helgiOpacity = useRef(new Animated.Value(0.65)).current;
  // const aidkitOpacity = useRef(new Animated.Value(0.65)).current;
  // const toiletOpacity = useRef(new Animated.Value(0.65)).current;
  // const dangerOpacity = useRef(new Animated.Value(0.65)).current;
  // const summitOpacity = useRef(new Animated.Value(0.65)).current;

  // // 버튼 색깔 정하는 ref (초기값 회색 / 비활성화)
  // const [buttonColor, setButtonColor] = useState('rgba(162, 166, 160, 0.65)');
  // 기본 색 : #A2A6A0

  // 장소 버튼 종류
  const PlaceButton = {
    HELGI: {
      type: '5',
      // opacity: helgiOpacity,
      // backgroundColor: '#2B890A',
    },
    AIDKIT: {
      type: '4',
      // opacity: aidkitOpacity,
      // backgroundColor: '#A32543',
    },
    TOILET: {
      type: '2',
      // opacity: toiletOpacity,
      // backgroundColor: '#5C8BC1',
    },
    DANGER: {
      type: '1',
      // opacity: dangerOpacity,
      // backgroundColor: '#D61515',
    },
    SUMMIT: {
      type: '3',
      // opacity: summitOpacity,
      // backgroundColor: '#BBB51E',
    },
  };

  // 시작하자마자 위치 위에서 내려오고 Opacity 조절 (1초 기준)
  Animated.timing(revealFromTop, {
    toValue: heightPixel * 0.006,
    useNativeDriver: true,
    duration: 1000,
  }).start();

  Animated.timing(revealOpacity, {
    toValue: 1,
    useNativeDriver: true,
    duration: 1000,
  }).start();

  // 좌표 바꾸는 건 이 Form 으로! (변수명 바꾸지 말 것)
  const revealFromTopStyle = {
    transform: [{translateY: revealFromTop}],
  };

  // 거점 버튼이 눌렸는지 여부(눌렸을 때 true) 상태 (렌더링이 필요 없을것이므로 ref)
  // const click = useRef(false);
  // (임시) 배경색 바꿔보기
  // const [backColor] = useState(new Animated.Value(0));

  // (수정) 버튼 눌렸을 시 띄우는 게 다른 함수
  function clickPlaceButton(payload) {
    //   // 버튼이 눌리지 않은 상태인데 눌렸을 때 투명도 조절
    if (!click.current) {
      click.current = true;
      //     Animated.timing(backColor, {
      //       toValue: 1,
      //       // duration: 500,
      //       useNativeDriver: true,
      //     }).start();
      //     // Animated.timing(payload.opacity, {
      //     //   toValue: 1,
      //     //   useNativeDriver: true,
      //     //   duration: 500,
      //     // }).start();
    }
    //   // 버튼이 눌린 상태에서 취소할 때 투명도 조절
    else {
      click.current = false;
      //     // (수정) interpolation 애니메이션 주기
      //     Animated.timing(backColor, {
      //       toValue: 0,
      //       // duration: 500,
      //       useNativeDriver: true,
      //     }).start();
      //     console.log('뒷배경 색 코드 black', backColor);
      //     // Animated.timing(payload.opacity, {
      //     //   toValue: 0.65,
      //     //   useNativeDriver: true,
      //     //   duration: 100,
      //     // }).start();
      //     // setButtonColor('#A2A6A0');
    }
  }

  // View 는 Animated 가 적용되지 않으므로 TouchableOpacity 객체 하나 만들어 줘야 한다
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const AnimatedView = Animated.createAnimatedComponent(View);
  return (
    <AnimatedView style={[styles.container, revealFromTopStyle]}>
      <AnimatedView style={[styles.semicontainer, {opacity: revealOpacity}]}>
        {/* <AnimatedTouchable style={{opacity: helgiOpacity}}> */}
        <AnimatedTouchable
          onPress={() => {
            clickPlaceButton(PlaceButton.HELGI);
          }}>
          {/* TouchableOpacity 클릭 시 하이라이트 해제 : activeOpacity={1} */}
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.buttonbackground, {backgroundColor: '#2B890A'}]}>
            <TextLight style={styles.placebutton}>헬기장</TextLight>
          </TouchableOpacity>
        </AnimatedTouchable>
        <AnimatedTouchable>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.buttonbackground, {backgroundColor: '#A32543'}]}
            onPress={() => {
              clickPlaceButton(PlaceButton.AIDKIT);
            }}>
            <TextLight style={styles.placebutton}>구급함</TextLight>
          </TouchableOpacity>
        </AnimatedTouchable>
        <AnimatedTouchable>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.buttonbackground, {backgroundColor: '#5C8BC1'}]}
            onPress={() => {
              clickPlaceButton(PlaceButton.TOILET);
            }}>
            <TextLight style={styles.placebutton}>화장실</TextLight>
          </TouchableOpacity>
        </AnimatedTouchable>
        <AnimatedTouchable>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.buttonbackground, {backgroundColor: '#D61515'}]}
            onPress={() => {
              clickPlaceButton(PlaceButton.DANGER);
            }}>
            <TextLight style={styles.placebutton}>위험</TextLight>
          </TouchableOpacity>
        </AnimatedTouchable>
        <AnimatedTouchable>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.buttonbackground, {backgroundColor: '#BBB51E'}]}
            onPress={() => {
              clickPlaceButton(PlaceButton.SUMMIT);
            }}>
            <TextLight style={styles.placebutton}>정상</TextLight>
          </TouchableOpacity>
        </AnimatedTouchable>
      </AnimatedView>
    </AnimatedView>
  );
};
export default PlaceTypeButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'black',
  },
  // absolute 일 땐 정렬이 안먹힘
  semicontainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: widthPixel * 0.35,
    justifyContent: 'space-evenly',
    // top: heightPixel * 0.008,
    // right: widthPixel * 0.05,
  },
  // 가로로 정렬
  buttonbackground: {
    paddingVertical: widthPixel * 0.003,
    paddingHorizontal: widthPixel * 0.01,
    borderRadius: 15,
  },
  // (수정) 이렇게 하나하나 다 스타일 적용해야하는지 의문
  placebutton: {
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
  },
  aidkitbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#A32543',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  toiletbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#5C8BC1',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  dangerbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#D61515',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
  summitbutton: {
    paddingVertical: widthPixel * 0.004,
    paddingHorizontal: widthPixel * 0.01,
    backgroundColor: '#BBB51E',
    fontSize: widthPixel * 0.015,
    color: '#FFFFFF',
    borderRadius: 15,
  },
});
