import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ToastMessage = ({message}) => {
  return (
    <View style={styles.toast}>
      <TextMedium style={styles.message}>{message}</TextMedium>
    </View>
  );
};

export default ToastMessage;
const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    padding: 11,
    marginTop: windowHeight * 0.85,
    marginLeft: windowWidth * 0.25,
    minWidth: 200,
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  message: {
    color: 'white',
    textAlign: 'center',
  },
});
