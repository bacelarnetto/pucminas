import {AsyncStorage} from 'react-native';
export const isAuthenticated = () => {
  const token = AsyncStorage.getItem('token');
  const expirationDate = new Date(AsyncStorage.getItem('expirationDate'));
  if (expirationDate <= new Date()) {
    AsyncStorage.clear();
    return false;
  }
  if (token !== null) {
    return true;
  }
  return false;
};
