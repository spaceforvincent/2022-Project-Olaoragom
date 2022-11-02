import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ToastMessage = ({message}) => {
  return (
    <View style={styles.toast}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default ToastMessage;
const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    padding: 11,
    marginTop: windowHeight * 0.85,
    marginLeft: windowWidth * 0.3,

    minWidth: 200,
    // transform: translate(-50%, -50%),
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  message: {
    color: 'white',
    textAlign: 'center',
  },
});
