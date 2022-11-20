<<<<<<< HEAD
=======
// 문제2
>>>>>>> d44c18c (final - 최종제출)
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
<<<<<<< HEAD
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import EncryptedStorage from 'react-native-encrypted-storage';

=======
import { useNavigation } from '@react-navigation/native';

// const accessToken = useSelector((state) => state.auth.accessToken)
// const nickname = useSelector((state) => state.auth.nickname)
>>>>>>> d44c18c (final - 최종제출)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const baseURL = "http://k7d109.p.ssafy.io:8080"

const CreateRoomModal = ({
  modalVisible,
  setModalVisible,
<<<<<<< HEAD
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
=======
}) => {
  const navigation = useNavigation()
  const [roomTitle, setRoomTitle] = useState(''); 
  // const [maxMember, setmaxMember] = useState('2');
  const [isLoading, setIsLoading] = useState(false);
  const [createRoom, setCreateRoom] = useState({});

  const onChangeTitleHandler = (roomTitle) => {
    setRoomTitle(roomTitle);
>>>>>>> d44c18c (final - 최종제출)
  }
  // const onChangeMaxMemberHandler = (maxMember) => {
  //   setmaxMember(maxMember);
  // }

<<<<<<< HEAD
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
  
=======
  // 방개설 모달로부터 
  // const 

  // 제목, 최대인원 설정 후 방 개설
  // const onSubmitFormHandler = async () => {
  //   if (!roomTitle.trim()) {
  //     alert("채팅방명을 다시 확인해주세요.");
  //     return;
  //   }
  //   setIsLoading(true);
  //   const accessToken = await EncryptedStorage.getItem('accessToken');
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: `${baseURL}/chat/createroom`,
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //       data: {
  //         roomName: roomTitle,          
  //       }
  //     });
  //     // setIsLoading(false);
  //     // setRoomTitle('');
  //     if (response.status === 201) {
  //       alert(` 생성한 데이터: ${JSON.stringify(response.data)}`);
  //       // console.log(response.data.roomSeq)                
  //       // 생성한 채팅방으로 넘어가기
  //       // gotoChatRoom();
  //       setIsLoading(false);
  //       setRoomTitle('');
  //       // setmaxMember('2');
  //     } else {
  //       throw new Error("에러가 발생했습니다.");
  //     }
  //   } catch (error) {
  //     alert("에러가 발생했습니다.");
  //     setIsLoading(false);
  //   }
  // };

  // const gotoChatRoom = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: `${baseURL}/chat/`,
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //       data: {
  //         ,          
  //       }
  //     });

  //   } catch (error) {

  //   }
  // }
  
  
>>>>>>> d44c18c (final - 최종제출)
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
<<<<<<< HEAD
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
=======
      {/* <Pressable
        style={styles.modalOverlay}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}></Pressable> */}

      <View style={styles.Modal}>
        <TextBold style={styles.modaltitle}>채팅방 개설</TextBold>
        <View style={styles.inputelement}>
          <Text style={styles.inputtitle}>채팅방명</Text>
          <TextInput
            placeholder='제목을 입력하세요.'
            editable={!isLoading}
            onChangeText={onChangeTitleHandler}
            value={roomTitle}
>>>>>>> d44c18c (final - 최종제출)
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

<<<<<<< HEAD

        {/* (논의) 버튼 누를 때 async storage에 방 생성해놓아야하나? */}
        <Pressable
          style={styles.startbutton} 
          onPress={() => {onSubmitFormHandler(roomName), navigation.navigate('ChatRoom', {roomSeq: roomSeq})} }>            
=======
        <Pressable
          style={styles.startbutton} 
          onPress={() => onSubmitFormHandler() && navigation.navigate('ChatRoom', {roomSeq: roomSeq}) }>
>>>>>>> d44c18c (final - 최종제출)
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
<<<<<<< HEAD
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
=======
>>>>>>> d44c18c (final - 최종제출)
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
<<<<<<< HEAD
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
=======

  },
  inputtitle: {
    fontSize: 16,
    fontFamily: 'SeoulNamsanB',

  },
  inputtext: {
    fontSize: 1,
    fontFamily: 'SeoulNamsanB',

>>>>>>> d44c18c (final - 최종제출)
  },
  startbutton: {
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    width: windowWidth*0.2,
    height: windowHeight*0.1*0.4,
    backgroundColor: '#1FAB89',
    borderRadius: 6,
=======
    width: windowWidth*0.4,
    backgroundColor: '#1FAB89',
    borderRadius: 4,
>>>>>>> d44c18c (final - 최종제출)
  },
  starttext: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
<<<<<<< HEAD
    fontSize: 16,
=======
    fontSize: 10,
>>>>>>> d44c18c (final - 최종제출)
    fontFamily: 'SeoulNamsanB',

  },  

})