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
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SaveEndModal = ({isModalVisible, setIsModalVisible}) => {
  const navigation = useNavigation();

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
          <TextExtraBold style={styles.text}>
            기록이 저장되었습니다!
          </TextExtraBold>
        </View>
        <TextBold style={styles.text}>
          저장 기록은 달력에서 확인할 수 있습니다
        </TextBold>
        <View style={styles.flexrow}>
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}>
            <View style={styles.button}>
              <TextBold
                onPress={() => {
                  navigation.navigate('CalendarHome');
                  setIsModalVisible(false);
                }}
                style={styles.buttontext}>
                보러 가기
              </TextBold>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SaveEndModal;

const styles = StyleSheet.create({
  Modal: {
    // flex: 1,
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
