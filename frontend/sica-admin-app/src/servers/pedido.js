/* eslint-disable no-console */
import api from './api';

import { serializeQuery, isEdit }  from './../common/util'
import globalTypes from './../common/constants/GlobalTypes'


export const PedidoService = {

  findListPagination: async (query) => {
    try {
      return await api.get(globalTypes.url.ATIVO_PEDIDO_LIST_PAGE + serializeQuery({
        id_fornecedor: query.id_fornecedor,
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

  deletePedido: async (value) => {
    try {
      const id = value;
      return await api[globalTypes.method.DELETE](globalTypes.url.ATIVO_PEDIDO + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  submitPedido: async (value) => {
    try {
      const id = isEdit(value.id) ? value.id : ''
      const method = isEdit(value.id) ? globalTypes.method.PUT: globalTypes.method.POST
      return await api[method](globalTypes.url.ATIVO_PEDIDO + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findPedidoById: async (id ) => {
    try {
      return await api.get(globalTypes.url.ATIVO_PEDIDO + id)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findAllPedido: async () => {
    try {
      return await api.get(globalTypes.url.ATIVO_PEDIDO_LIST)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findStatusPedido: async () => {
    try {
      return await api.get(globalTypes.url.ATIVO_PEDIDO_STATUS)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
 
}
