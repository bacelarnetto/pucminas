export const Types = {
  BUSCA_LIST_FORNECEDORES: 'list/BUSCA_FORNECEDORES',
  BUSCA_LIST_FORNECEDORES_START: 'list/BUSCA_FORNECEDORES_START',
  BUSCA_LIST_FORNECEDORES_SUCCESS: 'list/BUSCA_FORNECEDORES_SUCCESS',
  BUSCA_LIST_FORNECEDORES_ERROR: 'list/BUSCA_FORNECEDORES_ERROR',

  BUSCA_FORNECEDOR: 'detail/BUSCA_FORNECEDOR',
  BUSCA_FORNECEDOR_START: 'detail/BUSCA_FORNECEDOR_START',
  BUSCA_FORNECEDOR_SUCCESS: 'detail/BUSCA_FORNECEDOR_SUCCESS',
  BUSCA_FORNECEDOR_ERROR: 'detail/BUSCA_FORNECEDOR_ERROR',

  DELETE_FORNECEDOR: 'list/DELETE_FORNECEDOR',
  DELETE_FORNECEDOR_START: 'list/DELETE_FORNECEDOR_START',
  DELETE_FORNECEDOR_SUCCESS: 'list/DELETE_FORNECEDOR_SUCCESS',
  DELETE_FORNECEDOR_ERROR: 'list/DELETE_FORNECEDOR_ERROR',

  INSERT_FORNECEDOR: 'form/INSERT_FORNECEDOR',
  INSERT_FORNECEDOR_START: 'form/INSERT_FORNECEDOR_START',
  INSERT_FORNECEDOR_SUCCESS: 'form/INSERT_FORNECEDOR_SUCCESS',
  INSERT_FORNECEDOR_ERROR: 'form/INSERT_FORNECEDOR_ERROR',

  EDIT_FORNECEDOR: 'form/EDIT_FORNECEDOR',
  EDIT_FORNECEDOR_START: 'form/EDIT_FORNECEDOR_START',
  EDIT_FORNECEDOR_SUCCESS: 'form/EDIT_FORNECEDOR_SUCCESS',
  EDIT_FORNECEDOR_ERROR: 'form/EDIT_FORNECEDOR_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE FORNECEDORES **/
  buscaListFornecedores : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_FORNECEDORES,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaListFornecedoresStart : () => ({  
    type: Types.BUSCA_LIST_FORNECEDORES_START,
    loading: true,
    erro: false
  }),

  buscaListFornecedoresSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_FORNECEDORES_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaListFornecedoresError : () => ({
    type: Types.BUSCA_LIST_FORNECEDORES_ERROR,
    loading: false,
    erro: true
  }),

  /** DELETA A FORNECEDOR DA LISTA **/
  deleteFornecedor: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_FORNECEDOR,
    itemSelected,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteFornecedorStart : () => ({  
    type: Types.DELETE_FORNECEDOR_START,
    loading: true,
    erro: false
  }),

  deleteFornecedorSucess: () => ({
    type: Types.DELETE_FORNECEDOR_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteFornecedorError: () => ({
    type: Types.DELETE_FORNECEDOR_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A FORNECEDORS **/
  insertFornecedor: fornecedor => ({
    type: Types.INSERT_FORNECEDOR,
    fornecedor
  }),

  insertFornecedorStart : () => ({  
    type: Types.INSERT_FORNECEDOR_START,
    loading: true,
    erro: false
  }),

  insertFornecedorSucess: () => ({
    type: Types.INSERT_FORNECEDOR_SUCCESS,
    loading: false,
    erro: false
  }),

  insertFornecedorError: () => ({
    type: Types.INSERT_FORNECEDOR_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A FORNECEDOR **/
  editFornecedor: fornecedor => ({
    type: Types.EDIT_FORNECEDOR,
    fornecedor
  }),

  editFornecedorStart : () => ({  
    type: Types.EDIT_FORNECEDOR_START,
    loading: true,
    erro: false
  }),

  editFornecedorSucess: () => ({
    type: Types.EDIT_FORNECEDOR_SUCCESS,
    loading: false,
    erro: false
  }),

  editFornecedorError: () => ({
    type: Types.EDIT_FORNECEDOR_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A UM FORNECEDOR **/
  buscaFornecedor : itemSelected  => ({  
    type: Types.BUSCA_FORNECEDOR,
    itemSelected 
  }),

  buscaFornecedorStart : () => ({  
    type: Types.BUSCA_FORNECEDOR_START,
    loading: true,
    erro: false
  }),

  buscaFornecedorSucess : fornecedor => ({
    type: Types.BUSCA_FORNECEDOR_SUCCESS,
    fornecedor,
    loading: false,
    erro: false
  }),

  buscaFornecedorError : () => ({
    type: Types.BUSCA_FORNECEDOR_ERROR,
    loading: false,
    erro: true
  }),

}

