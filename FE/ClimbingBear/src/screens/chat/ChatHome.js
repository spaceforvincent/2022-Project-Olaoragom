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
import ChatSearchBar from '../../components/chat/SearchBar';

// axios instance
const client = axios.create({
  baseURL: "" 
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const ChatHome = () => {
  const [rooms, setRooms] = useState([]);

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
  useEffect(() => {
    client.get('').then((response) => {
      setRooms(response.data)
    });
  }, []);

  // 해당 방의 채팅 내용 가져오기 => chatroom으로 코드 이동
  const getData = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem('room_id')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value      
    }
  }

  
  // 방 삭제      
  const deleteRoom = async (room_id) => {
    await client.delete(`${room_id}`);
    setRooms(
      rooms.filter((room) => {
        return room.room_id !== room_id;
      })
    );
  };


  return (
    <View>
      {/* 채팅방 개설 버튼 */}
      {/* 모달 띄워야 */}      
      <TouchableOpacity onPress={() => {
        setIsCreateRoomModalVisible(!isCreateRoomModalVisible);
      }}>
        <Text style={{fontSize:18}}>채팅방 개설</Text>
      </TouchableOpacity>

      <CreateRoomModal
        modalVisible={isCreateRoomModalVisible}        
        setmodalVisible={setIsCreateRoomModalVisible}        
      ></CreateRoomModal>
      

      {/* 방 검색 창 */}
      <ChatSearchBar 
        getEnteredChatRoomList={getEnteredChatRoomList}
      ></ChatSearchBar>
      
      {/* 검색/등록 모달 띄우는 상황이나 수정/삭제 모달 띄우는 상황일 때 페이지 backgroundColor 어둡게 함*/}
      {isCreateRoomModalVisible || isDeleteRoomModalVisible || isEnterRoomModalVisible ? (
        <View style={styles.modalOverlay}></View>
      ) : (
        <></>
      )}

      
      {/* 채팅방 목록 */}
      <View style={styles.square}>
        {/* 채팅방장 닉네임 */}
        <Text>방장 닉네임</Text>
        {/* 방장이면 방 삭제 버튼 보임 */}
        {/* room_id? room_name? */}
        {nickname === {isHost} ||
          <Pressable
            onPress={() => deleteRoom(room_id)}>
            <Icon
              name="delete"
              size={18}
              color="#7C7B7B"
            ></Icon>
          </Pressable>
        }
        <TouchableOpacity        
          onPress={() => {
            alert('채팅방 입장합니다.');
          }}
        >
          {/* 채팅방 제목 */}          
          <Text>방 제목</Text>
        </TouchableOpacity>        
      </View>
      
    </View>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  square: {
    width: windowWidth*0.5*0.7,
    height: windowHeight*0.3,
    backgroundColor: "#A7D7C5",
    color: '#FFFFFF',
    borderTopRightRadius: 16,
  },
  deleteIcon: {

  }
});
