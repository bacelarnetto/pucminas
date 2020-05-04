import AsyncStorage from '@react-native-community/async-storage';
import api from './servers/api';


export const onSignOut = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.clear;
}


export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token !== null) {
    api.defaults.headers.common['Authorization'] = token;
    return true;
  }
  return false;
};
