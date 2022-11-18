import React, {useLayoutEffect, useState, useIsFocused, useEffect} from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getTotalRank } from '../../apis/Rank';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
import DropDownPicker from 'react-native-dropdown-picker';
import RankItem from '../../components/rank/RankItem';
import RankYear from '../../components/rank/RankYear';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RankHome = () => {
  const [index, setIndex] = React.useState(0);
    const [totalRanks, setTotalRank] = useState([]);
    const [year, setYear] = useState('');

    useLayoutEffect(() => {
        const initialData = async() => {
            const response = await getTotalRank();
            setTotalRank(response.data)
        }
        initialData();
    }, [])

    useEffect(() => {
      console.log(year)
    })
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextExtraBold style={styles.title}>곰들의 전쟁</TextExtraBold>
        <Image
          style={styles.icon}
          source={require('../../assets/images/zeus.png')}></Image>
      </View>
      <Tab value={index} onChange={setIndex} dense>
        <Tab.Item>전체 등산기록</Tab.Item>
        <Tab.Item>월별 등산기록</Tab.Item>
      </Tab>
      <RankYear year={year} setYear={setYear}/>
      <View style={styles.table}>
      <ScrollView>
        {totalRanks.map((totalRank, index) => (
          <RankItem
            key={index}
            index = {index}
            nickname={totalRank.nickname}
            distance={totalRank.distance}></RankItem>
        ))}
      </ScrollView>
      </View>
    </View>
  );
};

export default RankHome;

const styles = StyleSheet.create({
    container: {
        margin: windowHeight * 0.03,
        marginTop: 0,
        flexDirection: 'column',
    },
    header: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 30,
    },
    icon: {
        marginLeft: 10,
        marginBottom: 15,
        height: 45,
        width: 60,
    },
    table: {
        borderWidth: 1,
        borderRadius: 10,
        height: windowHeight * 0.8
    }
})
