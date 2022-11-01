import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const BlankStamp = () => {
  const image = require('../../assets/images/Blank.png');

  return (
    <View style={styles.stamp}>
      <Image source={image} />
    </View>
  );
};

export default BlankStamp;
const styles = StyleSheet.create({
  stamp: {
    marginTop: 10,
  },
});