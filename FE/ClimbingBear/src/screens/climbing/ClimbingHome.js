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
  Alert,
} from 'react-native';
// 자식 컴포넌트에서 navigation 을 사용하기 위한 모듈 import
import {useNavigation} from '@react-navigation/native';
// GPS 모듈 import
import Geolocation from '@react-native-community/geolocation';
// 서체 import
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
import {useSelector, useDispatch} from 'react-redux';
import {nowclimbingActions, nowclimbingSlice} from '../../store/Climbing';
// 통신 코드
import {getMountainDetail} from '../../apis/Map';

/* 
(논의) Dimensions 창 크기 전역 관리

(공부) 화면 크기는 dp 개념이고 스타일은 px 사용이라 복잡하지만 스타일 반응형으로 해야한다
const {width, height} = 이런 식으로 쓰도록 코드 정리, 픽셀값은 너비로 하나만 정해놔도 될 듯?

(임시) 리액트 네이티브는 height:auto 기능이 없다. 따라서 비율을 구하는 함수를 작성해서 style 을 주거나 라이브러리 사용해야 한다
이미지 쓰는 부분이 별로 없을거 같아서 일단 곰 사진 비율 구해서 상수값으로 넣어뒀다

스타일 디버깅은 배경색 (backgroundColor) 줘서 확인하면 편함
*/
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// dp 를 픽셀로 바꿨음
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// 날짜
const today = new Date();

const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1; // 월
const date = today.getDate(); // 날짜

const ClimbingHome = ({route}) => {
  const mntnId = route.params.mntnId;

  // action 을 들고 올 dispatch 선언
  const dispatch = useDispatch();
  const mntnseq = useSelector(state => state.nowclimbing.mntnseq);
  const mntnname = useSelector(state => state.nowclimbing.mntnname);

  function currentPosition() {
    Geolocation.getCurrentPosition(pos => {
      // (임시) 내가 설정한 위치로 들고옴
      dispatch(
        nowclimbingActions.nowMyLocation({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        }),
      );
    });
  }

  dispatch(
    nowclimbingActions.getMntnId({
      mntnseq: mntnId,
    }),
  );

  useEffect(() => {
    currentPosition();
    const initialData = async () => {
      const response = await getMountainDetail(mntnId);
      const name = response.mntnNm;
      dispatch(
        nowclimbingActions.getMntnName({
          mntnname: name,
        }),
      );
    };
    initialData();
  }, []);

  // 위에 import 한 모듈로 navigation 선언
  const navigation = useNavigation();
  // 혼자 / 여럿 버튼 누를 때마다 받을 파라미터 선언
  const aloneorTogether = {
    ALONE: 'alone',
    TOGETHER: 'together',
  };

  return (
    <View style={styles.container}>
      <View style={styles.infotext}>
        <TextExtraBold style={styles.mountainname}>{mntnname}</TextExtraBold>
        <TextMedium style={styles.todaydate}>
          {year}년 {month}월 {date}일
        </TextMedium>
      </View>
      <Image
        style={styles.climbingbearimage}
        source={require('../../assets/images/ClimbingBear.png')}
        title="ClimbingBear"
      />
      <TouchableOpacity
        style={styles.buttonbackground}
        onPress={() => navigation.navigate('ClimbingGPS')}>
        {/* (수정) 여기서 Get 요청으로 정보 다 들고 와야 한다 */}
        <View style={[styles.startbutton]}>
          <TextLight style={styles.startbuttontext}>등산 시작</TextLight>
        </View>
      </TouchableOpacity>
    </View>
  );
};
// C:\Users\ssafy\Project\Third Project\S07P31D109\FE\ClimbingBear\src\screens\climbing\ClimbingHome.js
export default ClimbingHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
  },
  infotext: {
    alignItems: 'center',
  },
  mountainname: {
    fontSize: widthPixel * 0.065,
    padding: widthPixel * 0.005,
    color: '#000000',
  },
  todaydate: {
    padding: widthPixel * 0.005,
    fontSize: widthPixel * 0.03,
  },
  checktext: {
    fontSize: widthPixel * 0.027,
    color: '#000000',
  },
  buttonbackground: {
    marginHorizontal: widthPixel * 0.13,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#74B49B',
  },
  startbutton: {
    padding: widthPixel * 0.015,

    borderRadius: 15,
  },
  startbuttontext: {
    fontSize: widthPixel * 0.025,
    color: '#FFFFFF',
  },
  climbingbearimage: {
    resizeMode: 'contain',
    width: widthPixel * 0.2,
    height: widthPixel * 0.16 * 2,
    alignSelf: 'center',
  },
});
