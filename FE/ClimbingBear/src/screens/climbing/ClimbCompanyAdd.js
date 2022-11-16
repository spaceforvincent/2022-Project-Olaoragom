import React, {useEffect, useState, useLayoutEffect, Fragment} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

// axios import
import {getCompany} from '../../apis/Climbing';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ClimbCompanyAdd = () => {
  const [items, setItems] = useState([]);
  const [nickname, setNickname] = useState([]);

  const companyDetail = item => {
    const initialData = async () => {
      const response = await getCompany();
      setNickname(response);
    };
    initialData();
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
    <Fragment>
      <SearchableDropdown
        multi={true}
        onItemSelect={item => {
          companyDetail(item);
        }}
        containerStyle={{
          backgroundColor: '#ffffff',
          width: windowWidth * 0.9,
          margin: 10,
          marginHorizontal: 22,
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
        itemsContainerStyle={{maxHeight: 350}}
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
  );
};

export default ClimbCompanyAdd;

const styles = StyleSheet.create({
  temptext: {
    fontSize: 50,
  },
});
