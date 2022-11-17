// 문제2
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
import { useNavigation } from '@react-navigation/native';

// const accessToken = useSelector((state) => state.auth.accessToken)
// const nickname = useSelector((state) => state.auth.nickname)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const baseURL = "http://k7d109.p.ssafy.io:8080"

const CreateRoomModal = ({
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation()
  const [roomTitle, setRoomTitle] = useState(''); 
  // const [maxMember, setmaxMember] = useState('2');
  const [isLoading, setIsLoading] = useState(false);
  const [createRoom, setCreateRoom] = useState({});

  const onChangeTitleHandler = (roomTitle) => {
    setRoomTitle(roomTitle);
  }
  // const onChangeMaxMemberHandler = (maxMember) => {
  //   setmaxMember(maxMember);
  // }

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
        <TextBold style={styles.modaltitle}>채팅방 개설</TextBold>
        <View style={styles.inputelement}>
          <Text style={styles.inputtitle}>채팅방명</Text>
          <TextInput
            placeholder='제목을 입력하세요.'
            editable={!isLoading}
            onChangeText={onChangeTitleHandler}
            value={roomTitle}
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

        <Pressable
          style={styles.startbutton} 
          onPress={() => onSubmitFormHandler() && navigation.navigate('ChatRoom', {roomSeq: roomSeq}) }>
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

  },
  inputtitle: {
    fontSize: '16',
    fontFamily: 'SeoulNamsanB',

  },
  inputtext: {
    fontSize: '1',
    fontFamily: 'SeoulNamsanB',

  },
  startbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth*0.4,
    backgroundColor: '#1FAB89',
    borderRadius: 4,
  },
  starttext: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '10',
    fontFamily: 'SeoulNamsanB',

  },  

})