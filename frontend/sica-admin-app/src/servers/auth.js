/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import globalTypes from './../common/constants/GlobalTypes'


export const AuthService = {
  authUser: async (value) => {
    try {
      return await api[globalTypes.method.POST](globalTypes.url.LOGIN, value)
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
