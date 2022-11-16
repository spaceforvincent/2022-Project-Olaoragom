import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
// 지도 모듈 import
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Geojson,
  Polyline,
} from 'react-native-maps';
// 스냅샷 저장할 async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// 서체 import
import {TextBold, TextMedium} from '../../components/common/TextFont';

// useSelector 을 import 함으로서 우리가 만든 reducer state 에 접근 가능
import {useSelector, useDispatch} from 'react-redux';
import {nowclimbingActions, nowclimbingSlice} from '../../store/Climbing';

// 지도 위에 띄울 버튼 import
import ClimbingButton from './ClimbingButton';
import PlaceTypeButton from '../../components/climbing/PlaceTypeButton';

// (임시) 스팟 데이터 띄우기
import new_spot_data from '../../assets/temp/new_spot_data.json';

// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);
// 이 페이지와 상관없이 지도 검색 gps 는 쓸 수 있어야 하므로 상태 관리 따로 할 예정

// Polyline, MapType 메인에서 받아와야할듯..
const ClimbingMap = ({latitude, longitude, position, finishClimb}) => {
  // useSelector 로 state 값을 들고오기

  // 등산로 들고오기
  const JSON_URL =
    'https://storage.googleapis.com/climbingbear/new_path_data.json';

  async function funcRequest(url) {
    await fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const pathData = data;
        setFeatures(pathData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 세부장소 띄우는 state 상태, false일 때 안 띄우기
  const [placeType, setPlaceType] = useState(false);
  // mapType 지정할 state
  const [mapType, setMapType] = useState('standard');

  // (임시) 어떻게 Geojson 구성할 지 선언해보고 store 에 정리

  const [features, setFeatures] = useState(null);
  const [pathIndex, setPathIndex] = useState(null);

  const [placeButton, setPlaceButton] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    funcRequest(JSON_URL);
  }, []);

  // 등산로 선택하는 함수 (정보 띄우기), 기존에 눌렀던 등산로와 같으면 정보 끄기 (색도)
  function pickPath(payload) {
    if (pathIndex != null && pathIndex == payload) {
      setPathIndex(null);
      features[payload].features[0].properties.color = 'rgba(79, 141, 86, 0.5)';
    }
    // 그 전에 선택됐던 등산로 선택해제 해야 하고 중복 선택되면 안된다
    else if (pathIndex != null && pathIndex != payload) {
      features[pathIndex].features[0].properties.color =
        'rgba(79, 141, 86, 0.5)';
      setPathIndex(payload);
      features[payload].features[0].properties.color = 'rgba(154, 31, 31, 0.7)';
    } else {
      setPathIndex(payload);
      features[payload].features[0].properties.color = 'rgba(154, 31, 31, 0.7)';
    }
  }

  // 스냅샷 찍는 함수
  function takeSnapshot() {
    const snapshot = map.takeSnapshot({
      width: 300,
      height: 350,
      format: 'png',
      result: 'file',
    });
    snapshot.then(uri => {
      const save = async () => {
        await AsyncStorage.setItem('uri', uri);
        dispatch(
          nowclimbingActions.mapSnapshot({
            uri: uri,
          }),
        );
      };
      save();
    });
  }

  {
    finishClimb && takeSnapshot();
  }

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.001,
        }}
        mapType={mapType}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        ref={map => {
          this.map = map;
        }}>
        {/* Each child in a list should have a unique "key" prop 경고 해결 */}
        {placeButton == 'TOILET' &&
          new_spot_data.map(
            (item, idx) =>
              item.geometry &&
              item.type == '화장실' &&
              item.geometry.map((loc, idx) => (
                <Marker coordinate={{latitude: loc.lat, longitude: loc.lon}}>
                  <Image
                    source={require('../../assets/images/ToiletIcon.png')}
                    style={styles.tempmarker}
                  />
                </Marker>
              )),
          )}
        {placeButton == 'DANGER' &&
          new_spot_data.map((item, idx) => {
            item.type == '위험지역' &&
              item.geometry &&
              item.geometry.map((loc, idx) => (
                <Marker coordinate={{latitude: loc.lat, longitude: loc.lon}}>
                  <Image
                    source={require('../../assets/images/DangerIcon.png')}
                    style={styles.tempmarker}
                  />
                </Marker>
              ));
          })}
        {placeButton == 'HELGI' &&
          new_spot_data.map((item, idx) => {
            item.type == '헬기장' &&
              item.geometry &&
              item.geometry.map((loc, idx) => (
                <Marker coordinate={{latitude: loc.lat, longitude: loc.lon}}>
                  <Image
                    source={require('../../assets/images/HelgiIcon.png')}
                    style={styles.tempmarker}
                  />
                </Marker>
              ));
          })}
        {placeButton == 'SUMMIT' &&
          new_spot_data.map(
            (item, idx) =>
              item.type == '정상' &&
              item.geometry &&
              item.geometry.map((loc, idx) => (
                <Marker coordinate={{latitude: loc.lat, longitude: loc.lon}}>
                  <Image
                    source={require('../../assets/images/FlagIcon.png')}
                    style={styles.tempmarker}
                  />
                </Marker>
              )),
          )}
        <Polyline
          coordinates={position}
          strokeColor="#2E64FE"
          strokeWidth={5}
        />
        {features &&
          features.map((item, index) => (
            <Geojson
              geojson={item}
              key={index}
              strokeColor={item.features[0].properties.color}
              strokeWidth={3}
              tappable={true}
              onPress={() => {
                pickPath(index);
              }}
            />
          ))}
      </MapView>
      <ClimbingButton
        setMapType={setMapType}
        setPlaceType={setPlaceType}
        setPlaceButton={setPlaceButton}
      />
      {placeType && <PlaceTypeButton setPlaceButton={setPlaceButton} />}
      {pathIndex != null && (
        <TextBold style={styles.levelinfo}>
          {features[pathIndex].features[0].properties.level}
        </TextBold>
      )}
      {pathIndex != null && (
        <View style={styles.pathinfo}>
          <View style={styles.semipathinfo}>
            <TextBold style={styles.pathinfotext}>구간 길이</TextBold>
            <TextMedium style={styles.pathinfotext}>
              {features[pathIndex].features[0].properties.length} km
            </TextMedium>
          </View>
          <View style={styles.semipathinfo}>
            <TextBold style={styles.pathinfotext}>상행 시간</TextBold>
            <TextMedium style={styles.pathinfotext}>
              {features[pathIndex].features[0].properties.upmin} 분
            </TextMedium>
          </View>
          <View style={styles.semipathinfo}>
            <TextBold style={styles.pathinfotext}>하행 시간</TextBold>
            <TextMedium style={styles.pathinfotext}>
              {features[pathIndex].features[0].properties.downmin} 분
            </TextMedium>
          </View>
        </View>
      )}
    </View>
  );
};

export default ClimbingMap;

const styles = StyleSheet.create({
  // (임시) MapView 띄우는 확인 위한 공식 문서 style 에 dimensions 추가해서 화면 꽉 채우도록 설정
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: windowHeight * 0.55,
    width: windowWidth,
    // position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // (임시) 마커 사이즈 조정
  // 렉이 걸려서 이미지 크기를 낮춰야 할 듯
  tempmarker: {
    height: 25,
    width: 20,
  },
  levelinfo: {
    position: 'absolute',
    fontSize: widthPixel * 0.025,
    right: widthPixel * 0.025,
    top: widthPixel * 0.28,
    color: '#000000',
  },
  pathinfo: {
    flexDirection: 'row',
    paddingHorizontal: widthPixel * 0.05,
    marginRight: widthPixel * 0.03,
    justifyContent: 'space-evenly',
    top: widthPixel * 0.35,
  },
  pathinfotext: {
    fontSize: widthPixel * 0.017,
    color: '#000000',
  },
  semipathinfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
