import React, {useEffect, useState, useCallback, useRef} from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ChatRoom = () => {
  const [serverState, setServerState] = useState('Loading...');
  const [messageText, setMessageText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [serverMessages, setServerMessages] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]);
  // (공부) useState는 컴포넌트 함수가 다시 호출이 됨 
  // 함수 내부의 변수들이 모두 다시 초기화가 되고 함수의 모든 로직이 다시 실행됨
  // 다시 랜더링 되어도 동일한 참조값을 유지하기 위해 useRef 사용
  let ws = useRef(new WebSocket('ws://w567l.sse.codesandbox.io/')).current;

  const navigation = useNavigation();
  const route = useRoute();

  // async storage에 저장
  const storeData = async (nickname, message) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify({
        'nickname': nickname, 'message' : message
      }))
    } catch (e) {
      // saving error
      console.error(e.message)
    }
  };

  // async storage에서 불러오기
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('messages')
      // JSON.stringify를 이용해서 객체를 문자열로 저장했다면
      // 불러올 땐 JSON.parse로 변환해야 함
      return value != null ? JSON.parse(value) : null
      // if(value !== null) {
      //   // value previously stored
      //   // JSON.stringify를 이용해서 객체를 문자열로 저장했다면
      //   // 불러올 땐 JSON.parse로 변환해야 함 
      //   const data = JSON.parse(value);
      //   return data;
      // }
    } catch(e) {
      // error reading value
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log('소켓 통신 가즈아')
    const serverMessagesList = [];
    // 웹소켓 연결이 서버에 의해 열리면
    ws.onopen = () => {
      setServerState('서버에 연결되었습니다.')
      setDisableButton(false);
      // async storage에서 불러옴
      // setPreviousMessages(getData())      
    };
    // 연결이 닫힐 때 submit 버튼이 비활성화
    ws.onclose = () => {
      setServerState('연결X. 인터넷이나 서버를 확인해주세요.')
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      console.log(e.message)
      setServerState(e.message);
    };
    // 수신된 메시지를 serverMessages배열 에 추가
    ws.onmessage = (e) => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList])
    };
    // return () => {
    //   ws.close();
    // }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  

  const submitMessage = () => {
    ws.send(messageText);
    // async storage에 저장
    // 더미 데이터 넣어서 확인 후 수정필요
    // storeData(nickname, messageText)    
    // 다시 입력란 비워둠
    setMessageText('')
    setInputFieldEmpty(true)
  };


  return (
    <View style={styles.container}>
      {/* 상단 */}
      <View style={{
        height: 30,
        backgroundColor: '#D7FBE8',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        {/* 이전 화면으로 */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text>Back</Text>
        </TouchableOpacity>        
        <Text>{serverState}</Text>
      </View>
      {/* 중간 */}
      <View style={{
        backgroundColor: '#F4F9F4',
        padding: 5,
        flexGrow: 1
      }}>
        <ScrollView>
          {/* if문으로 중복으로 나올 메시지 조정? */}
          {
            previousMessages.map((item, idx) => {
              return (
                <Text key={idx}>{item}</Text>
              )
            })
          }
          {
            serverMessages.map((item, idx) => {
              return (
                <Text key={idx}>{item}</Text>
              )
            })
          }
        </ScrollView>
      </View>
      {/* 하단 */}
      {/* WebSockets에 성공적으로 연결되고 텍스트가 비어있지 않아야 활성화됨 */}
      <View style={{
        flexDirection: 'row',
      }}>
        <TextInput style={{
          borderWidth: 1,
          borderColor: '#E0E0E0',
          flexGrow: 1,
          padding: 5,
          }} 
          placeholder={'일행과 소통해보세요.'}
          onChangeText={text => {
            setMessageText(text)
            setInputFieldEmpty(text.length > 0 ? false : true)
          }}
          value={messageText}
        />
        <Button
         onPress={submitMessage}
         title={'Submit'} 
         disabled={disableButton || inputFieldEmpty}
        />

      </View>

    </View>

  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ecf0f1',
    paddingTop: 30,
    padding: 8,
  },
  temptext: {
    fontSize: 50,
  },

});
