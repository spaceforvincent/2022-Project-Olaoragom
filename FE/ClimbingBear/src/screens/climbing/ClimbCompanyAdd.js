import React, {useEffect, useState, useLayoutEffect, Fragment} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

// axios import
import {getCompany} from '../../apis/Climbing';

// 서체 import
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ClimbCompanyAdd = () => {
  const [items, setItems] = useState([]);
  const [nickname, setNickname] = useState([]);

  const companyDetail = item => {
    let name = [];
    name.push(...nickname, item.name);
    setNickname(name);
    console.log('들어온 닉네임', nickname);
  };

  useLayoutEffect(() => {
    const initialData = async () => {
      const response = await getCompany();
      let companyList = [];
      response.map((com, index) => {
        companyList.push({name: com.nickname});
      });
      setItems(companyList);
    };
    initialData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.semicontainer}>
        <TextBold style={styles.infotext}>
          같이 갈 <TextBold style={styles.companytext}>동료</TextBold>의 {`\n`}
          닉네임을 검색해주세요!
        </TextBold>
      </View>
      <View style={styles.textcont}>
        {/* {nickname.map((nick, idx) => {
          <TextBold style={styles.choosetext}>{nick}</TextBold>;
          console.log('선택한 닉네임', nick);
        })} */}
        <TextBold style={styles.choosetext}>{nickname}</TextBold>
      </View>
      <Fragment>
        <SearchableDropdown
          multi={true}
          onItemSelect={item => {
            companyDetail(item);
          }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            width: windowWidth * 0.9,
            margin: 10,
            marginHorizontal: 20,
            borderRadius: 5,
          }}
          itemStyle={{
            padding: 5,
            marginTop: 1,
            height: 50,
            backgroundColor: 'white',
            borderColor: '#DFDFDE',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{
            fontFamily: 'SeoulNamsanL',
            fontSize: 20,
            color: '#222',
            marginTop: 10,
          }}
          itemsContainerStyle={{maxHeight: 410}}
          items={items}
          defaultIndex={0}
          resetValue={false}
          textInputProps={{
            placeholder: '닉네임을 검색해주세요',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              fontFamily: 'SeoulNamsanL',
            },
            // onTextChange: text => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
      </Fragment>
    </View>
  );
};

export default ClimbCompanyAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  semicontainer: {
    padding: windowWidth * 0.05,
  },
  infotext: {
    fontSize: windowWidth * 0.1,
    alignSelf: 'center',
    color: '#000000',
  },
  companytext: {
    color: '#74B49B',
  },
  textcont: {
    width: windowWidth,
    height: windowHeight * 0.05,
  },
  choosetext: {
    fontSize: windowWidth * 0.05,
    color: '#000000',
  },
});
