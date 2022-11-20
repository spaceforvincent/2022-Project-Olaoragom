import React from 'react';
import {Text} from 'react-native';

/*
[분류] 

TextLight: 얇은 서체
TextMedium: 중간 서체
TextBold: 굵은 서체
TextExtraBold: 매우 굵은 서체

[사용방법]
1. 사용할 서체를 선택해 각 페이지에서 import 한다
(예시) import {TextLight} from '../../components/common/TextFont'

2. 서체를 적용할 텍스트를 적는다
(예시) <TextLight>나는 얇은 서체를 적용할거야</TextLight>

3. 추가 스타일을 지정한다 (기존 스타일 서식과 동일)
(예시) <TextLight style={styles.fontColor}>나는 얇은 서체를 적용할거야</TextLight>
*/

export const TextLight = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'SeoulNamsanL',
      }}>
      {props.children}
    </Text>
  );
};

export const TextMedium = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'SeoulNamsanM',
      }}>
      {props.children}
    </Text>
  );
};

export const TextBold = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'SeoulNamsanB',
      }}>
      {props.children}
    </Text>
  );
};

export const TextExtraBold = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'SeoulNamsanEB',
      }}>
      {props.children}
    </Text>
  );
};
