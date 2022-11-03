import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
// 로딩화면(SplashScreen) 사용 위한 import
import SplashScreen from 'react-native-splash-screen';
// NavigationContainer 로 app 을 감싸줘야 Navigation 기능 사용 가능
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import store from './src/store';
// Provider 로 app 을 감싸줘야 redux 의 store 를 갖고 올 수 있다
import {Provider} from 'react-redux';
// (임시) Auth 기능 보류하고 바로 지도/검색 (MapHome) 으로 가는 네비게이터 import
import HomeNavigation from './src/navigation/HomeNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';

function App() {
  // splash screen 종료시키는 코드 추가
  // 시간을 더 주고 싶다면 setTimeout 함수 이용
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle="dark-content"
          translucent={true}
        />
        {/* <HomeNavigation /> */}
        <AuthNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
