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
import MapView, {Marker, PROVIDER_GOOGLE, Geojson} from 'react-native-maps';
// 서체 import
import {TextBold, TextMedium} from '../../components/common/TextFont';
// useSelector 을 import 함으로서 우리가 만든 reducer state 에 접근 가능
import {useSelector} from 'react-redux';
// 지도 위에 띄울 버튼 import
import ClimbingButton from './ClimbingButton';
import PlaceTypeButton from '../../components/climbing/PlaceTypeButton';

// (임시) 포인트 찍기 확인용 선언
import tempgwanwakPath from '../../assets/temp/tempgwanwakPath';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {palgongPathData} from '../../assets/temp/PalgongData';

// (임시) 맵타입 바꾸기
// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);
// 이 페이지와 상관없이 지도 검색 gps 는 쓸 수 있어야 하므로 상태 관리 따로 할 예정

// Polyline, MapType 메인에서 받아와야할듯..
const ClimbingMap = ({latitude, longitude}) => {
  // useSelector 로 state 값을 들고오기
  // const latitude = useSelector(state => state.nowclimblocation.latitude);
  // const longitude = useSelector(state => state.nowclimblocation.longitude);
  // 실시간으로 데이터 store 에서 받아오도록 해야 한다

  // 세부장소 띄우는 state 상태, false일 때 안 띄우기
  const [placeType, setPlaceType] = useState(false);
  // mapType 지정할 state
  const [mapType, setMapType] = useState('standard');

  // (임시) 어떻게 Geojson 구성할 지 선언해보고 store 에 정리

  const [features, setFeatures] = useState(null);
  const [pathIndex, setPathIndex] = useState(null);

  const path = [];

  function pathfeature() {
    tempgwanwakPath.features.forEach(item => {
      const feature = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: item.geometry.paths,
            },
            properties: {
              length: item.attributes.PMNTN_LT,
              level: item.attributes.PMNTN_DFFL,
              upmin: item.attributes.PMNTN_UPPL,
              downmin: item.attributes.PMNTN_GODN,
              color: 'rgba(79, 141, 86, 0.5)',
            },
          },
        ],
      };
      path.push(feature);
    });
    setFeatures(path);
  }

  // 등산로 선택하는 함수 (정보 띄우기), 기존에 눌렀던 등산로와 같으면 정보 끄기 (색도)
  function pickPath(payload) {
    if (pathIndex == payload) {
      setPathIndex(null);
      features[payload].features[0].properties.color = 'rgba(79, 141, 86, 0.5)';
    }
    // 그 전에 선택됐던 등산로 선택해제 해야 함
    else {
      features[pathIndex].features[0].properties.color =
        'rgba(79, 141, 86, 0.5)';
      setPathIndex(payload);
      features[payload].features[0].properties.color = 'rgba(154, 31, 31, 0.7)';
    }
  }

  // (임시) 켜자마자 등산로 렌더링
  useEffect(() => {
    pathfeature();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.001,
        }}
        mapType={mapType}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}>
        {/* (임시) 포인트, path 확인용 */}
        {/* Each child in a list should have a unique "key" prop 경고 해결 */}
        {/* {palgongSpotData.map(loc => (
          <Marker coordinate={{latitude: loc.lat, longitude: loc.lng}}>
            <Image
              source={require('../../assets/images/HelgiIcon.png')}
              style={styles.tempmarker}
            />
          </Marker>
        ))} */}
        {features &&
          features.map((item, index) => (
            <Geojson
              geojson={item}
              strokeColor={item.features[0].properties.color}
              strokeWidth={2}
              tappable={true}
              onPress={() => {
                pickPath(index);
              }}
            />
          ))}
      </MapView>
      <ClimbingButton setMapType={setMapType} setPlaceType={setPlaceType} />
      {placeType && <PlaceTypeButton />}
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
    height: windowHeight * 0.65,
    width: windowWidth,
    // position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // (임시) 마커 사이즈 조정
  // 렉이 걸려서 이미지 크기를 낮춰야 할 듯
  tempmarker: {
    height: 15,
    width: 30,
  },
  levelinfo: {
    position: 'absolute',
    fontSize: widthPixel * 0.025,
    right: widthPixel * 0.025,
    top: widthPixel * 0.31,
    color: '#000000',
  },
  pathinfo: {
    flexDirection: 'row',
    paddingHorizontal: widthPixel * 0.05,
    marginRight: widthPixel * 0.03,
    justifyContent: 'space-evenly',
    top: widthPixel * 0.415,
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
