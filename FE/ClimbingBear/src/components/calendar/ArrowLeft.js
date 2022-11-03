import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IconLeft = () => {
  const image = require('../../assets/images/IconLeft.png');

  return (
    <View>
      <Image style={styles.arrow} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: windowWidth * 0.03,
    height: windowHeight * 0.03,
  },
});

export default IconLeft;
