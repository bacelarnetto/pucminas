import moment from 'moment';
export const Types = {
  BUSCA_DETALHE_MONITORAMENTO: 'datail/BUSCA_MONITORAMENTO',
  BUSCA_DETALHE_MONITORAMENTO_START: 'datail/BUSCA_MONITORAMENTO_START',
  BUSCA_DETALHE_MONITORAMENTO_SUCCESS: 'datail/BUSCA_MONITORAMENTO_SUCCESS',
  BUSCA_DETALHE_MONITORAMENTO_ERROR: 'datail/BUSCA_MONITORAMENTO_ERROR',
}

export const Creators = {
  
  /** BUSCA A DETALHE DO MONITORAMENTO **/
  buscaDetailMonitoramento : (idBarragem , selectedDateStart, selectedDateEnd , page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_DETALHE_MONITORAMENTO,
    query: { 
      initDate: moment(selectedDateStart).format('DD/MM/YYYY') ,
      endDate:  moment(selectedDateEnd).format('DD/MM/YYYY') ,
      idBarragem,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaDetailMonitoramentoStart : () => ({  
    type: Types.BUSCA_DETALHE_MONITORAMENTO_START,
    loading: true,
    erro: false
  }),

  buscaDetailMonitoramentoSucess : (data, 
    nomeBarragem,
    listDates,
    listVolumes,
    listTemperaturas,
    listMovimentacoes,
    listPressoes, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_DETALHE_MONITORAMENTO_SUCCESS,
    data,
    nomeBarragem,
    listDates,
    listVolumes,
    listTemperaturas,
    listMovimentacoes,
    listPressoes,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaDetailMonitoramentoError : (codigoErro) => ({
    type: Types.BUSCA_DETALHE_MONITORAMENTO_ERROR,
    loading: false,
    erro: true,
    codigoErro
  }),

}

