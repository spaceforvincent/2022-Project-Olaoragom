import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://k7d109.p.ssafy.io:8080/chellenge';

// monthly rank
export const getMonthRank = async (month, year) => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  try {
    const response = await axios({
      method: 'get',
      url: API_URL + '/month',
      Headers: {
        Authorization: accessToken,
      },
      params: {
        year: year,
        month: month,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};

// total rank
export const getTotalRank = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  try {
    const response = await axios({
      method: 'get',
      url: API_URL + '/total',
      Headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};
