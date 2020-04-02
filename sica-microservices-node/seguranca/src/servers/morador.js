import api from './api';

import globalTypes from './../common/constants/GlobalTypes'


export const MoradorService = {
  
  findMoradoresByIdBarragem: async (idBarragem ) => {
    try {
      api.defaults.headers.common['Authorization'] = 'node-job'
      const response = await api.get(globalTypes.url.BARRAGEM_MORADORES + idBarragem)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error)) 
      console.error('Erro: ' + JSON.stringify(error.response.data)) 
    }
  },
 
}
