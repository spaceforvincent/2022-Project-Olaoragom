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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatSearchBar = ({getEnteredChatRoomList}) => {
  useEffect(() => {
    getChatRoomtData();    
  }, [enteredText]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const [foundRoom, setFoundRoom] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken)

  const updateSearch = text => {
    let filterData = ChatRoomList
      .filter(d => d.title.includes(text))
    if (text.length === 0) {
      filterData = [];
    }
    setFoundRoom(filterData);      
  };
  // const getChatRoomData = async () => {
  //   const accessToken = await EncryptedStorage.getItem('accessToken');
  //   let tempArr = [];
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: `http://k7d109.p.ssafy.io:8080/`,
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     });
          
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  return (
    <>
      <View style={StyleSheet.chatsearchbar}>
        <TextInput
          placeholder="채팅방을 검색하세요"
          onChangeText={text => {
            setEnteredText(text);
            updateSearch(text);
          }}
          value={enteredText}
          style={styles.textinput}
        />
      </View>
      <View style={styles.foundRoom}>
        {/* {foundRoom.map(r => {
          return (
            <View key={r.} style={styles.foundRoomElement}>
              <Button
                title={r.}
                color=
                onPress={() => {
                  setEnteredText(r.roomName); //검색바 내용 변경
                  getEnteredChatRoomList(r); //enteredText 전송
                  setFoundRoom([]);
                }}></Button>
            </View>
          );
        })} */}
      </View>
    </>
  );
};

export default ChatSearchBar;
const styles = styleSheet.create({
  chatsearchbar: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C2C2C2',
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
  },
  textinput: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 15,
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