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

  alterarSenha: async (value) => {
    try {
      return await api[globalTypes.method.PUT](globalTypes.url.MORADOR_USER, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
      if(error.response.status === 422){//erro de validação
        const errors = error.response.data.errors
        errors.map(item => toast.error(`Campo ${item.fieldName}: ${item.message}`))        
      }
    }
  }, 

  findMoradorByEmail: async (email) => {
    try {
      const morador = await api.get(globalTypes.url.BARRAGEM_MORADOR_BY_EMAIL + email)
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
