import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import CalendarSearchBar from './SearchBar';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeleteRoomModal = ({
  modalVisible,
  setModalVisible,
  one,
}) => {
  const navigation = useNavigation();  

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      {/* 모달 바깥 누르면 닫기 */}
      <Pressable
        style={styles.modalOverlay}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}></Pressable>
      <View style={styles.Modal}>
        <TextBold>정말 삭제하시겠습니까?</TextBold>
        <View style={styles.flexrow}>
          {/* no 버튼 */}
          <Pressable
            style={styles.nobtn}
            onPress={() => {
              setModalVisible(!modalVisible)
              // go back
              navigation.goBack();
            }}>No</Pressable>
          {/* yes 버튼 */}
          <Pressable
            style={styles.yesbtn}
            onPress={() => {
              setModalVisible(!modalVisible)
              // delete room function
              deleteRoom(one);
            }}>Yes</Pressable>
        </View>
      </View>
      

    </Modal>
    
  );
};

export default DeleteRoomModal;

const styles = StyleSheet.create({
  flexrow: {
    flexDirection: 'row',
  },
})