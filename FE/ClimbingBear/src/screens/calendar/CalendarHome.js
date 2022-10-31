import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, PixelRatio, Alert} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HaveBeenStamp from '../../components/calendar/HaveBeenStamp';
import NotHaveBeenStamp from '../../components/calendar/NotHaveBeenStamp';
import BlankStamp from '../../components/calendar/BlankStamp';
import ModifyDeleteModal from '../../components/calendar/ModifyDeleteModal';
import SearchRegisterModal from '../../components/calendar/SearchRegisterModal';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// dp 를 pixel 로 바꿔주는 모듈 (폰트, 위치 조정할 때 쓰면 될 듯!)
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// 달력 코드
const CalendarHome = ({navigation: {navigate}}) => {
  //오늘 날짜
  const [dateNum, setDateNum] = useState('');
  //수정/삭제 모달 ON/OFF
  const [isModifyDeleteModalVisible, setIsModifyDeleteModalVisible] =
    useState(false);
  //검색/등록 모달 ON/OFF
  const [isSearchRegisterModalVisible, setIsSearchRegisterModalVisible] =
    useState(false);
  //클릭한 날짜
  const [selectedDate, setSelectedDate] = useState('');
  //사용자의 일정에 등록되어있는 산 이름
  const MountainName = '산 이름';

  //달력 내 날짜 컴포넌트... 따로 컴포넌트로 빼서 진행하고 싶은데 calendar 구조를 잘 모르겠어서 어떻게 빼야할지 모르겠다.
  const dayComponent = ({date, state}) => {
    return (
      <View>
        {
          //이번 달이 아닌 날짜 표시
          state === 'disabled' ? (
            <TouchableOpacity>
              <Text style={styles.disableddate}>{date.day}</Text>
              <BlankStamp style={styles.stamp} />
            </TouchableOpacity>
          ) : // 오늘 날짜 표시(임시 : 갔다온 날짜 스탬프)
          dateNum === date.dateString ? (
            <TouchableOpacity
              onPress={() =>
                navigate('CalendarRecord', {
                  date: date.dateString,
                  name: MountainName,
                })
              }>
              <Text style={styles.today}>{date.day}</Text>
              <HaveBeenStamp style={styles.stamp} />
              <Text style={styles.mountainname}>{MountainName}</Text>
            </TouchableOpacity>
          ) : //(임시 : 갈 예정인 날짜 스탬프)
          date.dateString === '2022-11-30' ? (
            <TouchableOpacity
              onPress={() => {
                setIsModifyDeleteModalVisible(!isModifyDeleteModalVisible);
                setSelectedDate(date.dateString);
              }}>
              <Text style={styles.activateddate}>{date.day}</Text>
              <NotHaveBeenStamp style={styles.stamp} />
              <Text style={styles.mountainname}>{MountainName}</Text>
            </TouchableOpacity>
          ) : date.datestring >= dateNum ? (
            //이번 달 날짜 표시
            <TouchableOpacity
              onPress={() => {
                setIsSearchRegisterModalVisible(!isSearchRegisterModalVisible);
                setSelectedDate(date.dateString);
              }}>
              <Text style={styles.activateddate}>{date.day}</Text>
              <BlankStamp />
            </TouchableOpacity>
          ) : (
            //기록이 없는 지난 날짜
            <TouchableOpacity
              onPress={() => {
                Alert.alert("일정을 등록할 수 없거나 기록이 없습니다.")
              }}>
              <Text style={styles.activateddate}>{date.day}</Text>
              <BlankStamp />
            </TouchableOpacity>
          )
        }
      </View>
    );
  };

  //페이지 마운트될 때 오늘 날짜 지정
  useEffect(() => {
    const now = new Date();
    if (now.getMonth() + 1 < 10) {
      setDateNum(
        now.getFullYear() +
          '-0' +
          (now.getMonth() + 1).toString() +
          '-' +
          now.getDate().toString(),
      );
    } else {
      setDateNum(
        now.getFullYear().toString() +
          '-' +
          (now.getMonth() + 1).toString() +
          '-' +
          now.getDate().toString(),
      );
    }
  }, []);

  //달력 요일 헤더 설정
  LocaleConfig.locales['calendarData'] = {
    ...LocaleConfig.locales[''],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  };
  LocaleConfig.defaultLocale = 'calendarData';

  // Calendar 본체
  return (
    <View>
      <View style={styles.content}>
        <Calendar
          //요일 컴포넌트
          dayComponent={dayComponent}
          //달력 월 형식
          monthFormat={'yyyy년 MM월'}
          style={styles.calendar}
          theme={theme}
          //스와이프 기능 사용
          enableSwipeMonths={true}
        />
      </View>
      {/* 일정 삭제/수정 모달 */}
      <ModifyDeleteModal
        isModalVisible={isModifyDeleteModalVisible}
        setIsModalVisible={setIsModifyDeleteModalVisible}
        selected={selectedDate}
        mountainName={MountainName}
      />
      {/* 검색/동록 모달 */}
      <SearchRegisterModal
        isModalVisible={isSearchRegisterModalVisible}
        setIsModalVisible={setIsSearchRegisterModalVisible}
        selected={selectedDate}
      />
      {/* 검색/등록 모달 띄우는 상황이나 수정/삭제 모달 띄우는 상황일 때 페이지 backgroundColor 어둡게 함*/}
      {isModifyDeleteModalVisible || isSearchRegisterModalVisible ? (
        <View style={styles.modalOverlay}></View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CalendarHome;

//Calendar 컴포넌트에서 사용하는 theme
const theme = {
  textMonthFontSize: 30,
  arrowColor: 'black',

  //스타일 오버라이딩
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 30,
      alignItems: 'center',
    },
    dayTextAtIndex0: {
      color: 'red',
    },
    dayTextAtIndex6: {
      color: 'blue',
    },
    dayHeader: {
      fontSize: 20,
    },
    week: {
      marginTop: 50,
      marginBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};

//style 피그마에 맞춰 임의 지정
const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
  },
  calendar: {
    height: heightPixel,
    position: 'relative',
  },
  disableddate: {
    color: 'lightgray',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  activateddate: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  today: {
    backgroundColor: 'green',
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  mountainname: {
    position: 'absolute',
    marginTop: windowHeight * 0.07,
    color: 'white',
    fontSize: 13,
    marginLeft: windowWidth * 0.013,
  },
});
