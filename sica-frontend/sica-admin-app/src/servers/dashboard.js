/* eslint-disable no-console */
import api from './api';
import globalTypes from './../common/constants/GlobalTypes'


export const DashboardService = { 

  getQntInsumo: async () => {
    try {
      const response = await api.get(globalTypes.url.ATIVO_INSUMO_QNT)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
  getQntManutencao: async () => {
    try {
      const response = await api.get(globalTypes.url.ATIVO_MANUTENCAO_QNT)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
  getQntBarragem: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_QNT)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
  getQntMorador: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_MORADOR_QNT)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  getResumeBarragemMorador: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_MORADOR_RESUMO)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  getResumeBarragemMoradorRiscoAlto: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_MORADOR_RESUMO_RISCO_ALTO)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

}
