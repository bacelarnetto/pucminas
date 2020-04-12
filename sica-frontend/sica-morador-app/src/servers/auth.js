/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import globalTypes from './../common/constants/GlobalTypes'


export const AuthService = {
  authUser: async (email, senha) => {
    const authData = {
      email: email,
      senha: senha
    }; 
    try {

      const response = await api[globalTypes.method.POST](globalTypes.url.LOGIN, authData)

    
      const expirationDate = await new Date(
        new Date().getTime() + response.headers.expires_in * 1000
      );

      await localStorage.setItem('token', response.headers.authorization );
      await localStorage.setItem('expirationDate', expirationDate);
      await localStorage.setItem('userId', response.headers.user_id); 
      await localStorage.setItem('username', email); 

    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
      if(error.response.status === 401 || error.response.status === 403){
        throw  new Error('Não foi possível realizar o login. '+ error.response.data.message); 
      } else{
        throw  new Error('Não foi possível realizar o login. ', error.response.data.message); 
      }    
    }
  },
}
