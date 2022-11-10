import { Fragment, useEffect, useLayoutEffect, useState } from "react"

import { View, StyleSheet } from "react-native"

import SearchableDropdown from 'react-native-searchable-dropdown'

import MountainSemiDetail from './MountainSemiDetail'
import { getMountainDetail, getMountainList } from "../../apis/Map"

const SearchBar = ({navigation}, props) => {
  
  const [items, setItems] = useState([]);
  const [mountainId, setMountainId] = useState('');
  const [mountainName, setMountainName] = useState('');
  const [semiMountainData, setSemiMountainData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  // bottomsheet & 세미 데이터 통신
  const semiDetail = (item, setLatitude, setLongitude) => {
    // console.log(item)

    // 모달창
    setModalVisible(true);

    setMountainId(item.id);
    setMountainName(item.name);

    const initialData = async () => {
      const response = await getMountainDetail(item.id);
      setSemiMountainData(response);
      setLatitude(response.mntnLat)
      setLongitude(response.mntnLon)
    };
    initialData();
  };

  // 산 리스트
  useLayoutEffect(() => {
    const initialData = async () => {
      const response = await getMountainList();
      let templist = [];
      response.map((mn, index) => {
        templist.push({
          id: mn.mntnSeq,
          name: mn.mntnNm,
        });
      });
      setItems(templist);
    };
    initialData();
  }, []);

  return (
    <View>
      <Fragment>
        <SearchableDropdown
          onItemSelect={item => {
            semiDetail(item);
          }}
          containerStyle={{
            backgroundColor: 'white',
            padding: 15,
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            height: 60,
            backgroundColor: 'white',
            borderColor: '#bbb',
            borderWidth: 1,
            // borderRadius: 5,
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
        mountainRegion={semiMountainData.mntnRegion}
        mountainImage={semiMountainData.mntnImg}
      />
    </View>
  );
}

export default SearchBar;