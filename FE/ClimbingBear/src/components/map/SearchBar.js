import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, View, Button, StyleSheet} from 'react-native';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다

const SearchBar = ({setLatitude, setLongitude}) => {
  /* 
  (임시) 아무거나 입력했을 때 검색 버튼이 뜨고, 버튼을 누르면 위/경도 재설정 해 위치가 바뀌도록 구현
  여기에는 검색바 구현할 예정
  */
  function relocate() {
    setLatitude(37.416481);
    setLongitude(126.884791);
  }

  // (공부) TextInput 속성
  return (
    <View>
      <TextInput
        placeholder="산을 검색하세요"
        style={styles.temptext}
        onSubmitEditing={() => relocate()}></TextInput>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 20,
  },
});
