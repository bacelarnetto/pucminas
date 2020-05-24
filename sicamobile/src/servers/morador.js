import api from './api';

import globalTypes from './../common/constants/GlobalTypes'


export const MoradorService = {
  
  submitMorador: async (value) => {
    try {
      return await api[globalTypes.method.POST](globalTypes.url.BARRAGEM_MORADOR, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  }, 

  alterarSenha: async (value) => {
    try {
      return await api[globalTypes.method.PUT](globalTypes.url.MORADOR_USER, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  }, 

  findMoradorByEmail: async (email) => {
    try {
      const morador = await api.get(globalTypes.url.MORADOR_BY_EMAIL + email)
      return morador.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  alterarMorador: async (value) => {
    try {
      const id =  value.id 
      return await api[globalTypes.method.PUT](globalTypes.url.MORADOR + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
  
  
 
}
