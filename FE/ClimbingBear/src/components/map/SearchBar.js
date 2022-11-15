import { Fragment, useEffect, useLayoutEffect, useState } from "react"

import { View, StyleSheet, Dimensions } from "react-native"
import { useDispatch } from "react-redux"

import SearchableDropdown from 'react-native-searchable-dropdown'

import MountainSemiDetail from './MountainSemiDetail'
import { getMountainDetail, getMountainList } from "../../apis/Map"
import { mapActions } from "../../store/Map"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchBar = (props) => {

  const { setCluster } = props
  const dispatch = useDispatch()

  const [items, setItems] = useState([]);
  const [mountainId, setMountainId] = useState('');
  const [mountainName, setMountainName] = useState('');
  const [semiMountainData, setSemiMountainData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  // bottomsheet & 세미 데이터 통신
  const semiDetail = (item) => {

    // 모달창
    setModalVisible(true);

    setMountainId(item.id);
    setMountainName(item.name);

    setCluster(false);

    const markerLat = item.lat;
    const markerLon = item.lon;

    dispatch(mapActions.marker({
      markerLat,
      markerLon,
    }))

    const initialData = async () => {
      const response = await getMountainDetail(item.id);
      setSemiMountainData(response);
    };
    initialData()
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
          lat: mn.mntnLat,
          lon: mn.mntnLon,
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
            backgroundColor: '#ffffff',
            width: windowWidth * 0.75,
            margin: 10,
            marginLeft: 5,  
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
          itemsContainerStyle={{maxHeight: 500}}
          items={items}
          defaultIndex={0}
          resetValue={false}
          textInputProps={{
            placeholder: '산 이름을 입력해주세요',
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
        mountainLat={semiMountainData.mntnLat}
        mountainLon={semiMountainData.mntnLon}
      />
    </View>
  );
};

export default SearchBar;