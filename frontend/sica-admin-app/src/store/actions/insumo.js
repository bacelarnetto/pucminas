import moment from 'moment';
export const Types = {
  BUSCA_LIST_INSUMO: 'list/BUSCA_INSUMO',
  BUSCA_LIST_INSUMO_START: 'list/BUSCA_INSUMO_START',
  BUSCA_LIST_INSUMO_SUCCESS: 'list/BUSCA_INSUMO_SUCCESS',
  BUSCA_LIST_INSUMO_ERROR: 'list/BUSCA_INSUMO_ERROR',

  BUSCA_DETAIL_INSUMO: 'detail/BUSCA_INSUMO',
  BUSCA_DETAIL_INSUMO_START: 'detail/BUSCA_INSUMO_START',
  BUSCA_DETAIL_INSUMO_SUCCESS: 'detail/BUSCA_INSUMO_SUCCESS',
  BUSCA_DETAIL_INSUMO_ERROR: 'detail/BUSCA_INSUMO_ERROR',

  DELETE_INSUMO: 'list/DELETE_INSUMO',
  DELETE_INSUMO_START: 'list/DELETE_INSUMO_START',
  DELETE_INSUMO_SUCCESS: 'list/DELETE_INSUMO_SUCCESS',
  DELETE_INSUMO_ERROR: 'list/DELETE_INSUMO_ERROR',

  INSERT_INSUMO: 'form/INSERT_INSUMO',
  INSERT_INSUMO_START: 'form/INSERT_INSUMO_START',
  INSERT_INSUMO_SUCCESS: 'form/INSERT_INSUMO_SUCCESS',
  INSERT_INSUMO_ERROR: 'form/INSERT_INSUMO_ERROR',

  EDIT_INSUMO: 'form/EDIT_INSUMO',
  EDIT_INSUMO_START: 'form/EDIT_INSUMO_START',
  EDIT_INSUMO_SUCCESS: 'form/EDIT_INSUMO_SUCCESS',
  EDIT_INSUMO_ERROR: 'form/EDIT_INSUMO_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE INSUMOS **/
  buscaListInsumos : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_INSUMO,
    query: { 
      description: filter.descricao,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaListInsumosStart : () => ({  
    type: Types.BUSCA_LIST_INSUMO_START,
    loading: true,
    erro: false
  }),

  buscaListInsumosSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_INSUMO_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaListInsumosError : () => ({
    type: Types.BUSCA_LIST_INSUMO_ERROR,
    loading: false,
    erro: true
  }),

  /** DELETA A INSUMOS DA LISTA **/
  deleteInsumo: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_INSUMO,
    itemSelected,
    query: { 
      description: filter.descricao,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteInsumoStart : () => ({  
    type: Types.DELETE_INSUMO_START,
    loading: true,
    erro: false
  }),

  deleteInsumoSucess: () => ({
    type: Types.DELETE_INSUMO_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteInsumoError: () => ({
    type: Types.DELETE_INSUMO_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A INSUMOS **/
  insertInsumo: (result, dataCompra) => ({
    type: Types.INSERT_INSUMO,
    insumo: { 
      dataCompra: moment(dataCompra).format('DD/MM/YYYY'),
      descricao: result.descricao,
      marca: {
        id: result.marca
      },
      status: result.status,
      tipo: {
        id: result.tipo
      }   
    }
  }),

  insertInsumoStart : () => ({  
    type: Types.INSERT_INSUMO_START,
    loading: true,
    erro: false
  }),

  insertInsumoSucess: () => ({
    type: Types.INSERT_INSUMO_SUCCESS,
    loading: false,
    erro: false
  }),

  insertInsumoError: () => ({
    type: Types.INSERT_INSUMO_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A INSUMO **/
  editInsumo: (result, dataCompra) => ({
    type: Types.EDIT_INSUMO,
    insumo: { 
      id: result.id,
      dataCompra: moment(dataCompra).format('DD/MM/YYYY'),
      descricao: result.descricao,
      marca: {
        id: result.marca
      },
      status: result.status,
      tipo: {
        id: result.tipo
      }   
    }
  }),

  editInsumoStart : () => ({  
    type: Types.EDIT_INSUMO_START,
    loading: true,
    erro: false
  }),

  editInsumoSucess: () => ({
    type: Types.EDIT_INSUMO_SUCCESS,
    loading: false,
    erro: false
  }),

  editInsumoError: () => ({
    type: Types.EDIT_INSUMO_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A DETALHE DO INSUMO **/
  buscaDetailInsumo : itemSelected  => ({  
    type: Types.BUSCA_DETAIL_INSUMO,
    itemSelected 
  }),

  buscaDetailInsumoStart : () => ({  
    type: Types.BUSCA_DETAIL_INSUMO_START,
    loading: true,
    erro: false
  }),

  buscaDetailInsumoSucess : (insumo , typesInsumo, marcas, status)=> ({
    type: Types.BUSCA_DETAIL_INSUMO_SUCCESS,
    insumo,
    typesInsumo,
    marcas,
    status,
    loading: false,
    erro: false
  }),

  buscaDetailInsumoError : () => ({
    type: Types.BUSCA_DETAIL_INSUMO_ERROR,
    loading: false,
    erro: true
  }),

}

