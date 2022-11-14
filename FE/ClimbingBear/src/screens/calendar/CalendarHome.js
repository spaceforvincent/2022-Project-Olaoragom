import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Alert,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HaveBeenStamp from '../../components/calendar/HaveBeenStamp';
import NotHaveBeenStamp from '../../components/calendar/NotHaveBeenStamp';
import BlankStamp from '../../components/calendar/BlankStamp';
import ModifyDeleteModal from '../../components/calendar/ModifyDeleteModal';
import SearchRegisterModal from '../../components/calendar/SearchRegisterModal';
import IconLeft from '../../components/calendar/ArrowLeft';
import IconRight from '../../components/calendar/ArrowRight';
import ToastMessage from '../../components/calendar/ToastMessage';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//오늘 날짜
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

// dp 를 pixel 로 바꿔주는 모듈 (폰트, 위치 조정할 때 쓰면 될 듯!)
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

// 달력 코드
function CalendarHome({navigation: {navigate}}) {
  //예약된 날짜
  const [bookedDate, setBookedDate] = useState([]);
  //실제 갔다온 날짜
  const [havebeenDate, setHaveBeenDate] = useState([]);
  //토스트 메시지 내용 리스트
  const toastMsgList = {
    Delete: '삭제가 완료되었습니다.',
    Register: '일정이 등록되었습니다.',
  };
  // 일정 수정(수정/삭제 모달 -> 일정 변경 버튼 누름) 상태 ON/OFF
  const [modifyState, setModifyState] = useState(false);
  //수정/삭제 모달 ON/OFF
  const [isModifyDeleteModalVisible, setIsModifyDeleteModalVisible] =
    useState(false);
  //검색/등록 모달 ON/OFF
  const [isSearchRegisterModalVisible, setIsSearchRegisterModalVisible] =
    useState(false);
  // 토스트 메세지 ON/OFF
  const [isToast, setIsToast] = useState(false);
  //클릭한 날짜
  const [selectedDate, setSelectedDate] = useState('');
  //클릭한 날짜의 산
  const [selectedMountain, setSelectedMountain] = useState('');
  // 오늘 날짜
  const [dateNum, setDateNum] = useState('');
  // 토스트 메세지 내용 변경
  const [toastMsg, setToastMsg] = useState('');
  //페이지 마운트될 때 오늘 날짜 지정
  useLayoutEffect(() => {
    loadSchedule();
    setDateNum(
      year +
        '-' +
        ('00' + month.toString()).slice(-2) +
        '-' +
        ('00' + day.toString()).slice(-2),
    );
    if (isToast) {
      setTimeout(() => {
        setIsToast(false);
        setToastMsg('');
      }, 1000);
    }
  }, [isToast]);

  //토스트 메시지 기능 사용
  const handleToast = type => {
    if (!isToast) {
      setToastMsg(toastMsgList[type]);
      setIsToast(true);
    }
  };

  //누른 날짜와 비교할 날짜 배열(실제 갔다온 날짜, 예약되어있는 날짜) 만들기
  const makeDateArr = list => {
    let newArr = [];
    for (i = 0; i < Object.keys(list).length; i++) {
      let value = Object.values(list)[i].date;
      newArr.push(value);
    }
    return newArr;
  };

  //날짜 표기 형식 변경
  const changeDateFormat = date => {
    let newDate = date.replace('-', '년 ').replace('-', '월 ') + '일';
    return newDate;
  };

  //검색/등록 모달로부터 스케쥴 받아와서 저장 or 수정
  const getSchedule = async (selected, obj) => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    let copyArray = [...bookedDate];
    if (modifyState) {
      try {
        const response = await axios({
          method: 'put',
          url: `http://k7d109.p.ssafy.io:8080/diary`,
          headers: {
            Authorization: accessToken,
          },
          data: {
            day: Number(selected.slice(10, 12)),
            recordSeq: Number(
              bookedDate.find(
                record => changeDateFormat(record.date) === selected,
              ).diarySeq,
            ),
            mntnSeq: Number(obj.mntnSeq),
            month: Number(selected.slice(6, 8)),
            year: Number(selected.slice(0, 4)),
          },
        });
        setModifyState(false);
        loadSchedule();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios({
          method: 'post',
          url: `http://k7d109.p.ssafy.io:8080/diary`,
          headers: {
            Authorization: accessToken,
          },
          data: {
            day: Number(selected.slice(10, 12)),
            mntnSeq: Number(obj.mntnSeq),
            month: Number(selected.slice(6, 8)),
            year: Number(selected.slice(0, 4)),
          },
        });
        loadSchedule();
      } catch (error) {
        console.log(error);
      }
    }
  };
  //DB에서 일정 삭제
  const deleteSchedule = async date => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    try {
      const response = await axios({
        method: 'delete',
        url: `http://k7d109.p.ssafy.io:8080/diary`,
        headers: {
          Authorization: accessToken,
        },
        params: {
          diarySeq: bookedDate.find(
            record => changeDateFormat(record.date) === date,
          ).diarySeq,
        },
      });
      loadSchedule();
    } catch (error) {
      console.log(error);
    }
  };
  //DB에서 일정 가져오기
  const loadSchedule = async () => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    let bookedArr = [];
    let havebeenArr = [];
    try {
      const response = await axios({
        method: 'get',
        url: `http://k7d109.p.ssafy.io:8080/diary`,
        headers: {
          Authorization: accessToken,
        },
      });
      response.data.data.map(record => {
        if (record.complete) {
          havebeenArr.push({
            mountainName: record.mntnNm,
            date:
              record.year +
              '-' +
              ('00' + record.month).slice(-2) +
              '-' +
              ('00' + record.day).slice(-2),
            diarySeq: record.diarySeq,
            time: record.time,
            distance: record.distance,
            complete: record.complete,
          });
        } else {
          bookedArr.push({
            mountainName: record.mntnNm,
            date:
              record.year +
              '-' +
              ('00' + record.month).slice(-2) +
              '-' +
              ('00' + record.day).slice(-2),
            diarySeq: record.diarySeq,
            time: record.time,
            distance: record.distance,
            complete: record.complete,
          });
        }
      });
      setBookedDate(bookedArr);
      setHaveBeenDate(havebeenArr);
    } catch (error) {
      console.log(error);
    }
  };

  //달력 내 날짜와의 상호작용을 위한 컴포넌트
  const dayComponent = ({date, state}) => {
    return (
      <View>
        {
          //이번 달이 아닌 날짜 표시
          state === 'disabled' ? (
            <TouchableOpacity>
              <TextMedium style={styles.disableddate}>{date.day}</TextMedium>
              <BlankStamp style={styles.stamp} />
            </TouchableOpacity>
          ) : // 오늘 날짜 표시(등산 완료)
          dateNum === date.dateString &&
            makeDateArr(havebeenDate).includes(date.dateString) ? (
            <TouchableOpacity
              //등산 기록 페이지로 이동
              onPress={() =>
                navigate('CalendarRecord', {
                  date: changeDateFormat(date.dateString),
                  name: havebeenDate.find(
                    record => record.date === date.dateString,
                  ).mountainName,
                  time: havebeenDate.find(
                    record => record.date === date.dateString,
                  ).time,
                  distance: havebeenDate.find(
                    record => record.date === date.dateString,
                  ).distance,
                })
              }>
              <TextMedium style={styles.wenttoday}>{date.day}</TextMedium>
              <HaveBeenStamp style={styles.stamp} />
              {havebeenDate.find(record => record.date === date.dateString)
                .mountainName.length == 3 ? (
                <TextMedium style={styles.mountainname}>
                  {
                    havebeenDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : havebeenDate.find(record => record.date === date.dateString)
                  .mountainName.length == 2 ? (
                <TextMedium style={styles.shortmountainname}>
                  {
                    havebeenDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : (
                <TextMedium style={styles.longmountainname}>
                  {
                    havebeenDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              )}
            </TouchableOpacity>
          ) : //오늘 날짜 표시(등산 미완료)
          dateNum === date.dateString &&
            makeDateArr(bookedDate).includes(date.dateString) ? (
            <TouchableOpacity
              onPress={() => {
                //일정 수정/삭제 모달 띄움
                setIsModifyDeleteModalVisible(!isModifyDeleteModalVisible);
                setSelectedDate(changeDateFormat(date.dateString));
                //모달에서 갈 예정인 산 보여줄 용도로 산 이름 보내줌
                setSelectedMountain(
                  bookedDate.find(record => record.date === date.dateString)
                    .mountainName,
                );
              }}>
              <TextMedium style={styles.wenttoday}>{date.day}</TextMedium>
              <NotHaveBeenStamp style={styles.stamp} />
              {bookedDate.find(record => record.date === date.dateString)
                .mountainName.length == 3 ? (
                <TextMedium style={styles.mountainname}>
                  {
                    bookedDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : bookedDate.find(record => record.date === date.dateString)
                  .mountainName.length == 2 ? (
                <TextMedium style={styles.shortmountainname}>
                  {
                    bookedDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : (
                <TextMedium style={styles.longmountainname}>
                  {
                    bookedDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              )}
            </TouchableOpacity>
          ) : //오늘 날짜 표시(아무 일정 없음)
          dateNum === date.dateString ? (
            <TouchableOpacity>
              <TextMedium style={styles.today}>{date.day}</TextMedium>
            </TouchableOpacity>
          ) : //실제 갔다온 날짜 스탬프
          makeDateArr(havebeenDate).includes(date.dateString) ? (
            <TouchableOpacity
              //등산 기록 페이지로 이동
              onPress={() =>
                navigate('CalendarRecord', {
                  date: changeDateFormat(date.dateString),
                  name: havebeenDate.find(
                    record => record.date === date.dateString,
                  ).mountainName,
                  time: havebeenDate.find(
                    record => record.date === date.dateString,
                  ).time,
                  distance: havebeenDate.find(
                    record => record.date === date.dateString,
                  ).distance,
                })
              }>
              <TextMedium style={styles.activateddate}>{date.day}</TextMedium>
              <HaveBeenStamp style={styles.stamp} />
              {havebeenDate.find(record => record.date === date.dateString)
                .mountainName.length == 3 ? (
                <TextMedium style={styles.mountainname}>
                  {
                    havebeenDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : havebeenDate.find(record => record.date === date.dateString)
                  .mountainName.length == 2 ? (
                <TextMedium style={styles.shortmountainname}>
                  {
                    havebeenDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : (
                <TextMedium style={styles.longmountainname}>
                  {
                    havebeenDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              )}
            </TouchableOpacity>
          ) : //갈 예정인 날짜 스탬프
          bookedDate && makeDateArr(bookedDate).includes(date.dateString) ? (
            <TouchableOpacity
              onPress={() => {
                //일정 수정/삭제 모달 띄움
                setIsModifyDeleteModalVisible(!isModifyDeleteModalVisible);
                setSelectedDate(changeDateFormat(date.dateString));
                //모달에서 갈 예정인 산 보여줄 용도로 산 이름 보내줌
                setSelectedMountain(
                  bookedDate.find(record => record.date === date.dateString)
                    .mountainName,
                );
              }}>
              <TextMedium style={styles.activateddate}>{date.day}</TextMedium>
              <NotHaveBeenStamp style={styles.stamp} />
              {bookedDate.find(record => record.date === date.dateString)
                .mountainName.length == 3 ? (
                <TextMedium style={styles.mountainname}>
                  {
                    bookedDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : bookedDate.find(record => record.date === date.dateString)
                  .mountainName.length == 2 ? (
                <TextMedium style={styles.shortmountainname}>
                  {
                    bookedDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              ) : (
                <TextMedium style={styles.longmountainname}>
                  {
                    bookedDate.find(record => record.date === date.dateString)
                      .mountainName
                  }
                </TextMedium>
              )}
            </TouchableOpacity>
          ) : //일정 예약 가능한 날짜일 때 (누른 날짜가 오늘 날짜의 달과 같고 일이 클 때, 혹은 누른 날짜가 오늘 날짜의 달보다 클 때)
          (Number(date.dateString.slice(5, 7)) == Number(dateNum.slice(5, 7)) &&
              Number(date.dateString.slice(8, 10)) >
                Number(dateNum.slice(8, 10))) ||
            Number(date.dateString.slice(5, 7)) >
              Number(dateNum.slice(5, 7)) ? (
            <TouchableOpacity
              onPress={() => {
                //검색/등록 모달 띄움
                setIsSearchRegisterModalVisible(!isSearchRegisterModalVisible);
                setSelectedDate(changeDateFormat(date.dateString));
              }}>
              <TextMedium style={styles.activateddate}>{date.day}</TextMedium>
              <BlankStamp />
            </TouchableOpacity>
          ) : (
            //등산 기록이 없는 지난 날짜
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  '잘못된 접근',
                  '일정을 등록할 수 없거나 기록이 없습니다.',
                );
              }}>
              <TextMedium style={styles.activateddate}>{date.day}</TextMedium>
              <BlankStamp />
            </TouchableOpacity>
          )
        }
      </View>
    );
  };

  //달력 요일 헤더 설정
  LocaleConfig.locales['calendarData'] = {
    ...LocaleConfig.locales[''],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  };
  LocaleConfig.defaultLocale = 'calendarData';

  // Calendar 본체
  return (
    <View style={styles.container}>
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
          //달력 넘기는 화살표
          renderArrow={direction =>
            direction === 'left' ? <IconLeft /> : <IconRight />
          }
        />
      </View>
      {/* 일정 삭제/수정 모달 */}
      <ModifyDeleteModal
        isModalVisible={isModifyDeleteModalVisible}
        setIsModalVisible={setIsModifyDeleteModalVisible}
        isSearchRegisterModalVisible={isSearchRegisterModalVisible}
        setIsSearchRegisterModalVisible={setIsSearchRegisterModalVisible}
        isToast={isToast}
        setIsToast={setIsToast}
        modifyState={modifyState}
        setModifyState={setModifyState}
        selected={selectedDate}
        mountainName={selectedMountain}
        bookedDate={bookedDate}
        deleteSchedule={deleteSchedule}
        handleToast={handleToast}
        setToastMsg={setToastMsg}
      />
      {/* 검색/동록 모달 */}
      <SearchRegisterModal
        isModalVisible={isSearchRegisterModalVisible}
        setIsModalVisible={setIsSearchRegisterModalVisible}
        bookedDate={bookedDate}
        selected={selectedDate}
        getSchedule={getSchedule}
        handleToast={handleToast}
        setModifyState={setModifyState}
        isToast={isToast}
        setIsToast={setIsToast}
        setToastMsg={setToastMsg}
      />
      {/* 토스트 메세지 */}
      {isToast && <ToastMessage message={toastMsg} />}
      {/*검색/등록 모달 띄우는 상황이나 수정/삭제 모달 띄우는 상황일 때 페이지 backgroundColor 어둡게 함*/}
      {isModifyDeleteModalVisible || isSearchRegisterModalVisible ? (
        <View style={styles.modalOverlay}></View>
      ) : (
        <></>
      )}
    </View>
  );
}

export default CalendarHome;

//Calendar 컴포넌트에서 사용하는 theme
const theme = {
  textMonthFontSize: 30,
  arrowColor: 'black',

  //스타일 오버라이딩
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: windowHeight * 0.025,
      alignItems: 'center',
    },
    monthText: {
      fontSize: 30,
      fontFamily: 'SeoulNamsanB',
      marginTop: windowHeight * 0.01,
    },
    dayTextAtIndex0: {
      color: 'red',
    },
    dayTextAtIndex6: {
      color: 'blue',
    },
    dayHeader: {
      fontSize: 20,
      fontFamily: 'SeoulNamsanB',
    },
    week: {
      marginTop: windowHeight * 0.05,
      marginBottom: windowHeight * 0.05,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};

//style 피그마에 맞춰 임의 지정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    marginTop: windowHeight * 0.05,
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
    width: windowHeight * 0.025,
    height: windowHeight * 0.025,
  },
  mountainname: {
    position: 'absolute',
    marginTop: windowHeight * 0.075,
    color: 'white',
    fontSize: 15,
    marginLeft: windowWidth * 0.022,
  },
  longmountainname: {
    position: 'absolute',
    marginTop: windowHeight * 0.075,
    color: 'white',
    fontSize: 14,
    marginLeft: windowWidth * 0.013,
  },
  shortmountainname: {
    position: 'absolute',
    marginTop: windowHeight * 0.075,
    color: 'white',
    fontSize: 16,
    marginLeft: windowWidth * 0.033,
  },
  wenttoday: {
    backgroundColor: 'green',
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    width: windowHeight * 0.025,
    height: windowHeight * 0.025,
    marginLeft: windowWidth * 0.04,
  },
});
