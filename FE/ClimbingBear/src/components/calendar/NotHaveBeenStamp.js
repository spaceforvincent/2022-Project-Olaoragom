import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const NotHaveBeenStamp = () => {
  const image = require('../../assets/images/NotHaveBeenMarker.png');

  return (
    <View style={styles.stamp}>
      <Image source={image} />
    </View>
  );
};

export default NotHaveBeenStamp;
const styles = StyleSheet.create({
  stamp: {
    marginTop: 10,
  },
});
