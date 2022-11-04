import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

const API_URL = 'http://k7d109.p.ssafy.io:8080/user';

// accessToken => encryptedStorage STORE
export const storeToken = async(accessToken) => {
  try {
    await EncryptedStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

// accessToken => encryptedStorage GET
export const getToken = async() => {
  try {
    const authHeader = await EncryptedStorage.getItem('accessToken');
    return authHeader;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

  // 로그인 통신
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

    // 닉네임 중복검사
    export const existNickname = async(nickname) => {
      
      try {
        const response = await axios({
          method: 'get',
          url: API_URL + `/nickname`,
          params: {
            nickName: nickname
          },
        });
        return response.data.data.isExist
      }

      catch  (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.headers);
      }

    }

    // 아이디 중복검사
    export const existId= async(id) => {
      
      try {
        const response = await axios({
          method: 'get',
          url: API_URL + `/email`,
          params: {
            id: id
          },
        });
        console.log(response.data)
        console.log(response.data.isExist)
      }

      catch  (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.headers);
      }

    }


    // 회원가입 통신
    const postSignUp = async(id,password,nickname) => {

      try {
        const response = await axios({
          method: 'post',
          url: API_URL + `/signup`,
          data: {
            id: id,
            nickname: nickname,
            pw: password,
          },
        });
        console.log(response.data);
        console.log(response.data.status);
      } 
      
      catch (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.headers);
      }

    }


