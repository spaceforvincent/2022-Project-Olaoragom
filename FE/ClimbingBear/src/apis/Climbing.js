import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://k7d109.p.ssafy.io:8080/mntn';

export const postClimbingData = async (
  day,
  distance,
  imgUrl,
  mntnSeq,
  month,
  time,
  year,
) => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  try {
    const response = await axios({
      method: 'post',
      url: API_URL + `/record`,
      headers: {
        Authorization: accessToken,
      },
      data: {
        day: day,
        distance: distance,
        imgUrl: imgUrl,
        mntnSeq: mntnSeq,
        month: month,
        time: time,
        year: year,
      },
    });
    if (response.status === 200) {
      console.log('데이터 저장 성공');
      return true;
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    return false;
  }
};
