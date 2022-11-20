// 방목록 api 필요
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
// import EncryptedStorage from 'react-native-encrypted-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatSearchBar = ({getEnteredChatRoomList}) => {
  useEffect(() => {
    getChatRoomData();    
  }, [enteredText]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const [foundRoom, setFoundRoom] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken)

  const updateSearch = text => {
    let filterData = chatRoomList
      .filter(d => d.roomName.includes(text))
    if (text.length === 0) {
      filterData = [];
    }
    setFoundRoom(filterData);      
  };
  const getChatRoomData = async () => {
    let tempArr = [];
    try {
      const response = await axios({
        method: 'get',
        url: `http://k7d109.p.ssafy.io:8080/chat/room-list`,
        headers: {
          Authorization: accessToken,
        },
      });
      response.data.data.map(record => {
        tempArr.push({
          roomName: record.roomName,
          roomSeq: record.roomSeq,
          hostUser: record.hostUser,
        });
      });
      setChatRoomList(tempArr)
          
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <>
      <View style={styles.chatsearchbar}>
        <TextInput
          placeholder="채팅방을 검색하세요"
          onChangeText={text => {
            setEnteredText(text);
            updateSearch(text);
          }}
          value={enteredText}
          style={styles.textinput}
        />
        <Icon
          style={styles.searchIcon}
          name="search1"
          size={25}
          color="#74B49B"
        />
      </View>
      <View style={styles.foundRoom}>
        {foundRoom.map(r => {
          return (
            <View key={r.roomSeq} style={styles.foundRoomElement}>
              <Button
                title={r.roomName}
                color="yellow"
                onPress={() => {
                  setEnteredText(r.roomName); //검색바 내용 변경
                  getEnteredChatRoomList(r); //enteredText 전송
                  setFoundRoom([]);
                  Keyboard.dismiss();
                }}></Button>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default ChatSearchBar;
const styles = StyleSheet.create({
  chatsearchbar: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C2C2C2',
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 36,
  },
  searchIcon: {
    // marginLeft: 14,
    // marginTop: windowHeight * 0.005,
  },
  textinput: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 15,
    width: windowWidth*0.4,
  },
  buttontext: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 10,
  },
  foundRoom: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: windowHeight*0.01,
    justifyContent: 'flex-start'
  },
  foundRoomElement: {
    // fontFamily: 'SeoulNamsanB',
    // marginHorizontal: 1,
    // marginVertical: 2,
    // padding: 5,
  },
});