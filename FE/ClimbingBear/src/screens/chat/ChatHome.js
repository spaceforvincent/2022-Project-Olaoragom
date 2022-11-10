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

// axios instance
const client = axios.create({
  baseURL: "" 
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const ChatHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState([]);


  const onChangeSearch = query => setSearchQuery(query);

  // encrypt storage에서 유저정보 가져오기
  // const 

  // async storage에서 방 정보 가져오기
  // const nickname = 
  // const isHost = 

  // 방정보 get
  useEffect(() => {
    client.get('').then((response) => {
      setRooms(response.data)
    });
  }, []);

  const deleteRoom = async (room_id) => {
    await client.delete(`${room_id}`);
    setRooms(
      rooms.filter((room) => {
        return room.room_id !== room_id;
      })
    );
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(room)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }  

  return (
    <View>
      {/* 채팅방 개설 버튼 */}
      {/* 모달 띄워야 */}
      <TouchableOpacity>
        <Text style={{fontSize:18}}>채팅방 개설</Text>
      </TouchableOpacity>
      {/* 방 검색 창 & 버튼 */}
      {/* <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> */}
      {/* 채팅방 목록 */}
      {/* CreateRoom 모달 정보 가져오기 */}
      <View style={styles.square}>
        {/* 채팅방장 닉네임 */}
        <Text>방장 닉네임</Text>
        {/* 방장이면 방 삭제 아이콘 보임 */}
        {/* 누르면 방 삭제되도록 */}
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
    backgroundColor: "#858383"
  },
  deleteIcon: {

  }
});
