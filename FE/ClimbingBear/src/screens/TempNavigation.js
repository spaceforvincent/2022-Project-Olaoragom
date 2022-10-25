import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Button, StyleSheet} from 'react-native';
// 자식 컴포넌트에서 navigation 을 사용하기 위한 모듈 import
import {useNavigation} from '@react-navigation/native';
// 서체 import (자세한 방법은 TextFont.js 에 나와있음)
import {TextBold} from '../components/common/TextFont';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
// (임시) 개발을 위해 각 페이지에 라우트하는 버튼 생성
const TempNavigation = () => {
  // 위에 import 한 모듈로 navigation 선언
  const navigation = useNavigation();
  return (
    <View>
      <TextBold style={styles.temptext}>
        개발을 위해 임시로 만들어둔 네비게이터 페이지입니다
      </TextBold>
      <TextBold style={styles.temptext}>
        각자 페이지로 들어가서 개발하면 됩니다!
      </TextBold>
      <View style={styles.tempbutton}>
        <Button
          title="등산/현정"
          onPress={() => navigation.navigate('ClimbingHome')}></Button>
      </View>
      <View style={styles.tempbutton}>
        <Button
          title="지도/수영"
          onPress={() => navigation.navigate('MapHome')}></Button>
      </View>
      <View style={styles.tempbutton}>
        <Button
          title="달력/혁주"
          onPress={() => navigation.navigate('CalendarHome')}></Button>
      </View>
      <View style={styles.tempbutton}>
        <Button
          title="채팅/근혜"
          onPress={() => navigation.navigate('ChatRoom')}></Button>
      </View>
    </View>
  );
};

export default TempNavigation;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 30,
  },
  tempbutton: {
    margin: 50,
  },
});
