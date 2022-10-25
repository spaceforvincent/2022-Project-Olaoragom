import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const ChatRoom = () => {
  return (
    <View>
      <Text style={styles.temptext}>
        개별 채팅방을 볼 수 있는 채팅방 스크린입니다!
      </Text>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
