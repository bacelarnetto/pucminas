import api from './servers/api';
export const isAuthenticated = () => {

  const token = localStorage.getItem('token')
  const expirationDate = new Date(
    localStorage.getItem('expirationDate')
  );
  if (expirationDate <= new Date()) {
    localStorage.clear();
    return false;
  }  
  if(token !== null){
    api.defaults.headers.common['Authorization'] = token;
    return true;
  }  
  return false;
};