/* eslint-disable no-console */
import api from './api';

import globalTypes from './../common/constants/GlobalTypes'
import { serializeQuery}  from './../common/util'

export const BarragemService = {

  findList: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_LIST)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error))
    }
  },

  findBarragem: async email => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_BY_MORADOR + serializeQuery({
        email
      }))
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
      throw  new Error(error.response.data.message); 
    }
  },
    
}
