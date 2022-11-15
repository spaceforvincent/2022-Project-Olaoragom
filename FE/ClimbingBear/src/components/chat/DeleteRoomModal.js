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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeleteRoomModal = ({
  modalVisible,
  setIsModalVisible,
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
          setIsModalVisible(!isModalVisible);
        }}></Pressable>
      <View style={styles.Modal}>
        <TextBold>정말 삭제하시겠습니까?</TextBold>
        <View style={styles.flexrow}>
          {/* no 버튼 */}
          <Pressable
            style={styles.nobtn}
            onPress={() => {
              // go back
              navigation.goBack()
            }}></Pressable>
          {/* yes 버튼 */}
          <Pressable
            style={styles.yesbtn}
            onPress={() => {
              // delete room function

            }}></Pressable>
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