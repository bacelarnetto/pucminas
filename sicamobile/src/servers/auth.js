import api from './api';
import AsyncStorage from '@react-native-community/async-storage';

import globalTypes from './../common/constants/GlobalTypes';

export const AuthService = {
  authUser: async (email, senha) => {
    const authData = {
      email: email,
      senha: senha,
    };
    try {
      const response = await api[globalTypes.method.POST](
        globalTypes.url.LOGIN,
        authData,
      );

      const expirationDate = await new Date(
        new Date().getTime() + response.headers.expires_in * 1000,
      );

      await AsyncStorage.setItem('token', response.headers.authorization);
      await AsyncStorage.setItem('expirationDate', `${expirationDate}`);
      await AsyncStorage.setItem('userId', response.headers.user_id);
      await AsyncStorage.setItem('username', email);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        throw new Error(
          'Não foi possível realizar o login. ' + error.response.data.message,
        );
      } else {
        throw new Error(
          'Não foi possível realizar o login. ',
          error.response.data.message,
        );
      }
    }
  },
};
