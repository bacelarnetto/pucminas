/* eslint-disable no-console */
import api from './api';

import { serializeQuery, isEdit }  from './../common/util'
import globalTypes from './../common/constants/GlobalTypes'


export const BarragemService = {

  findListPagination: async (query) => {
    try {
      return await api.get(globalTypes.url.BARRAGEM_LIST_PAGE + serializeQuery({
        description: query.description,
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

  deleteBarragem: async (value) => {
    try {
      const id = value;
      return await api[globalTypes.method.DELETE](globalTypes.url.BARRAGEM + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  submitBarragem: async (value) => {
    try {
      const id = isEdit(value.id) ? value.id : ''
      const method = isEdit(value.id) ? globalTypes.method.PUT: globalTypes.method.POST
      return await api[method](globalTypes.url.BARRAGEM + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findBarragemById: async (id ) => {
    try {
      return await api.get(globalTypes.url.BARRAGEM + id)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  getTypesBarragem: async () => {
    try {
      return await api.get(globalTypes.url.BARRAGEM_TIPOS)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  getListCategoriasRisco: async () => {
    try {
      return await api.get(globalTypes.url.BARRAGEM_LIST_CATEGORIAS_RISCO)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  getListDanosPotenciais: async () => {
    try {
      return await api.get(globalTypes.url.BARRAGEM_LIST_DANOS_POTENCIAIS)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },


  getListObjetivosContencao: async () => {
    try {
      return await api.get(globalTypes.url.BARRAGEM_LIST_OBJETIVOS_CONTENCAO)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },


  getListSituacoesOperacionais: async () => {
    try {
      return await api.get(globalTypes.url.BARRAGEM_LIST_SITUACOES_OPERACIONAIS)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findList: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_LIST)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
    
}
