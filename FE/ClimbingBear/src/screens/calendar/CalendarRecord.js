import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  Button,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

// React 와 구조 유사하며 return template 에는 View 로 무조건 감싸줘야 한다
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarRecord = ({navigation: {navigate}, route}) => {
  const [uri, setUri] = useState('');
  const load = async () => {
    const uri = await AsyncStorage.getItem('uri');
    setUri(uri);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View>
      <TextBold style={styles.date}>{route.params.date}</TextBold>
      <TextExtraBold style={styles.Mountain}>{route.params.name}</TextExtraBold>
      <View style={styles.container}>
        <View>
          <TextExtraBold style={styles.category}>등산 거리</TextExtraBold>
          <TextExtraBold style={styles.category}>
            {route.params.distance}km
          </TextExtraBold>
        </View>
        <View>
          <TextExtraBold style={styles.category}>등산 시간</TextExtraBold>
          <TextExtraBold style={styles.category}>
            {route.params.time}
          </TextExtraBold>
        </View>
      </View>
      <View style={styles.map}>
        <Image style={styles.image} source={{uri: uri}} />
      </View>
    </View>
  );
};

export default CalendarRecord;

const styles = StyleSheet.create({
  date: {
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    marginTop: windowHeight * 0.07,
  },
  Mountain: {
    fontSize: 50,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: windowHeight * 0.05,
  },
  category: {
    fontSize: 25,
    textAlign: 'center',
  },
  map: {
    marginTop: windowHeight * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.5,
  },
});
