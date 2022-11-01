import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const IconRight = () => {
  const image = require('../../assets/images/IconRight.png');

  return (
    <View>
      <Image style={styles.arrow} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: 30,
    height: 30,
  },
});

export default IconRight;
