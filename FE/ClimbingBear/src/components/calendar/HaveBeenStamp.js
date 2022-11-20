import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HaveBeenStamp = () => {
  const image = require('../../assets/images/HaveBeenMarker.png');

  return (
    <View style={styles.stamp}>
      <Image source={image} />
    </View>
  );
};

export default HaveBeenStamp;
const styles = StyleSheet.create({
  stamp: {
    marginTop: windowHeight * 0.01,
  },
});
