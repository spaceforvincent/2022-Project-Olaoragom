import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import CreateRoomModal from '../../components/chat/CreateRoomModal';
// import ChatSearchBar from '../../components/chat/SearchBar';
import { TextBold, TextExtraBold, TextLight, TextMedium } from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const ChatHome = () => {
  const [rooms, setRooms] = useState([]);
  // 방 개설시 방 제목
  const [roomTitle, setRoomTitle] = useState('');

  const [enteredChatRoomList, setEnteredChatRoomList] = useState({});
  const getEnteredChatRoomList = obj => {
    setEnteredChatRoomList(obj)
  };

  // 방 개설 모달 ON/OFF
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false);  
  // 삭제 확인 모달 ON/OFF
  const [isDeleteRoomModalVisible, setIsDeleteRoomModalVisible] =
    useState(false);
  // 방 들어갈 때 확인 모달 ON/OFF  
  const [isEnterRoomModalVisible, setIsEnterRoomModalVisible] =
    useState(false);


  // 방정보 get
  // api 완성되면 수정 필요
  // useEffect(() => {
  //   client.get('').then((response) => {
  //     setRooms(response.data)
  //   });
  // }, []);


  // useEffect(() => {
  //   loadChatList();
  // })

  // 백서버에서 채팅방 리스트(제목과 호스트) 가져오기
  // const loadChatList = async () => {
  //   const accessToken = await EncryptedStorage.getItem('accessToken');
  //   console.log(accessToken);
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: `http://k7d109.p.ssafy.io:8080/chat/room-list`,
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     });
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }  

  
  // 방 삭제      
  // const deleteRoom = async (roomId) => {
  //   await client.delete(`${roomId}`);
  //   setRooms(
  //     rooms.filter((room) => {
  //       return room.roomId !== roomId;
  //     })
  //   );
  // };


  // const deleteRoom = async (rooomId) => {
  //   try {
  //     const response = await axios({
  //       method: 'delete',
  //       url: `http://k7d109.p.ssafy.io:8080/chat/delRoom/{roomId}`,
  //       params: {
  //         roomName: ,
  //       },
  //     });
  //     // 방목록에 적용되어 나오게 하는 메서드
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
          onPress={() => {setIsCreateRoomModalVisible(!isCreateRoomModalVisible)}}>
          <Text style={styles.createtext}>채팅방 개설</Text>
        </TouchableOpacity>

        {/* 문제1 */}
        <CreateRoomModal
          modalVisible={isCreateRoomModalVisible}        
          setModalVisible={setIsCreateRoomModalVisible}        
        ></CreateRoomModal>
        

        {/* 방 검색 창 */}
        {/* <ChatSearchBar 
          getEnteredChatRoomList={getEnteredChatRoomList}
        ></ChatSearchBar> */}
        
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
        <View style={styles.square}>
          <View style={styles.roomheader}>
            {/* 채팅방장 닉네임 */}
            <View style={styles.hostcontainer}>
              <TextExtraBold style={styles.hosttext}>방장 닉네임</TextExtraBold>
            </View>
            {/* 방장이면 방 삭제 버튼 보임 */}
            {/* {nickname === {isHost} || */}
              <Pressable
                onPress={() => deleteRoom(roomId)}>
                <Icon style={styles.deleteIcon}
                  name="delete"                  
                ></Icon>
              </Pressable>
            {/* } */}
          </View>

          <TouchableOpacity        
            onPress={() => {
              alert('채팅방 입장합니다.');
            }}
          >
            <View style={styles.titlecontainer}>
              {/* 채팅방 제목 */}          
              <Text style={styles.titletext}>방 제목</Text>
            </View>

          </TouchableOpacity>        
        </View>
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
    width: windowWidth*0.5*0.7,
    height: windowHeight*0.1,
    backgroundColor: '#A7D7C5',
    color: '#FFFFFF',
    borderTopRightRadius: 26,
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
  deleteIcon: {

  },
});
