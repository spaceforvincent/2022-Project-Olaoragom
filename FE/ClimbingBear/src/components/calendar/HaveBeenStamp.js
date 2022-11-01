import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

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
    marginTop: 10,
  },
});
