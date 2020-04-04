import api from './api';

import globalTypes from './../common/constants/GlobalTypes'
import { toast } from 'react-toastify';

toast.configure(
  {
    autoClose: 10000,
  }
)

export const MoradorService = {
  
  submitMorador: async (value) => {
    try {
      return await api[globalTypes.method.POST](globalTypes.url.BARRAGEM_MORADOR, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
      if(error.response.status === 422){//erro de validação
        const errors = error.response.data.errors
        errors.map(item => toast.error(`Campo ${item.fieldName}: ${item.message}`))        
      }
    }
  },  
 
}
