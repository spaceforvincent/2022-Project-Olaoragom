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
  PermissionsAndroid,
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

// (임시) 캐러셀 관련 설정
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
  const altitude = useSelector(state => state.nowclimbing.altitude);
  const distance = useSelector(state => state.nowclimbing.distance);
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

  // 내 위치 임시저장할 state
  // (임시) 추후 polyline 위한 빈 리스트 생성하며 없앨 듯, useRef 사용
  const [position, setPosition] = useState([]);

  // watchposition 쓸 watchId
  const watchId = useRef(null);

  // 거리 계산할 함수
  function degreesToRadians(degrees) {
    radians = (degrees * Math.PI) / 180;
    return radians;
  }
  // 위도(3x), 경도(12x) 순서
  function computeDistance(lat1, lon1, lat2, lon2) {
    const startLatRads = degreesToRadians(lat1);
    const startLongRads = degreesToRadians(lon1);
    const destLatRads = degreesToRadians(lat2);
    const destLongRads = degreesToRadians(lon2);

    const Radius = 6371; //지구의 반경(km)
    const distance =
      Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
          Math.cos(startLatRads) *
            Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads),
      ) * Radius;

    return distance;
  }

  // 현재 내 위치를 가져오는 함수
  const getLocation = async () => {
    Geolocation.getCurrentPosition(pos => {
      // (임시) 내가 설정한 위치로 들고옴
      dispatch(
        // nowclimbingActions.nowMyLocation({
        //   latitude: 37.4565095,
        //   longitude: 126.9500385,
        //   altitude: 49,
        // }),
        nowclimbingActions.nowMyLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude,
        }),
      );
    });
  };

  // 위치 실시간 업데이트 함수
  // 움직일 때만 받아 오는 것 확인, interval 지정 / 움직이지 않을 때 조건 필요할 듯
  const getLocationUpdates = async () => {
    watchId.current = Geolocation.watchPosition(
      pos => {
        const nowLatitude = pos.coords.latitude;
        const nowLongitude = pos.coords.longitude;
        const nowAltitude = pos.coords.altitude;
        // (임시) polyline 리스트 만들기
        setPosition([...position, [nowLatitude, nowLongitude]]),
          dispatch(
            nowclimbingActions.nowMyLocation({
              latitude: nowLatitude,
              longitude: nowLongitude,
              altitude: nowAltitude,
            }),
          );
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter: 10,
        interval: 1000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
      },
    );
  };

  useEffect(() => {
    getLocation();
    getLocationUpdates();
  }, []);

  // (임시 / 확인) 위치가 추가될 때 마다 거리 함수 실행
  useEffect(() => {
    if (position.length > 1) {
      const lat1 = position[-2][0];
      const lon1 = position[-2][1];
      const lat2 = position[-1][0];
      const lon2 = position[-1][1];
      const nowDistance = computeDistance(lat1, lon1, lat2, lon2) + distance;
      // dispatch 로 스토어에 저장
      dispatch(
        nowclimbingActions.nowDistance({
          distance: nowDistance,
        }),
      );
    }
  }, [position]);

  // (확인) [position] 이 없어도 호출이 계속 되는건가? -> 되는데 추후 조건 더 줘야할 듯
  // useEffect(() => {
  //   getLocationUpdates();
  // }, [position]);

  // 캐러셀 버튼 눌렀을 때 맵 변화 (다음 버튼 - 고도 그래프로)
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
  // 캐러셀 버튼 눌렀을 때 맵 변화 (이전 버튼 - 등산 지도로)
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
              <item.pagename
                latitude={latitude}
                longitude={longitude}
                altitude={altitude}
                distance={distance}
              />
            )}
            scrollEnabled={false}
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
          <ClimbingInfo altitude={altitude} distance={distance} />
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
  temp: {
    fontSize: 30,
  },
});
