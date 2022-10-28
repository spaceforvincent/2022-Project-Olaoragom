import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HaveBeenStamp from '../../components/calendar/HaveBeenStamp';
import NotHaveBeenStamp from '../../components/calendar/NotHaveBeenStamp';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// dp 를 pixel 로 바꿔주는 모듈 (폰트, 위치 조정할 때 쓰면 될 듯!)
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

const CalendarHome = ({navigation: {navigate}}) => {
  // const [selectedDate, setSelectedDate] = useState(
  //   format(new Date(), 'yyyy-MM-dd'),
  // );
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [dateNum, setDateNum] = useState('');
  const MountainName = '산 이름';

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

  return (
    <View style={styles.content}>
      <Calendar
        markingType={'period'}
        markedDates={{
          [dateNum]: {
            marked: true,
            selected: true,
            dotColor: '#50cebb',
            color: '#50cebb',
            textColor: 'white',
          },
        }}
        //요일 컴포넌트
        dayComponent={({date, state}) => {
          return (
            <View>
              {
                //이번 달이 아닌 날짜 표시
                state === 'disabled' ? (
                  <View>
                    <Text style={styles.disableddate}>{date.day}</Text>
                  </View>
                ) : // 오늘 날짜 표시(임시 : 갔다온 날짜 스탬프)
                dateNum === date.dateString ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigate('CalendarRecord', {
                        date: date.dateString,
                        name: MountainName,
                      })
                    }>
                    <View style={styles.wrapper}>
                      <Text style={styles.today}>{date.day}</Text>
                    </View>
                    <HaveBeenStamp style={styles.stamp} />
                    <Text style={styles.mountainname}>{MountainName}</Text>
                  </TouchableOpacity>
                ) : //(임시 : 갈 예정인 날짜 스탬프)
                date.dateString === '2022-10-30' ? (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(dateNum);
                      console.log(date.dateString);
                      console.log('not today');
                    }}>
                    <View style={styles.datecontainer}>
                      <View>
                        <Text style={styles.activateddate}>{date.day}</Text>
                      </View>
                      <NotHaveBeenStamp style={styles.stamp} />
                      <Text style={styles.mountainname}>{MountainName}</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  //이번 달 날짜 표시
                  <TouchableOpacity
                    onPress={() => {
                      console.log(dateNum);
                      console.log(date.dateString);
                      console.log('not today');
                    }}>
                    <View>
                      <Text style={styles.activateddate}>{date.day}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            </View>
          );
        }}
        monthFormat={'yyyy. MM'}
        style={styles.calendar}
        theme={{
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
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
          'stylesheet.calendar.main': {
            dayContainer: {
              padding: 20,
              textAlign: 'center',
            },
          },
        }}
        enableSwipeMonths={true}
      />
    </View>
  );
};

export default CalendarHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  calendar: {
    height: heightPixel,
  },
  disableddate: {
    color: 'lightgray',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  activateddate: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 20,
  },
  today: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  mountainname: {
    position: 'absolute',
    marginTop: 62,
    color: 'white',
    fontSize: 10,
    marginLeft: 7,
  },
  wrapper: {
    backgroundColor: 'green',
    width: 30,
    textAlign: 'center',
  },
  stamp: {
    position: 'absolute',
  },
});
