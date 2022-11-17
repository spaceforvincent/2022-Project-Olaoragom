import React, {useEffect, useState, useIsFocused} from 'react';
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

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RankHome = () => {
    const [totalRank, setTotalRank] = useState('');

    useEffect(() => {
        const initialData = async() => {
            const response = await getTotalRank();
            console.log(response)
            setTotalRank()
        }
        initialData();
    })
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TextExtraBold style={styles.title}>곰들의 전쟁</TextExtraBold>
            <Image style={styles.icon} source={require('../../assets/images/zeus.png')}></Image>
        </View>
        <ScrollView style={styles.table}>

        </ScrollView>
    </View>
  );
};

export default RankHome;

const styles = StyleSheet.create({
    container: {
        margin: windowHeight * 0.05,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: windowWidth * 0.08,
    },
    title: {
        fontSize: 40,
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
    }
})