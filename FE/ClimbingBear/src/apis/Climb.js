import axios from 'axios';

const API_URL = 'http://k7d109.p.ssafy.io:8080';

// 등산로 데이터 가져오기
export const getPath = async mntnSeq => {
  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyU2VxIjoyLCJpc3MiOiJiZVRyYXZlbGljIiwiaWF0IjoxNjY3ODA0MzY4LCJleHAiOjI0NDU0MDQzNjh9.3vQ-6Aq3be5H1nHbxK4ZzmXxBsWno_qFdOC4GZbaW6g';
  try {
    const response = await axios({
      method: 'get',
      url: API_URL + `/mntn/feature`,
      headers: {
        Authorization: accessToken,
      },
      params: {
        mntnSeq: mntnSeq,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    console.log('에러', error.response.data);
  }
};
