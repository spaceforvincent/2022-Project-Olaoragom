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
