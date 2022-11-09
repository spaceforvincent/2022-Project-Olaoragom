import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { Searchbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatHome = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View>
      {/* 채팅방 개설 버튼 */}
      <TouchableOpacity>
        <Text style={{fontSize:18}}>채팅방 개설</Text>
      </TouchableOpacity>
      {/* 방 검색 창 & 버튼 */}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {/* 채팅방 */}
      <View style={styles.square} />
      
    </View>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  square: {
    width: windowWidth*0.5*0.7,
    height: windowHeight*0.3,
    backgroundColor: "#858383"
  }
});
