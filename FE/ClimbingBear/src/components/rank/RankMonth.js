import React, {useLayoutEffect, useState, useIsFocused} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getTotalRank} from '../../apis/Rank';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
import DropDownPicker from 'react-native-dropdown-picker';
import RankItem from '../../components/rank/RankItem';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RankYear = ({year, setYear}) => {

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
  ]);

  return (
    <View>
        <DropDownPicker
        open={open}
        value={year}
        items={items}
        setOpen={setOpen}
        setValue={setYear}
        setItems={setItems}
      />
    </View>
  )
};

export default RankYear;

const styles = StyleSheet.create({
  
});

