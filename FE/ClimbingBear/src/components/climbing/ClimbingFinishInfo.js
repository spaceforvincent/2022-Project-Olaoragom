import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
// 통신
import {postClimbingData} from '../../apis/Climbing';
import SaveEndModal from '../../components/climbing/SaveEndModal';

import {nowclimbingActions} from '../../store/Climbing';

// (수정) style 을 위해 크기 가져 옴
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// 날짜
const today = new Date();

const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1; // 월
const date = today.getDate(); // 날짜

const ClimbingFinishInfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // action 을 들고 올 dispatch 선언
  const dispatch = useDispatch();

  const distance = useSelector(state => state.nowclimbing.distance);
  const dis = Math.ceil(distance);
  const hour = useSelector(state => state.nowclimbing.hour);
  const min = useSelector(state => state.nowclimbing.min);
  const sec = useSelector(state => state.nowclimbing.sec);
  const mntnseq = useSelector(state => state.nowclimbing.mntnseq);
  const time = `${hour}:${min}:${sec}`;

  return (
    <View style={styles.container}>
      <View style={styles.semicontainer}>
        <View>
          <TextMedium style={styles.infotext}>등산 거리</TextMedium>
          <TextMedium style={styles.infotext}>
            {distance.toFixed(2)} km
          </TextMedium>
        </View>
        <View>
          <TextMedium style={styles.infotext}>등산 시간</TextMedium>
          <TextMedium style={styles.infotext}>
            {hour} : {min} : {sec}
          </TextMedium>
        </View>
      </View>
      <TouchableOpacity
        style={styles.infopost}
        onPress={() => {
          // 기록 저장 POST 요청 보내기
          postClimbingData(date, dis, mntnseq, month, time, year),
            setIsModalVisible(true);
          dispatch(
            nowclimbingActions.myClimbStatus({
              climbStatus: false,
            }),
          );
        }}>
        <TextMedium style={styles.infosave}>기록하기</TextMedium>
      </TouchableOpacity>
      <SaveEndModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
};

export default ClimbingFinishInfo;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  semicontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: widthPixel * 0.01,
  },
  infotext: {
    fontSize: widthPixel * 0.024,
    color: '#000000',
    paddingVertical: widthPixel * 0.005,
  },
  infopost: {
    paddingTop: widthPixel * 0.01,
    paddingHorizontal: widthPixel * 0.133,
  },
  infosave: {
    backgroundColor: '#74B49B',
    borderRadius: 15,
    paddingVertical: widthPixel * 0.01,
    paddingHorizontal: widthPixel * 0.025,
    fontSize: widthPixel * 0.02,
    color: '#FFFFFF',
  },
});
