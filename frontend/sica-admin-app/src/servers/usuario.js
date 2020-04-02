/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import { serializeQuery, isEdit }  from './../common/util'
import globalTypes from './../common/constants/GlobalTypes'


export const UsuarioService = {
  findListPagination: async (query) => {
    try {
      return await api.get(globalTypes.url.AUTH_USUARIO_LIST_PAGE + serializeQuery({
        username: query.nome,
        lines_per_page: query.lines_per_page,
        page: query.page,
        order_by: query.order_by,
        direction: query.direction
      }))
    } catch (error) {      
      if(error.response.status === 401 || error.response.status === 403){
        console.error('Erro 403: ' + JSON.stringify(error.response.data))
        const erro = {codigoErro: 403, message: 'Não tem acesso a esse serviço'}
        throw erro; 
      } else if (error.response.status === 500){
        console.error('Erro 500: ' + JSON.stringify(error.response.data))
        const erro = {codigoErro: error.response.status, message: 'Erro no sistema! '
        + error.response.message}
        throw erro;
      } else {
        console.error('Erro: ' + JSON.stringify(error.response.data))
      }    

    }
  },
  deleteUsuario: async (value) => {
    try {
      const id = value;
      return await api[globalTypes.method.DELETE](globalTypes.url.AUTH_USUARIO + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  submitUsuario: async (value) => {
    try {
      const id = isEdit(value.id) ? value.id : ''
      const method = isEdit(value.id) ? globalTypes.method.PUT: globalTypes.method.POST
      return await api[method](globalTypes.url.AUTH_USUARIO + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findUsuarioById: async (id ) => {
    try {
      return await api.get(globalTypes.url.AUTH_USUARIO + id)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  getUser: async (email) => {
    try {
      return await api.get(globalTypes.url.AUTH_USUARIO_BY_EMAIL + email)
    } catch (error) { 
      
      if(error.response.status === 401 || error.response.status === 403){
        console.error('Erro 403: ' + JSON.stringify(error.response.data))
        const erro = {codigoErro: 403, message: 'Não tem acesso a esse serviço'}
        throw erro; 
      } else if (error.response.status === 500){
        console.error('Erro 500: ' + JSON.stringify(error.response.data))
        const erro = {codigoErro: error.response.status, message: 'Erro no sistema! '
        + 'Não foi possível retornar o usuario:' + error.response.message}
        throw erro;
      } else {
        console.error('Erro: ' + JSON.stringify(error.response.data))
      }    
    }
  },
}
