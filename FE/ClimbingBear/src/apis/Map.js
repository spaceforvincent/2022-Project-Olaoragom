import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage'

const API_URL = 'http://k7d109.p.ssafy.io:8080/mntn'

// mountain list
export const getMountainList = async() => {

    const accessToken = await EncryptedStorage.getItem('accessToken')

    try {
      const response = await axios({
        method: 'get',
        url: API_URL + '/list',
        headers: {
            Authorization: accessToken
        },
      });

      return response.data.data
    } 
    
    catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
    
}

// mountain detail
export const getMountainDetail = async(mountainId) => {
  
  const accessToken = await EncryptedStorage.getItem('accessToken')

  try {
    const response = await axios({
      method: 'get',
      url: API_URL + '/detail',
      headers: {
        Authorization: accessToken
      },
      params: {
        mntnSeq: mountainId
      },
    })
    return response.data.data
  }

  catch (error) {
    console.log(error)
    console.log(error.response.data)
  }
}