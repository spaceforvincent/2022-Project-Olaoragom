import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

const API_URL = 'http://k7d109.p.ssafy.io:8080/user';

// accessToken => encryptedStorage STORE
export const storeToken = async accessToken => {
  try {
    await EncryptedStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

// accessToken => encryptedStorage GET
export const getToken = async () => {
  try {
    const authHeader = await EncryptedStorage.getItem('accessToken');
    return authHeader;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

  // 로그인 통신
  export const postLogin = async( id, password ) => {

    try {
      const response = await axios({
        method: "post",
        url: API_URL + '/login',
        data: {
          id: id,
          pw: password
        }
      })

      // (임시) 완료되면 콘솔 지우기!!
      // console.log(response.data)
      // console.log(response.data.data.accessToken)
      // console.log(response.data.status)

      const accessToken = response.data.data.accessToken
      storeToken(accessToken)

      if ( response.data.status === 'success' ) {
        return true
      }
    }
      catch (error) {
        console.log(error)
        console.log(error.response.data);
        return false
      }
    }