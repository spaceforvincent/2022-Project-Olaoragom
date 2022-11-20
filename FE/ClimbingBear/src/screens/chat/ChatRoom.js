import React, {useState, useRef, useCallback, useEffect} from 'react';

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


  return (

    <View style={styles.container}>

      {/* 상단 바1 */}

      <View

        style={{

          padding: 15,

          backgroundColor: '#91C788',

          alignItems: 'center',

          justifyContent: 'center',

          width: '100%',

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

            navigation.goBack();

          }}>

          <Text

            style={{

              fontSize: 15,

              fontWeight: 'bold',

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

    </View>

  );

};


export default ChatRoom;


const styles = StyleSheet.create({

  container: {

    flex: 1,

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
