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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
  {id: 1, name: '지리산'},
  {id: 2, name: '와룡산'},
  {id: 3, name: '천마산'},
  {id: 4, name: '천생산'},
  {id: 5, name: '천일산'},
  {id: 6, name: '천이산'},
  {id: 7, name: '천삼산'},
  {id: 8, name: '지로산'},
  {id: 9, name: '백일산'},
  {id: 10, name: '백이산'},
  {id: 11, name: '산일산'},
  {id: 12, name: '산이산'},
  {id: 13, name: '산삼산'},
];

const CalendarSearchBar = ({getEnteredText}) => {
  const [enteredText, setEnteredText] = useState('');
  const [result, setResult] = useState([]);
  const updateChange = text => {
    let filterData = data.filter(d => d.name.includes(text));
    if (text.length === 0 || text === '산') {
      filterData = [];
    }
    setResult(filterData);
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
            <View key={r.id} style={styles.resultelement}>
              <Button
                title={r.name}
                color="green"
                onPress={() => {
                  setEnteredText(r.name); //검색바 내용 변경
                  getEnteredText(r.name); //enteredText 전송
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
  result: {
    flexDirection: 'row',
  },
  resultelement: {
    fontFamily: 'SeoulNamsanB',
    marginHorizontal: 1,
    marginVertical: 2,
    padding: 5,
  },
});
