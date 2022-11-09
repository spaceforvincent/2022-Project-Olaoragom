import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarSearchBar = ({getEnteredMountain}) => {
  useEffect(() => {
    getMountainData();
  }, [enteredText]);
  const [mountainList, setMountainList] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const [result, setResult] = useState([]);
  const updateChange = text => {
    let filterData = mountainList
      .filter(d => d.mountainName.includes(text))
      .slice(0, 4);
    if (text.length === 0 || text === '산') {
      filterData = [];
    }
    setResult(filterData);
  };
  const getMountainData = async () => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    let tempArr = [];
    try {
      const response = await axios({
        method: 'get',
        url: `http://k7d109.p.ssafy.io:8080/mntn/list`,
        headers: {
          Authorization: accessToken,
        },
      });
      response.data.data.map(record => {
        tempArr.push({
          mountainName: record.mntnNm,
          mntnSeq: record.mntnSeq,
        });
      });
      setMountainList(tempArr);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.headers);
    }
  };
  return (
    <View>
      <View style={styles.searchbar}>
        <TextInput
          placeholder="산을 검색하세요"
          onChangeText={text => {
            setEnteredText(text);
            updateChange(text);
          }}
          value={enteredText}
          style={styles.textinput}
        />
      </View>
      <View style={styles.result}>
        {result.map(r => {
          return (
            <View key={r.mntnSeq} style={styles.resultelement}>
              <Button
                title={r.mountainName}
                color="green"
                onPress={() => {
                  setEnteredText(r.mountainName); //검색바 내용 변경
                  getEnteredMountain(r); //enteredText 전송
                  setResult([]);
                }}></Button>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarSearchBar;

const styles = StyleSheet.create({
  searchbar: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C2C2C2',
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
  },
  textinput: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 15,
  },
  buttontext: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 10,
  },
  textinput: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 15,
  },
  buttontext: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 10,
  },
  result: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.01,
    justifyContent: 'flex-start',
  },
  resultelement: {
    fontFamily: 'SeoulNamsanB',
    marginHorizontal: 1,
    marginVertical: 2,
    padding: 5,
  },
});
