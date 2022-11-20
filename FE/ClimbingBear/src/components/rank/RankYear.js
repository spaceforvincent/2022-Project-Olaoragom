import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RankYear = ({year, setYear}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '2022', value: '2022'},
    {label: '2023', value: '2023'},
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
    {label: '2026', value: '2026'},
    {label: '2027', value: '2027'},
    {label: '2028', value: '2028'},
    {label: '2029', value: '2029'},
    {label: '2030', value: '2030'},
  ]);

  return (
    <View style={styles.yearPicker}>
      <DropDownPicker
        open={open}
        value={year}
        items={items}
        setOpen={setOpen}
        setValue={setYear}
        setItems={setItems}
        maxHeight={500}
        onChangeItem={item => setValue(item.value)}
        textStyle={{
          fontSize: 11,
          fontFamily: 'SeoulNamsanM',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default RankYear;

const styles = StyleSheet.create({
  yearPicker: {
    width: windowWidth * 0.5,
    marginRight: 0,
    margin: 10,
  },
});
