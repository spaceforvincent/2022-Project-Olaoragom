import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// (임시) axios
// import axios from 'axios';

// const url = 'http://k7d109.p.ssafy.io:8080';
const num = 1;

const ClimbCompanyAdd = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://k7d109.p.ssafy.io:8080/mntn/main/?mntn_seq=1', {
        method: 'GET',
      }).then(response => {
        const res = response.json();
        setDatas(res);
      });
    };
    fetchData();
    console.log(datas);
  }, []);

  return (
    <View>
      <Text style={styles.temptext}>여기는 일행 추가 스크린입니다!</Text>
    </View>
  );
};

export default ClimbCompanyAdd;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
