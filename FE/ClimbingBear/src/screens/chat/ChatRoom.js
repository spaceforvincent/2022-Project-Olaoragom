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
  const [serverState, setServerState] = useState('Loading...');

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
    // ws.current = new WebSocket(`wss://`)
   ws.current = new WebSocket(`wss://w567l.sse.codesandbox.io/`)
    ws.current.onopen = () => {
      console.log("열렸다!!!")
      setServerState('서버에 연결되었습니다.')
    };
    ws.current.onclose = () => {
      console.log("닫힘!")
      setServerState('연결X. 인터넷이나 서버를 확인해주세요.')
    };
    ws.onerror = (e) => {
      console.log(e.message)
      setServerState(e.message);
    };
    return () => {
      ws.current.close();
    };
  }, [])
 
  useEffect(() => {
    setMessages([
      {
        _id: receiverNick, // receiver nickname
        // _nick: userList[0].nickname,
        text: '등산시작!',
        createdAt: new Date(), // 현재시각
        user: {
          _id: senderNick,  // sender nick
          // _nick: userList[1].nickname,         
          // avatar: image_path,
        },
      },
    ])
  }, [])
 
  useEffect(() => {
    // 수신된 메시지를 병합하기
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log("onmessage=>", JSON.stringify(response));
      let sentMessages = {
        _id: response.receiverNick,
        text: response.message,
        // createdAt: new Date(response.createdAt),
        createdAt: new Date(response.createdAt * 1000),
        user: {          
          _id: response.senderNick,
          // avatar: image_path,
        },
      }
      // 예전 메시지와 최신 메시지 병합
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
    // 예전 메시지와 최신 메시지 병합
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
      {/* 상단 바1 */}
      <View style={{
        padding: 15,
        marginTop: 50,
        backgroundColor: "#D7FBE8",
        // color: "#858383",
        alignItems: "center",
        justifyContent: 'center',
        width: '100%'
      }}>
        {/* back버튼 */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            // borderColor: "#858383",
            // borderWidth: 1,
            padding: 7,
            // borderRadius: 10
          }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: "#858383",
            }}
          >{`Back`}</Text>
        </TouchableOpacity>
        {/* 제목 */}
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: "#858383"
        }}>{`일행과 대화 중`}</Text>
      </View>

      {/* 상단 바2 */}
      <View style={{
        padding: 6,
        // marginTop: 18,
        backgroundColor: "#E0E0E0",
        // color: "#858383",
        alignItems: "center",
        justifyContent: 'center',
        width: '100%'
      }}>
        <Text style={{
            fontSize: 8,
            fontWeight: 'bold',
            color: "#fff"
          }}>{serverState}</Text>
      </View>
    


      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: senderNick,  // set sender nick
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
 