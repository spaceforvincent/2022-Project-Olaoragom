import { useState } from 'react';
import propTypes from 'prop-types';

import { Text, TextInput, StyleSheet, View } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';

const AuthInput = ({value, title, placeholder, secureTextEntry, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        value={value}
        style={[
          styles.input,
          value && styles.valueInput,
          isFocused && styles.focusedInput,
        ]}
        placeholder={placeholder ?? title}
        placeholderTextColor={'#a3a3a3'}
        autoCapitalize={'none'} // 첫글자 대문자 방지
        autoCorrect={false} // 오타 수정 방지
        secureTextEntry={secureTextEntry} // 비밀번호 보호
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)} // 입력중인 칸 색
      />
    </View>
  );
};

// props 타입 지정
AuthInput.propTypes = {
  title: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
};

const styles = StyleSheet.create({

  container: {
    width: '60%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 45,
    fontFamily: 'SeoulNamsanB',
  },
  valueInput: {
    borderColor: 'black',
    color: 'black',
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: '#379237',
    color: 'black',
  },
  
});

export default AuthInput;
