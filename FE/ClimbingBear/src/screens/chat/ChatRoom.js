// 등산기록 스크린에서 유저 정보 받고
// 여기서는 그 정보를 useRoute로 가져옴
// 등산기록 스크린에서 네비게이션 푸쉬로 아이템 전달?
/*
 * @format
 * @flow strict-local
 */
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
  TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat'
 
const Chat = () => {  
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  // const [senderNick, setSenderNick] = useState(route.params.record.sender_nick)
  // const [receiverNick, setReceiverNick] = useState(route.params.record.receiver_nick)
  // const [image_path, setImage_path] = useState(route.params.record.image_path)
  const ws = useRef(null);

  //  const [userList, setUserList] = useState([])
  // (임시)
  const userList = [
    {
      nickname: '근혜',
      userSeq: 1,
    },
    {
      nickname: '그네',
      userSeq: 2,
    },
  ]

  const receiverNick = userList[0].nickname
  const senderNick = userList[1].nickname
 
  useEffect(() => {
    console.log("소켓통신 가즈아")
    // enter your websocket url
    ws.current = new WebSocket(`wss://`)
  //  ws.current = new WebSocket(`wss://w567l.sse.codesandbox.io/`)
    ws.current.onopen = () => {
      console.log("열렸다!!!")
    };
    ws.current.onclose = () => {
      console.log("닫힘!")
    };
    return () => {
      ws.current.close();
    };
  }, [])
 
  useEffect(() => {
    setMessages([
      {
        _nick: receiverNick, // receiver nickname
        // _nick: userList[0].nickname,
        text: '하이 에이치아이',
        createdAt: new Date(), // 현재시각
        user: {
          _nick: senderNick,  // sender nick
          // _nick: userList[1].nickname,         
          // avatar: image_path,
        },
      },
    ])
  }, [])
 
  useEffect(() => {
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log("onmessage=>", JSON.stringify(response));
      let sentMessages = {
        _nick: response.receiverNick,
        text: response.message,
        createdAt: new Date(response.createdAt),
        // createdAt: new Date(response.createdAt * 1000),
        user: {          
          _nick: response.senderNick,
          // avatar: image_path,
        },
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
    };
  }, []);
 
  const onSend = useCallback((messages = []) => {
    let obj = {
      "senderNick": senderNick,    
      "receiverNick": receiverNick,
      "message": messages[0].text,
      "action": "message"
    }
    ws.current.send(JSON.stringify(obj))
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
      <View style={{
        padding: 15,
        marginTop: 50,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: 'center',
        width: '100%'
      }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            borderColor: "#fff",
            borderWidth: 1,
            padding: 7,
            borderRadius: 10
          }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: "#fff",
            }}
          >{`Back`}</Text>
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: "#fff"
        }}>{`Chat list`}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: senderId,  // set sender id
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default Chat;
 