import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const SearchRegisterModal = () => {
  return (
    <View style={styles.Modal}>
      <Text>검색/등록 모달</Text>
    </View>
  );
};

export default SearchRegisterModal;
const styles = StyleSheet.create({
  Modal: {
    borderColor: 'lightgreen',
  },
});
