import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import {useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
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

const config = {
  hasYAxisBackgroundLines: false,
  xAxisLabelStyle: {
    rotation: 0,
    fontSize: 12,
    width: 70,
    yOffset: 4,
    xOffset: -15,
  },
  yAxisLabelStyle: {
    rotation: 30,
    fontSize: 13,
    prefix: '$',
    position: 'bottom',
    xOffset: 15,
    decimals: 2,
    height: 100,
  },
};

const RankGraph = () => {
  const [totalRecord, setTotalRecords] = useState([]);



  useLayoutEffect(() => {
    const initialData = async () => {
      const temp = await getTotalRank();
      const response = temp.data
      console.log(response)
      let recordData = [];
      response.map((record, index) => {
        recordData.push({
          distance: record.distance
        })
      })
      setTotalRecords(recordData)
    };
    initialData()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextExtraBold style={styles.title}>명예의 곰 전당</TextExtraBold>
        <Image
          style={styles.icon}
          source={require('../../assets/images/bear.png')}></Image>
      </View>
      <View style={styles.chartContainer}>
        <HorizontalBarGraph
          // data={totalRecord}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
          width={windowWidth * 0.8}
          height={windowHeight * 0.5}
          barColor="green"
          //   barRadius={15}
          baseConfig={config}
          style={styles.chart}
        />
      </View>
    </View>
  );
};

export default RankGraph;

const styles = StyleSheet.create({
  container: {
    margin: windowHeight * 0.03,
    marginTop: 0,
    flexDirection: 'column',
  },
  header: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    marginLeft: windowWidth * 0.03,
  },
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
  },
  icon: {
    marginLeft: 10,
    height: 40,
    width: 40,
  },
});
