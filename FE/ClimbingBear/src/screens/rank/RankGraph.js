import {BarChart} from 'react-native-chart-kit';
import {useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {getTotalRank} from '../../apis/Rank';
import {
  TextLight,
  TextMedium,
  TextBold,
  TextExtraBold,
} from '../../components/common/TextFont';

// 현재 디바이스 창 크기(dp)를 가져오는 모듈
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  barPercentage: 0.8,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `#3E7C17`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
  propsForLabels: 'TextLight',
};

const RankGraph = () => {
  const [topRank, setTopRank] = useState([]);

  useLayoutEffect(() => {
    const initialData = async () => {
      const temp = await getTotalRank();
      const response = temp.data;
      let templst = [];
      response.map((rank, index) => {
        templst.push({
          nickname: rank.nickname,
          record: rank.distance.toFixed(2),
        });
      });
      setTopRank(templst.slice(0, 5));
    };
    initialData();
  }, []);

  const labellst = topRank.map(row => row.nickname);
  const datalst = topRank.map(row => row.record);

  const data = {
    labels: labellst,
    datasets: [
      {
        data: datalst,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextExtraBold style={styles.title}>명예의 곰 전당</TextExtraBold>
        <Image
          style={styles.icon}
          source={require('../../assets/images/bear.png')}></Image>
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          style={styles.graphStyle}
          showBarTops={true}
          showValuesOnTopOfBars={true}
          withInnerLines={true}
          segments={10}
          data={data}
          width={windowWidth * 0.9}
          height={windowHeight * 0.8}
          yAxisSuffix=" km"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero={true}
        />
      </View>
    </View>
  );
};

export default RankGraph;

const styles = StyleSheet.create({
  container: {
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
    alignItems: 'center',
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
