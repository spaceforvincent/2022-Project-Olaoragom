import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://k7d109.p.ssafy.io:8080/mntn';

// mountain list
export const getMountainList = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  try {
    const response = await axios({
      method: 'get',
      url: API_URL + '/list',
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};

// mountain detail
export const getMountainDetail = async mountainId => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  try {
    const response = await axios({
      method: 'get',
      url: API_URL + '/detail',
      headers: {
        Authorization: accessToken,
      },
      params: {
        mntnSeq: mountainId,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};

// mountain weather
export const getMountainWeather = async(lat, lng) => {
  try {
    const response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&exclude=hourly,daily&appid=70be5caf0468b9040e9c7465ff5001c0`
    })
    console.log('날씨', response)
    return response
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
  }
}