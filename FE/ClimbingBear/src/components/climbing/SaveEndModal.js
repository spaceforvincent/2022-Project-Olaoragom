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
  PixelRatio,
  PixelRatio,
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
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);
const widthPixel = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const heightPixel = PixelRatio.getPixelSizeForLayoutSize(windowHeight);

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
          <TextExtraBold style={styles.texttitle}>
            기록이 저장되었습니다!
          </TextExtraBold>
        </View>
        <TextBold style={styles.text}>
          저장 기록은 달력에서 {'\n'} {'\n'} 확인할 수 있습니다
        </TextBold>
        <View style={styles.flexrow}>
          <TouchableOpacity
            style={styles.modalbottom}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('CalendarHome');
                setIsModalVisible(false);
              }}>
              <TextBold style={styles.buttontext}>보러 가기</TextBold>
            </TouchableOpacity>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: widthPixel * 0.004,
    borderColor: '#9ECD96',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: widthPixel * 0.005,
  },
  texttitle: {
    fontSize: widthPixel * 0.03,
    padding: widthPixel * 0.005,
    marginTop: windowHeight * 0.03,
    textAlign: 'center',
    color: '#000000',
  },
  text: {
    fontSize: widthPixel * 0.025,
    padding: widthPixel * 0.005,
    marginTop: windowHeight * 0.03,
  },
  flexrow: {
    flexDirection: 'row',
  },
  modalbottom: {
    padding: 30,
  },
  button: {
    backgroundColor: '#91C788',
    borderRadius: widthPixel * 0.005,
    paddingHorizontal: widthPixel * 0.01,
    paddingVertical: widthPixel * 0.005,
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
