<<<<<<< HEAD
import React, {useState, useRef, useCallback, useEffect} from 'react';
=======
// 등산기록 스크린에서 유저 정보 받고
// 여기서는 그 정보를 useRoute로 가져옴
// 등산기록 스크린에서 네비게이션 푸쉬로 아이템 전달?
/*
 * @format
 * @flow strict-local
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
>>>>>>> d44c18c (final - 최종제출)
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
<<<<<<< HEAD
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatRoom = ({navigation, route}) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  const accessToken = useSelector(state => state.auth.accessToken);
  const nickname = useSelector(state => state.auth.nickname);
  const id = useSelector(state => state.auth.id);
  const roomSequence = route.params.roomSeq;

  // const [messages, setMessages] = useState([]);
  // const [serverState, setServerState] = useState('Loading...');

  // websocket & stomp initialize
  let sock = new SockJS('http://k7d109.p.ssafy.io:8080/ws/chat');
  let ws = Stomp.over(sock);
  let reconnect = 0;

  const roomId = AsyncStorage.getItem('wschat.roomSeq');
  // const roomN = AsyncStorage.getItem('wschat.roomName')
  // const sender = AsyncStorage.getItem('wschat.sender');

  const [roomSeq, setRoomSeq] = useState(roomId);
  const [room, setRoom] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connect();
    findRoom();
    // console.log('asdfkl')
  }, []);

  const onChangeMessageHandler = message => {
    setMessage(message);
  };

  const findRoom = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://k7d109.p.ssafy.io:8080/chat/room/enter/${roomSequence}`,
        headers: {
          Authorization: accessToken,
        },
      });
      if (response.data.status === 'success') {
        // console.log(response.data.data);
        setRoom(response.data.data);
      } else {
        throw new Error('에러 발생!');
      }
      // console.log(response.data.data)
      // setRoom(response.data.data)
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const sendMessage = async () => {
    ws.send(
      '/app/chat/message',
      JSON.stringify({
        type: 'TALK',
        roomId: `${roomSequence}`,
        sender: nickname,
        message: message,
      }),
      {},
    );
    recvMessage(message);
    setMessage('');
  };

  const recvMessage = async recv => {
    console.log('메시지', recv);
    // 배열 맨앞에 값 추가
    setMessages(messages => [
      ...messages,
      {
        type: recv.type,
        sender: recv.sender,
        message: recv.message,
      },
    ]);
  };

  const connect = () => {
    // pub/sub event
    // console.log('커넥트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ')
    ws.connect(
      {},
      frame => {
        ws.subscribe('/topic/chat/room/' + roomSequence, message => {
          let recv = JSON.parse(message.body);
          recvMessage(recv);
        });
        ws.send(
          '/app/chat/message',
          {},
          JSON.stringify({
            type: 'ENTER',
            roomId: `${roomSequence}`,
            sender: nickname,
            message: message,
          }),
        );
      },
      function (error) {
        if (reconnect++ <= 5) {
          setTimeout(function () {
            console.log('connection reconnect');
            sock = new SockJS('http://k7d109.p.ssafy.io:8080/ws/chat');
            ws = Stomp.over(sock);
            connect();
          }, 10 * 1000);
        }
      },
    );
  };
=======
  TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux'
 
const ChatRoom = () => {  
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [serverState, setServerState] = useState('Loading...');
  const accessToken = useSelector((state) => state.auth.accessToken)
  const nickname = useSelector((state) => state.auth.nickname)
  // ChatHome의 타이틀 가져오기

  // const [senderNick, setSenderNick] = useState(route.params.record.sender_nick)
  // const [receiverNick, setReceiverNick] = useState(route.params.record.receiver_nick)
  // const [image_path, setImage_path] = useState(route.params.record.image_path)
  const ws = useRef(null);

  // 현재 시각
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
  const kr_curr = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.

  // const [userNick, setUserNick] = useState('')

  // const onChangeUserNick = (userNick) => {
  //   setUserNick(userNick);
  // }

  // const getRoom = await

  //  const [userList, setUserList] = useState([])
  // (임시)
  // const userList = [
  //   {
  //     nickname: '근혜',
  //     userSeq: 1,
  //   },
  //   {
  //     nickname: '그네',
  //     userSeq: 2,
  //   },
  // ]

  // const receiverNick = userList[0].nickname
  // const senderNick = userList[1].nickname

  const [senderNick, setSenderNick] = useState(nickname)
  const [receiversNick, setReceiversNick] = useState([])
  const onChangeUserNick = (userNick) => {
    setUserNick(userNick);
  }

  // async storage 해당 방의 채팅 내용 가져오기 
  const loadChatContent = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem('roomId')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value      
    }
  }  
 
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
        _id: receiversNick, // receiver nickname
        text: '등산시작!',
        createdAt: kr_curr, // 현재시각
        user: {
          _id: senderNick,  // sender nick
          name: senderNick, // 표시되는 닉넴
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
        _id: response.receiversNick,
        text: response.message,
        createdAt: new Date(response.createdAt),
        // createdAt: new Date(response.createdAt * 1000),
        user: {          
          _id: response.senderNick,
          name: response.senderNick,
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
      "receiversNick": receiversNick,
      "message": messages[0].text,
      "action": "message"
    }
    ws.current.send(JSON.stringify(obj))
    // 예전 메시지와 최신 메시지 병합
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // 
  }, [])
>>>>>>> d44c18c (final - 최종제출)

  return (
    <View style={styles.container}>
      {/* 상단 바1 */}
<<<<<<< HEAD
      <View
        style={{
          padding: 15,
          backgroundColor: '#91C788',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
=======
      <View style={{
        padding: 15,
        backgroundColor: "#D7FBE8",
        // color: "#858383",
        alignItems: "center",
        justifyContent: 'center',
        width: '100%'
      }}>
>>>>>>> d44c18c (final - 최종제출)
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
<<<<<<< HEAD
            navigation.goBack();
          }}>
=======
            navigation.goBack()
          }}
        >
>>>>>>> d44c18c (final - 최종제출)
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
<<<<<<< HEAD
              color: '#FFFFFF',
            }}>{`Back`}</Text>
        </TouchableOpacity>
        {/* 제목 */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
          }}>
          {room.roomName}
        </Text>
      </View>

      <View style={styles.list_group}>
        {messages &&
          messages.map((item, idx) => (
            // <Text style={styles.content}>{item}</Text>
            <View sytle={styles.list}>
              <View style={styles.rightcon}>
                {nickname === item.sender || (
                  <View style={styles.right} key={item.sender}>
                    {/* 닉네임 */}
                    <Text style={styles.nicknameright}>{item.sender}</Text>
                    {/* 대화내용 */}
                    <Text style={styles.contentleft}>{item.message}</Text>
                  </View>
                )}
              </View>
              <View style={styles.leftcon}>
                {nickname !== item.sender || (
                  <View style={styles.left} key={item.sender}>
                    {/* 닉네임 */}
                    <Text style={styles.nicknameleft}>{item.sender}</Text>
                    {/* 대화내용 */}
                    <Text style={styles.contentright}>{item.message}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
      </View>

      <View style={styles.input_group}>
        {/* 입력란 */}
        <TextInput
          // placeholder=''
          // editable={!isLoading}
          onChangeText={setMessage}
          value={message}
          style={styles.text_input}></TextInput>
        {/* 전송버튼 */}
        <TouchableOpacity style={styles.input_group_append}>
          <TouchableOpacity
            style={styles.btn_send}
            onPress={() => {
              sendMessage();
            }}>
            <Text style={styles.sendtext}>보내기</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
=======
              color: "#858383",
            }}
          >{`Back`}</Text>
        </TouchableOpacity>
        {/* 제목 */}
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: "#595757"
        }}>{`타이틀`}</Text>
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
            fontSize: 16,
            fontWeight: 'bold',
            color: "#fff"
          }}>{serverState}</Text>
      </View>
    


      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderAvatar={null}            // 사진 제거
        renderUsernameOnMessage={true} // default는 false
        renderBubble={props => {
          return (
            <Bubble
              {...props}
    
              textStyle={{
                right: {
                  color: '#646464',
                  fontFamily: "CerebriSans-Book"
                },
                left: {
                  color: '#646464',
                  fontFamily: "CerebriSans-Book"
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#F5F5F5',
                },
                right: {
                  backgroundColor: "#F5F5F5",
                },
              }}
            />
          );
        }}
        user={{
          // 본인
          _id: senderNick,  // set sender nick
          name: senderNick,
        }}
      />
>>>>>>> d44c18c (final - 최종제출)
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F4F9F4',
  },
  list_group: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // height: 600,
    // backgroundColor: 'black',
  },
  left: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  list: {},
  leftcon: {
    alignSelf: 'flex-end',
  },
  rightcon: {
    alignSelf: 'flex-start',
  },
  right: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  nicknameright: {
    alignSelf: 'flex-start',
    // marginHorizontal: 10,
    // marginVertical: 5,
  },
  nicknameleft: {
    alignSelf: 'flex-end',
    // marginHorizontal: 10,
  },
  contentright: {
    fontSize: 20,
    color: '#000000',
    paddingVertical: 5,
  },
  contentleft: {
    fontSize: 20,
    color: '#000000',
    paddingVertical: 5,
  },
  input_group: {
    flexDirection: 'row',
  },
  text_input: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    backgroundColor: '#DEEFE9',
    padding: 10,
  },
  input_group_append: {},
  btn_send: {
    backgroundColor: '#74B49B',
    padding: 15,
    height: windowHeight * 0.06,
  },
  sendtext: {
    color: '#FFFFFF',
  },
});
=======
    backgroundColor: "#fff"
  }
});
 
>>>>>>> d44c18c (final - 최종제출)
