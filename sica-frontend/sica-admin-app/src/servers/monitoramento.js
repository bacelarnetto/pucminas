/* eslint-disable no-console */
import api from './api';

import { serializeQuery}  from './../common/util'
import globalTypes from './../common/constants/GlobalTypes'


export const MonitoramentoService = {

  findListPagination: async query => {
    try {
      if(query.initDate !== null && query.endDate !== null){
        return await api.get(globalTypes.url.MONITORAMENTO_LIST_PAGE + serializeQuery({
          initDate: query.initDate,
          endDate: query.endDate,
          idBarragem: query.idBarragem,
          lines_per_page: query.lines_per_page,
          page: query.page,
          order_by: query.order_by,
          direction: query.direction
        })) 
      } 

      return await api.get(globalTypes.url.MONITORAMENTO_LIST_PAGE + serializeQuery({
        idBarragem: query.idBarragem,
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


  getResumeMonitoramento: async query => {
    try {
      let response = null;

      if(query.initDate !== null && query.endDate !== null){
        response = await api.get(globalTypes.url.MONITORAMENTO_RESUMO + serializeQuery({
          initDate: query.initDate,
          endDate: query.endDate,
          idBarragem: query.idBarragem
        })) 
      } else {
        response = await api.get(globalTypes.url.MONITORAMENTO_RESUMO + serializeQuery({
          idBarragem: query.idBarragem
        }))
      }
      return response
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
 
}
