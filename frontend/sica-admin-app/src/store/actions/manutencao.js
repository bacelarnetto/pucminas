import moment from 'moment';
export const Types = {
  BUSCA_LIST_MANUTENCAO: 'list/BUSCA_MANUTENCAO',
  BUSCA_LIST_MANUTENCAO_START: 'list/BUSCA_MANUTENCAO_START',
  BUSCA_LIST_MANUTENCAO_SUCCESS: 'list/BUSCA_MANUTENCAO_SUCCESS',
  BUSCA_LIST_MANUTENCAO_ERROR: 'list/BUSCA_MANUTENCAO_ERROR',

  BUSCA_DETAIL_MANUTENCAO: 'detail/BUSCA_MANUTENCAO',
  BUSCA_DETAIL_MANUTENCAO_START: 'detail/BUSCA_MANUTENCAO_START',
  BUSCA_DETAIL_MANUTENCAO_SUCCESS: 'detail/BUSCA_MANUTENCAO_SUCCESS',
  BUSCA_DETAIL_MANUTENCAO_ERROR: 'detail/BUSCA_MANUTENCAO_ERROR',

  DELETE_MANUTENCAO: 'list/DELETE_MANUTENCAO',
  DELETE_MANUTENCAO_START: 'list/DELETE_MANUTENCAO_START',
  DELETE_MANUTENCAO_SUCCESS: 'list/DELETE_MANUTENCAO_SUCCESS',
  DELETE_MANUTENCAO_ERROR: 'list/DELETE_MANUTENCAO_ERROR',

  INSERT_MANUTENCAO: 'form/INSERT_MANUTENCAO',
  INSERT_MANUTENCAO_START: 'form/INSERT_MANUTENCAO_START',
  INSERT_MANUTENCAO_SUCCESS: 'form/INSERT_MANUTENCAO_SUCCESS',
  INSERT_MANUTENCAO_ERROR: 'form/INSERT_MANUTENCAO_ERROR',

  EDIT_MANUTENCAO: 'form/EDIT_MANUTENCAO',
  EDIT_MANUTENCAO_START: 'form/EDIT_MANUTENCAO_START',
  EDIT_MANUTENCAO_SUCCESS: 'form/EDIT_MANUTENCAO_SUCCESS',
  EDIT_MANUTENCAO_ERROR: 'form/EDIT_MANUTENCAO_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE MANUTENCAOS **/
  buscaListManutencoes : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_MANUTENCAO,
    query: {            
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy,
      solicitante: filter.solicitante, 
    }
  }),

  buscaListManutencoesStart : () => ({  
    type: Types.BUSCA_LIST_MANUTENCAO_START,
    loading: true,
    erro: false
  }),

  buscaListManutencoesSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_MANUTENCAO_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaListManutencoesError : () => ({
    type: Types.BUSCA_LIST_MANUTENCAO_ERROR,
    loading: false,
    erro: true
  }),

  /** DELETA A MANUTENCAOS DA LISTA **/
  deleteManutencao: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_MANUTENCAO,
    itemSelected,
    query: {       
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteManutencaoStart : () => ({  
    type: Types.DELETE_MANUTENCAO_START,
    loading: true,
    erro: false
  }),

  deleteManutencaoSucess: () => ({
    type: Types.DELETE_MANUTENCAO_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteManutencaoError: () => ({
    type: Types.DELETE_MANUTENCAO_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A MANUTENCAOS **/
  insertManutencao: (result, idInsumo) => ({
    type: Types.INSERT_MANUTENCAO,
    manutencao: { 
      descricao: result.descricao,
      solicitante: result.solicitante, 
      insumo: {
        id: idInsumo
      },
    }
  }),

  insertManutencaoStart : () => ({  
    type: Types.INSERT_MANUTENCAO_START,
    loading: true,
    erro: false
  }),

  insertManutencaoSucess: () => ({
    type: Types.INSERT_MANUTENCAO_SUCCESS,
    loading: false,
    erro: false
  }),

  insertManutencaoError: () => ({
    type: Types.INSERT_MANUTENCAO_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A MANUTENCAO **/
  editManutencao: (result, dataInicio, dataFim, idInsumo, finalizar) => ({
    type: Types.EDIT_MANUTENCAO,    
    manutencao: { 
      id: result.id,
      dataFim: moment(dataFim).format('DD/MM/YYYY HH:mm'),
      dataInicio: moment(dataInicio).format('DD/MM/YYYY HH:mm'),
      descricao: result.descricao,    
      insumo:{
        id: idInsumo,
        status: result.status,
      },  
      parecerResponsavel: result.parecerResponsavel,
      responsavel: result.responsavel,
      solicitante: result.solicitante,
      tipo: {
        id: result.tipo
      }        
    },
    finalizar
  }),

  editManutencaoStart : () => ({  
    type: Types.EDIT_MANUTENCAO_START,
    loading: true,
    erro: false
  }),

  editManutencaoSucess: () => ({
    type: Types.EDIT_MANUTENCAO_SUCCESS,
    loading: false,
    erro: false
  }),

  editManutencaoError: () => ({
    type: Types.EDIT_MANUTENCAO_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A DETALHE DO MANUTENCAO **/
  buscaDetailManutencao : (itemSelected , idInsumo)=> ({  
    type: Types.BUSCA_DETAIL_MANUTENCAO,
    itemSelected ,
    idInsumo,
  }),

  buscaDetailManutencaoStart : () => ({  
    type: Types.BUSCA_DETAIL_MANUTENCAO_START,
    loading: true,
    erro: false
  }),

  buscaDetailManutencaoSucess : (manutencao , typesManutencao, insumo, status)=> ({
    type: Types.BUSCA_DETAIL_MANUTENCAO_SUCCESS,
    manutencao,
    insumo,
    status,
    typesManutencao,
    loading: false,
    erro: false
  }),

  buscaDetailManutencaoError : () => ({
    type: Types.BUSCA_DETAIL_MANUTENCAO_ERROR,
    loading: false,
    erro: true
  }),

}
