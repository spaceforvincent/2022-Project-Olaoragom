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
import CalendarSearchBar from './SearchBar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchRegisterModal = ({
  isModalVisible,
  setIsModalVisible,
  selected,
  bookedDate,
  getSchedule,
}) => {
  const [enteredText, setEnteredText] = useState('');
  //검색창에서 받아온 일정
  const [addSchedule, setAddSchedule] = useState({
    mountainName: enteredText,
    date: selected,
  });
  const getEnteredText = text => {
    setEnteredText(text);
  };
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
          <Text style={styles.text}>등산 일정 등록</Text>
        </View>
        <CalendarSearchBar getEnteredText={getEnteredText} />
        <View style={styles.flexrow}>
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              setAddSchedule({mountainName: enteredText, date: selected});
              getSchedule(addSchedule)
            }}>
            <View style={styles.button}>
              <Text style={styles.buttontext}>등록하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SearchRegisterModal;
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
    borderRadius: 10,
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
