import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
} from 'react-native';
// GPS 모듈 import
import Geolocation from 'react-native-geolocation-service';
// 타이머 import
import BeforeClimbTimer from '../../components/climbing/BeforeClimbTimer';
// 측정 관련 컴포넌트 import
import ClimbingInfo from '../../components/climbing/ClimbingInfo';
import ClimbingMap from '../../components/climbing/ClimbingMap';
import ClimbingAltitude from '../../components/climbing/ClimbingAltitude';

/* 
useSelector 을 import 함으로서 우리가 만든 reducer state 에 접근 가능
useDispatch 를 import 함으로서 우리가 만든 reducer action 사용 가능
*/
import {useSelector, useDispatch} from 'react-redux';
// dispatch 를 쓰기 위해 선언한 actions 을 스토어에서 import
import {nowclimbingActions} from '../../store/Climbing';
import {TouchableOpacity} from 'react-native-gesture-handler';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
/* 
여기는 무조건 앱 시작을 거쳐서 들어오게 되므로 권한 설정이 'granted' 돼있을 것이지만
예외처리로 안돼있을 때 다시 묻도록 해주기 + 거절하면 에러창 띄우기
*/
// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// 캐러셀 관련 설정
const cardSize = {width: windowWidth - 24 * 2, height: 400};
const offset = cardSize.width + 12;

// 캐러셀 만들기 위해 페이지 선언
const mapPages = [
  {
    id: 1,
    pagename: ClimbingMap,
  },
  {
    id: 2,
    pagename: ClimbingAltitude,
  },
];
// 이 페이지와 상관없이 지도 검색 gps 는 쓸 수 있어야 하므로 상태 관리 따로 할 예정
const ClimbingGPS = () => {
  // action 을 들고 올 dispatch 선언
  const dispatch = useDispatch();
  // useSelector 로 state 값을 들고오기
  const latitude = useSelector(state => state.nowclimbing.latitude);
  const longitude = useSelector(state => state.nowclimbing.longitude);
  const climbStatus = useSelector(state => state.nowclimbing.climbStatus);

  // 캐러셀 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 캐러셀 컴포넌트가 한 번에 제 자리 찾아갈 수 있도록
  const snapToOffsets = useMemo(
    () => Array.from(Array(mapPages.length)).map((_, index) => index * offset),
    [mapPages],
  );
  // 맵 종류에 따라 캐러셀 아이콘 띄우는 거 바꾸는 state (false일 때 기본맵, true일 때 고도맵)
  const mapOrAltitude = useRef(false);

  // (수정) 타이머를 하고 내부 export 함수가 실행될 수 있도록 구조를 짜볼까

  // (문제) (수정) 실시간으로 store에 내 위치(gps)를 업데이트 할 수 있도록 설정, 1초마다 위치 재지정
  // useEffect(() => {
  //   Geolocation.watchPosition(
  //     nowPosition => {
  //       const nowLatitude = nowPosition.coords.latitude;
  //       const nowLongitude = nowPosition.coords.longitude;
  //       dispatch(
  //         climbingActions.location({
  //           latitude: nowLatitude,
  //           longitude: nowLongitude,
  //         }),
  //       );
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {interval: 1000},
  //   );
  // }, [])

  // 처음 한 번만 위치 갖고 오는 코드
  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      // 고도는 pos.coords.altitude
      /*
       여기서 등산 기능 전역 위도, 경도 재지정
       store 내부 actions 중에서 선택 (현재는 location 함수) 후 재지정
       */
      dispatch(
        nowclimbingActions.nowMyLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      );
    });
  }, []);

  // 캐러셀 버튼 눌렀을 때 맵 변화
  function scrollNext() {
    if (currentIndex !== mapPages.length - 1) {
      flatListRef.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      mapOrAltitude.current = true;
      setCurrentIndex(1);
    }
  }
  function scrollPrevious() {
    if (currentIndex !== 0) {
      flatListRef.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      mapOrAltitude.current = false;
      setCurrentIndex(0);
    }
  }

  return (
    // climbStatus 가 true 일 때 기록 시작하고 종료할 때 status false 로 되돌리기
    // (수정) styles 를 props 를 받아서 추가할 수 있는 듯 한데.. 추후 수정
    <View style={styles.container}>
      {!climbStatus && <BeforeClimbTimer />}
      {climbStatus && (
        <View>
          <FlatList
            data={mapPages}
            ref={ref => {
              flatListRef = ref;
            }}
            horizontal
            renderItem={({item}) => (
              <item.pagename latitude={latitude} longitude={longitude} />
            )}
            snapToOffsets={snapToOffsets}
            keyExtractor={item => String(item.id)}
            showsHorizontalScrollIndicator={false}
          />
          {mapOrAltitude.current && (
            <View style={styles.changescrollprev}>
              <TouchableOpacity
                onPress={() => {
                  scrollPrevious();
                }}>
                <Image
                  style={styles.arrowleft}
                  source={require('../../assets/images/arrowLeft.png')}
                />
              </TouchableOpacity>
            </View>
          )}
          {!mapOrAltitude.current && (
            <View style={styles.changescrollnext}>
              <TouchableOpacity
                onPress={() => {
                  scrollNext();
                }}>
                <Image
                  style={styles.arrowright}
                  source={require('../../assets/images/arrowRight.png')}
                />
              </TouchableOpacity>
            </View>
          )}
          <ClimbingInfo />
        </View>
      )}
    </View>
  );
};

export default ClimbingGPS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
  },
  // mapcontainer: {
  //   height: windowHeight * 0.6,
  //   width: windowWidth,
  // },
  changescrollnext: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: widthPixel * 0.2,
    right: widthPixel * 0.0001,
  },
  changescrollprev: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: widthPixel * 0.2,
  },
  arrowright: {
    height: widthPixel * 0.05,
    width: widthPixel * 0.05,
  },
  arrowleft: {
    height: widthPixel * 0.05,
    width: widthPixel * 0.05,
  },
});
