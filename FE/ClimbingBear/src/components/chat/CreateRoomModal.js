// 최대인원 후순위
import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
// import { Picker } from 'react-native-wheel-pick';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import EncryptedStorage from 'react-native-encrypted-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const baseURL = "http://k7d109.p.ssafy.io:8080"

const CreateRoomModal = ({
  modalVisible,
  setModalVisible,
  roomSeq
}) => {
  const navigation = useNavigation();
  // const route = useRoute();
  const [roomName, setRoomName] = useState(''); 
  // const [maxMember, setmaxMember] = useState('2');
  const [isLoading, setIsLoading] = useState(false);
  const [createRoom, setCreateRoom] = useState({});
  const accessToken = useSelector((state) => state.auth.accessToken)
  const nickname = useSelector((state) => state.auth.nickname)
  // const roomSeqeunce = route.params.roomSeq

  const onChangeTitleHandler = (roomName) => {
    setRoomName(roomName);
  }
  // const onChangeMaxMemberHandler = (maxMember) => {
  //   setmaxMember(maxMember);
  // }

  // 제목 설정 후 방 개설
  const onSubmitFormHandler = async (roomName) => {
    if (!roomName.trim()) {
      alert("채팅방명을 입력해주십시오.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: `${baseURL}/chat/room`,
        headers: {
          Authorization: accessToken,
        },
        data: {
          roomName: roomName,          
        }
      });

      console.log(response.data.status)
      setIsLoading(false);
      setRoomName('');
      if (response.data.status === 'success') {
        // alert(response.data.data.roomName+`방이 개설되었습니다.`)
        // alert(` 생성한 데이터: ${JSON.stringify(response.data)}`);
        console.log('성공!')             
        // 생성한 채팅방으로 넘어가기
        // gotoChatRoom();
        setIsLoading(false);
        setRoomName('');
        // setmaxMember('2');
      } else {
        // throw new Error("111에러가 발생했습니다.");
        setIsLoading(false);
        setRoomName('');
        console.log(error)
        console.log(error.message)
      }
    } catch (error) {      
      // alert(`채팅방 개설에 실패하였습니다.`)
      console.log(error)
      console.log(error.message)
      setRoomName('');
      setIsLoading(false);
    }
  };
  
  // const enterRoom = async (roomSeq) => {
  //   let sender = nickname
  //   if (sender !== "") {
  //     AsyncStorage.setItem('wschat.sender',sender);
  //     AsyncStorage.setItem('wschat.roomId',roomSeq);
  //     location.href="/chat/room/enter/"+roomSeq;      
  //   }
  // }
  
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {/* blur effect */}
      <Pressable
        style={styles.modalOverlay}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}></Pressable>

      <View style={styles.Modal}>
        <TextExtraBold style={styles.modaltitle}>채팅방 개설</TextExtraBold>
        <View style={styles.inputelement}>
          {/* <TextBold style={styles.inputtitle}>채팅방명</TextBold> */}
          <TextInput
            placeholder='채팅방명을 입력하세요.'
            editable={!isLoading}
            onChangeText={onChangeTitleHandler}
            value={roomName}
            style={styles.titleinput}
          ></TextInput>
        </View>
        {/* 최대인원6명까지 */}
        {/* <Text>최대 인원</Text>
        <Picker
          editable={!isLoading}
          selectedValue={maxMember}
          style={{ width: windowWidth*0.4, height: windowHeight*0.4 }}
          onValueChange={(itemValue, itemIndex) => onChangeMaxMemberHandler(itemValue)}
        >
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker> */}


        {/* (논의) 버튼 누를 때 async storage에 방 생성해놓아야하나? */}
        <Pressable
          style={styles.startbutton} 
          onPress={() => {onSubmitFormHandler(roomName), navigation.navigate('ChatRoom', {roomSeq: roomSeq})} }>            
          <Text style={styles.starttext}>시작하기</Text>
        </Pressable>  
      </View>
    </Modal>
  )
};

export default CreateRoomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  Modal: {
    position: 'absolute',
    marginVertical: windowHeight * 0.3,
    marginHorizontal: windowWidth * 0.2,
    width: windowWidth * 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#5C7F8D',
    borderRadius: 18,
    backgroundColor: 'white',
    textAlign: 'center',    
    padding: 16,
  },
  modaltitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: 'SeoulNamsanB',
  },
  inputelement: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 18,

  },
  inputtitle: {
    fontSize: 18,
    fontFamily: 'SeoulNamsanB',

  },
  // inputtext: {
  //   fontSize: 1,
  //   fontFamily: 'SeoulNamsanB',

  // },
  titleinput: {
    borderColor: '#E0E0E0',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 6,
  },
  startbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth*0.2,
    height: windowHeight*0.1*0.4,
    backgroundColor: '#1FAB89',
    borderRadius: 6,
  },
  starttext: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'SeoulNamsanB',

  },  

})