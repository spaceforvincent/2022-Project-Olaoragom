import {removeToken} from '../../apis/Auth';
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/Auth';
import {useLayoutEffect} from 'react';

const LogoutScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const logout = async () => {
    const isAuthenticated = false;
    dispatch(
      authActions.logout({
        isAuthenticated,
      }),
    );
    removeToken();
  };

  useLayoutEffect(() => {
    logout();
  }, []);
};

export default LogoutScreen;
