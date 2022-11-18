import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {
    TextLight,
    TextMedium,
    TextBold,
    TextExtraBold,
  } from '../../components/common/TextFont';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RankItem = ({index, nickname, distance}) => {
  const rank = index + 1;
  const record = (distance).toFixed(3);

  return (
    <View style={styles.container}>
      <View>
        {rank === 1 ? (<Image style={styles.icon} source={require('../../assets/images/medal1.png')}></Image>) : 
          rank === 2 ? (<Image style={styles.icon} source={require('../../assets/images/medal2.png')}></Image>) :
          rank === 3 ? (<Image style={styles.icon} source={require('../../assets/images/medal3.png')}></Image>)
         : (
          <TextBold style={styles.number}>{rank}</TextBold>
        )}
      </View>

      <TextBold style={styles.nickname}>{nickname}</TextBold>
      <TextExtraBold style={styles.distance}>{record}</TextExtraBold>
    </View>
  );
};

export default RankItem;

const styles = StyleSheet.create({
  container: {
    margin: 3,
    marginLeft: 15,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.05,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#B2B2B2',
    borderTopColor: 'white'
  },
  number: {
    fontSize: 20,
    margin: 10,
  },
  nickname:{
    fontSize: 20,
  },
  distance: {
    fontSize: 20,    
    margin: 10,
    color: '#5F8D4E',
  },
  icon: {
    height: 30,
    width: 30,
},
});
