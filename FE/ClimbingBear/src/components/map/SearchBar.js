import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native"

import SearchableDropdown from 'react-native-searchable-dropdown'

import { getMountainList } from "../../apis/Map";

import MountainSemiDetail from './MountainSemiDetail'

const SearchBar = ({navigation}, props) => {
  const [ items, setItems ] = useState([])
  const [ mountainId, setMountainId ] = useState('')
  const [ mountainName, setMountainName ] = useState('')

  // 세미 정보 모달
  const [ modalVisible, setModalVisible ] = useState(false)
  const modalOpen = (item) => {
    console.log(item)
    setModalVisible(true)
    setMountainId(item.id);
    setMountainName(item.name);
  }

  // 산 리스트
  useLayoutEffect(() => {
    const initialData = async () => {
      const response = await getMountainList();

      let templist = []
      response.map((mn, index) => {
        templist.push({
          id: mn.mntnSeq,
          name: mn.mntnNm
        })
      })
      setItems(templist)
    }
    initialData()
  }, [])
 
  return (
    <View>
      <Fragment>
        <SearchableDropdown
          onItemSelect={item => {
            modalOpen(item)
          }}
          containerStyle={{
            backgroundColor: 'white',
            padding: 15,
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            height: 60,
            backgroundColor: '#F9F7F7',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{
            fontFamily: 'SeoulNamsanL',
            fontSize: 20,
            color: '#222',
            marginTop: 10,
          }}
          itemsContainerStyle={{maxHeight: 500}}
          items={items}
          defaultIndex={0}
          resetValue={false}
          textInputProps={{
            placeholder: '산 이름을 입력해주세요.',
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
      <MountainSemiDetail
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mountainId={mountainId}
        mountainName={mountainName}
      />
    </View>
  );
}

export default SearchBar;