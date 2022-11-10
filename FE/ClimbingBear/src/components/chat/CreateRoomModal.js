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
import { Picker } from 'react-native-wheel-pick';
import { TextInput } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const baseURL = "http://k7d109.p.ssafy.io:8080"

const CreateRoomModal = () => {
  const [roomTitle, setRoomTitle] = useState(''); 
  const [maxMember, setmaxMember] = useState('2');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeTitleHandler = (roomTitle) => {
    setRoomTitle(roomTitle);
  }
  const onChangeMaxMemberHandler = (maxMember) => {
    setmaxMember(maxMember);
  }

  // 제목, 최대인원 설정 후 방 개설
  const onSubmitFormHandler = async (event) => {
    if (!roomTitle.trim()) {
      alert("채팅방명과 최대 인원 수를 다시 확인해주세요.");
      return;
    }
    setIsLoading(true);
    const accessToken = await EncryptedStorage.getItem('accessToken');
    try {
      const response = await axios({
        method: 'post',
        url: `${baseURL}/chat`,
        headers: {
          Authorization: accessToken,
        },
        data: {
          // title: roomTitle,
          // maxMember,          
        }
      });
      if (response.status === 201) {
        alert(` 생성한 데이터: ${JSON.stringify(response.data)}`);
        setIsLoading(false);        
        setRoomTitle('');
        setmaxMember('');
      } else {
        throw new Error("에러가 발생했습니다.");
      }
    } catch (error) {
      alert("에러가 발생했습니다.");
      setIsLoading(false);
    }
  };
  
  
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View>
        <Text>채팅방명</Text>
        <TextInput
          placeholder=''
          editable={!isLoading}
          onChangeText={onChangeTitleHandler}
          value={roomTitle}
        ></TextInput>
        // 최대인원6명까지
        <Text>최대 인원</Text>
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
        </Picker>

        <Pressable onPress={() => onSubmitFormHandler()}>
          <Text>시작하기</Text>
        </Pressable>  
      </View>
    </Modal>
  )
};

export default CreateRoomModal;

const styles = StyleSheet.create({

})
