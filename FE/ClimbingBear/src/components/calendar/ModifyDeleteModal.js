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
}) => {
  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(!isModalVisible)}
      transparent={true}>
      <Pressable
        style={styles.modalOverlay}
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}></Pressable>
      <View style={styles.Modal}>
        <View style={styles.flexrow}>
          <Text style={styles.text}>{selected}</Text>
          <Text style={styles.text}>{mountainName}</Text>
        </View>
        <Text style={styles.text}>일정이 예약되어 있습니다</Text>
        <View style={styles.flexrow}>
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              setModifyState(true);
              setIsModalVisible(!isModalVisible);
              setIsSearchRegisterModalVisible(!isSearchRegisterModalVisible);
            }}>
            <View style={styles.button}>
              <Text style={styles.buttontext}>일정 변경</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              deleteSchedule(selected);
              setIsModalVisible(!isModalVisible);
            }}>
            <View style={styles.button}>
              <Text style={styles.buttontext}>삭제</Text>
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
    marginHorizontal: windowWidth * 0.1,
    width: windowWidth * 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'lightgreen',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    padding: 20,
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
    height: windowHeight * 0.035,
    marginBottom: windowHeight * 0.01,
  },
  buttontext: {
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
