import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';

// useSelector 을 import 함으로서 우리가 만든 reducer state 에 접근 가능
import {useSelector} from 'react-redux';

// (임시) 위치 이동할 위도, 경도 갖고 오기
import {line} from '../../assets/temp/temppolyline';
import {ScrollView} from 'react-native-gesture-handler';

// (논의) Dimensions 창 크기 전역 관리
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// (수정) 일단 altitude 변화에 따라 그래프 그릴 수 있는지 구현 후 실시간 데이터 구현
// (임시) async storage 에 저장하고 가져와야 한다
// (임시) altitude 를 실시간으로 들고 와야 한다
const ClimbingAltitude = ({altitude, distance}) => {
  // // 자동 스크롤 구현
  // const scrollRef = useRef();
  // const num = useRef(1);

  // // (임시) 스타일 지정 위한 임시
  // const top = 100 / (windowHeight * 0.65);
  // const [topY, setTopY] = useState([top * altitude]);

  // const [add, setAdd] = useState([1]);

  // // 타이머 설정으로 1초에 한번씩 위치 변경하도록 요청
  // // 추후에 1초에 한 번씩 위치 데이터 받아오기로 변경하면 될 듯
  // useEffect(() => {
  //   num.current++;

  //   let timer = setInterval(() => {
  //     setNowPosition(line[num.current]);
  //   }, 1000000);

  //   const [lon1, lat1] = position.current;
  //   const [lon2, lat2] = nowPosition;
  //   let newLength = computeDistance(lat1, lon1, lat2, lon2);
  //   if (length) {
  //     newLength = newLength + length;
  //     setLength(newLength);
  //   } else {
  //     setLength(newLength);
  //   }
  //   setAltitude(altitude + 10);

  //   position.current = nowPosition;
  //   // (임시) 스크롤 확인 위한
  //   setAdd([...add, num.current]);
  //   setTopY([...topY, top * altitude]);

  //   return () => clearInterval(timer);
  // }, [nowPosition]);

  return (
    <View style={styles.container}>
      {/* <ScrollView
        // showsHorizontalScrollIndicator={false}
        horizontal={true}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}
        style={styles.scroll}>
        {add.map((item, index) => (
          <View
            key={index}
            style={[{top: topY[index]}, {flexDirection: 'column-reverse'}]}>
            <Text style={styles.temp}>{item}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
};

export default ClimbingAltitude;

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.65,
    width: windowWidth,
    // backgroundColor: 'black',
  },
  temp: {
    fontSize: 15,
  },
  scroll: {
    margin: 40,
    backgroundColor: 'grey',
  },
});
