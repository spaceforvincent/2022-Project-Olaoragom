import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const HaveBeenStamp = () => {
  const image = require('../../assets/images/HaveBeenMarker.png');

  return (
    <View style={styles.stamp}>
      <ImageBackground source={image}>
        <Text style={styles.mountainname}>산 이름</Text>
      </ImageBackground>
    </View>
  );
};

export default HaveBeenStamp;
const styles = StyleSheet.create({
  stamp: {
    marginTop: 10,
    width: 30,
    height: 35,
    marginBottom: 0,
  },
  mountainname: {
    marginTop: 20,
    color: 'white',
    fontSize: 10,
    width: 50,
  },
});
