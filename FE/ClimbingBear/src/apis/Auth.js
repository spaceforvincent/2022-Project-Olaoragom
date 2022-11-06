import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

const API_URL = 'http://k7d109.p.ssafy.io:8080/user';

// accessToken => encryptedStorage STORE
export const storeToken = async(accessToken) => {

  try {
    await EncryptedStorage.setItem('accessToken', accessToken);
  }
  catch (error) {
    console.log(error);
    console.log(error.message);
  }

};

// accessToken => encryptedStorage GET
export const getToken = async() => {

  try {
    const authHeader = await EncryptedStorage.getItem('accessToken');
    return authHeader;
  } 
  catch (error) {
    console.log(error);
    console.log(error.message);
  }

};

// login
export const postLogin = async(id, password) => {

  try {
    const response = await axios({
      method: "post",
      url: API_URL + '/login',
      data: {
        id: id,
        pw: password
      }
    })
    // (임시)
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

  // nickname 중복검사
  export const existNickname = async(nickname) => {
    
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + `/nickname`,
        params: {
          nickName: nickname
        },
      });
      // (임시)
      // console.log(response.data.data.isExist)

      if ( response.data.data.isExist === true ) {
        return true
      }
      else if ( response.data.data.isExist === false ) {
        return false
      }
    }
    catch  (error) {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.headers);
    }

  }

  // id 중복검사
  export const existId= async(id) => {
    
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + `/email`,
        params: {
          id: id
        },
      });
      // (임시)
      // console.log(response.data.data.isExist)

      if ( response.data.data.isExist === true ) {
        return true
      }
      else if ( response.data.data.isExist === false ) {
        return false
     }
    }
    catch  (error) {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.headers);
    }

  }


  // 회원가입 통신
  export const postSignUp = async(id, nickname, password) => {

    try {
      const response = await axios({
        method: "post",
        url: API_URL + `/signup`,
        data: {
          id: id,
          nickname: nickname,
          pw: password,
        },
      })
      // (임시)
      // console.log('결과', response.data)
      // console.log(response.data.status)

      if ( response.data.status === 'success' ) {
        console.log('회원가입 성공!')
        return true
      }
    } 
    catch (error) {
      console.log(error);
      console.log('에러', error.response.data);
      return false
    }

  }


