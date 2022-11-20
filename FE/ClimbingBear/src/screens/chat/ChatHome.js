import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import axios from 'axios';
import CreateRoomModal from '../../components/chat/CreateRoomModal';
import ChatSearchBar from '../../components/chat/SearchBar';
import { TextBold, TextExtraBold, TextLight, TextMedium } from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const ChatHome = () => {
  // {navigation, route}
  const navigation = useNavigation();
  const accessToken = useSelector(state => state.auth.accessToken);
  const nickname = useSelector(state => state.auth.nickname);
  const id = useSelector(state => state.auth.id);

  // const roomSeq = route.params.roomSeq

  // 개설된 방 모음
  const [createdRooms, setCreatedRooms] = useState([]);
  // 방 개설시 방 제목
  const [roomTitle, setRoomTitle] = useState('');

  const [enteredChatRoomList, setEnteredChatRoomList] = useState({});
  const getEnteredChatRoomList = obj => {
    setEnteredChatRoomList(obj);
  };

  // 방 개설 모달 ON/OFF
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false);
  // 삭제 확인 모달 ON/OFF
  const [isDeleteRoomModalVisible, setIsDeleteRoomModalVisible] =
    useState(false);
  // 방 들어갈 때 확인 모달 ON/OFF
  const [isEnterRoomModalVisible, setIsEnterRoomModalVisible] = useState(false);

  const pushRoomRecord = (arr, record) => {
    arr.push({
      roomSeq: Number(record.roomSeq),
      roomName: String(record.roomName),
      hostUser: String(record.hostUser),
      // roomRealName: record.roomRealName,
    });
  };

  useEffect(() => {
    loadChatList();
  });

  // 백서버에서 채팅방 리스트 가져오기
  const loadChatList = async () => {
    let rooms = [];
    try {
      const response = await axios({
        method: 'get',
        url: `http://k7d109.p.ssafy.io:8080/chat/room-list`,
        headers: {
          Authorization: accessToken,
        },
      });
      // console.log(response.data.data)
      if (response.data.status === 'success') {
        // console.log('채팅방 정보 가져왔슴둥')
        response.data.data.map(record => {
          pushRoomRecord(rooms, record);
        });
      } else {
        throw new Error('에러 발생!');
      }
      setCreatedRooms(rooms);
      // console.log(createdRooms)
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const enterRoom = async roomSeq => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://k7d109.p.ssafy.io:8080/chat/room/enter/${roomSeq}`,
        headers: {
          Authorization: accessToken,
        },
      });
      console.log();
      let sender = nickname;
      if (sender !== '') {
        await AsyncStorage.setItem('wschat.sender', JSON.stringify(sender));
        await AsyncStorage.setItem('wschat.roomSeq', JSON.stringify(roomSeq));
        //   // AsyncStorage.setItem('wschat.roomName', roomName)
        //   // location.href="/chat/room/enter/"+roomSeq // 뒤로가기 가능
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 방 삭제
  // const deleteRoom = async (roomSeq) => {
  //   await client.delete(`${roomSeq}`);
  //   setRooms(
  //     rooms.filter((room) => {
  //       return room.roomSeq !== roomSeq;
  //     })
  //   );
  // };

  // const deleteRoom = async (roomSeq) => {
  //   try {
  //     const response = await axios({
  //       method: 'delete',
  //       url: `http://k7d109.p.ssafy.io:8080/chat/room`,
  //       params: {
  //         roomSeq: roomSeq,
  //       },
  //     });
  //     // 다시 방목록 로드시킴
  //     loadChatList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View>
      <View style={styles.header}>
        {/* 채팅방 개설 버튼 */}
        {/* 모달 띄워야 */}
        <TouchableOpacity
          style={styles.createbtn}
          onPress={() => {
            setIsCreateRoomModalVisible(!isCreateRoomModalVisible);
          }}>
          <Text style={styles.createtext}>채팅방 개설</Text>
        </TouchableOpacity>

        <CreateRoomModal
          modalVisible={isCreateRoomModalVisible}
          setModalVisible={setIsCreateRoomModalVisible}></CreateRoomModal>

        {/* 방 검색 창 */}
        <ChatSearchBar 
          getEnteredChatRoomList={getEnteredChatRoomList}
        ></ChatSearchBar>
        
        {/* 모달 띄우는 상황일 때 페이지 backgroundColor 어둡게 함*/}
        {/* {isCreateRoomModalVisible || isDeleteRoomModalVisible || isEnterRoomModalVisible ? (
          <View style={styles.modalOverlay}></View>
        ) : (
          <></>
        )} */}
      </View>

      {/* 채팅방 목록 */}
      <View style={styles.roomlist}>
        {/* 채팅방 */}
        {createdRooms &&
          createdRooms.map((item, index) => (
            <View style={styles.square}>
              <View style={styles.roomheader}>
                {/* 채팅방장 닉네임 */}
                <View style={styles.hostcontainer}>
                  <TextExtraBold style={styles.hosttext} key="{item.roomSeq}">
                    {item.hostUser}
                  </TextExtraBold>
                </View>
                {/* 방장이면 방 삭제 버튼 보임 */}
                {
                  nickname === item.hostUser || (
                    // <Pressable
                    //   onPress={() => deleteRoom(item.roomSeq)}>
                    <Icon style={styles.deleteIcon} name="delete"></Icon>
                  )
                  // </Pressable>
                }
              </View>

              {/* 채팅방 제목 */}
              <TouchableOpacity
                onPress={() => {
                  alert('채팅방 입장합니다.'),
                    enterRoom(String(item.roomSeq)),
                    navigation.navigate('ChatRoom', {roomSeq: item.roomSeq});
                }}>
                <View style={styles.titlecontainer}>
                  <TextExtraBold style={styles.titletext} key="{item.roomSeq}">
                    {item.roomName}
                  </TextExtraBold>
                </View>
              </TouchableOpacity>
            </View>
          ))}

        <CreateRoomModal
          modalVisible={isCreateRoomModalVisible}
          setModalVisible={setIsCreateRoomModalVisible}></CreateRoomModal>
      </View>
    </View>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  createbtn: {
    // width: windowWidth*0.5*0.5,
    // height: windowHeight*0.04,
    backgroundColor: '#5C8D89',
    color: '#FFFFFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createtext: {
    margin: 9,
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'SeoulNamsanB',
  },
  roomlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  square: {
    width: windowWidth * 0.5 * 0.7,
    height: windowHeight * 0.1,
    backgroundColor: '#A7D7C5',
    color: '#FFFFFF',
    borderTopRightRadius: 26,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 6,
    marginRight: 6,
    shadowColor: "#83c4f8",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: -10,
      width: 0,
    },

  },
  roomheader: {
    // padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  hostcontainer: {
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  hosttext: {
    color: '#A7D7C5',
    fontSize: 14,
    fontFamily: 'SeoulNamsanB',
  },
  deleteIcon: {
    size: 18,
    color: '#7C7B7B',
  },
  titlecontainer: {
    marginTop: 6,
    padding: 8,
  },
  titletext: {
    color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'SeoulNamsanB',
  },
  deleteIcon: {},
});
