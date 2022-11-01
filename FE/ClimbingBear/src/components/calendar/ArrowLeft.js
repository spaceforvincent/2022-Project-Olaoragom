import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const IconLeft = () => {
  const image = require('../../assets/images/IconLeft.png');

  return (
    <View>
      <Image source={image} />
    </View>
  );
};

export default IconLeft;
