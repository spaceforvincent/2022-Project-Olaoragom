import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const IconRight = () => {
  const image = require('../../assets/images/IconRight.png');

  return (
    <View>
      <Image source={image} />
    </View>
  );
};

export default IconRight;
