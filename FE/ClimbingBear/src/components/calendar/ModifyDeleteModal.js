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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModifyDeleteModal = ({
  isModalVisible,
  setIsModalVisible,
  isSearchRegisterModalVisible,
  setIsSearchRegisterModalVisible,
  selected,
  mountainName,
  bookedDate,
  deleteSchedule,
  modifySchedule,
  setModifyState,
  handleToast,
  isToast,
  setIsToast,
  setToastMsg,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(!isModalVisible)}
      transparent={true}>
      {/* 모달 바깥 누르면 닫기 */}
      <Pressable
        style={styles.modalOverlay}
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}></Pressable>
      <View style={styles.Modal}>
        <View style={styles.flexrow}>
          <TextExtraBold style={styles.text}>{selected}</TextExtraBold>
          <TextExtraBold style={styles.text}>{mountainName}</TextExtraBold>
        </View>
        <TextBold style={styles.text}>일정이 예약되어 있습니다</TextBold>
        <View style={styles.flexrow}>
          {/* 일정 수정상태 on & 검색/등록 모달로 이동 버튼 */}
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
              setIsSearchRegisterModalVisible(!isSearchRegisterModalVisible);
              setModifyState(true);
            }}>
            <View style={styles.button}>
              <TextBold style={styles.buttontext}>일정 변경</TextBold>
            </View>
          </TouchableOpacity>
          {/* 일정 삭제 & 토스트 메세지 띄움 */}
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
              handleToast('Delete');
              setTimeout(() => {
                setIsToast(false);
                setToastMsg('');
              }, 1000);
              deleteSchedule(selected);
            }}>
            <View style={styles.button}>
              <TextBold style={styles.buttontext}>삭제</TextBold>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModifyDeleteModal;
const styles = StyleSheet.create({
  Modal: {
    position: 'absolute',
    marginVertical: windowHeight * 0.3,
    marginHorizontal: windowWidth * 0.05,
    width: windowWidth * 0.9,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#9ECD96',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    padding: 10,
    marginTop: windowHeight * 0.03,
    textAlign: 'center',
  },
  flexrow: {
    flexDirection: 'row',
  },
  modalbottom: {
    padding: 30,
  },
  button: {
    backgroundColor: '#91C788',
    width: windowWidth * 0.25,
    height: windowHeight * 0.04,
    marginBottom: windowHeight * 0.01,
  },
  buttontext: {
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 20,
    marginTop: windowHeight * 0.003,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
