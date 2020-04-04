export const Types = {
  BUSCA_LIST_MARCA: 'list/BUSCA_MARCA',
  BUSCA_LIST_MARCA_START: 'list/BUSCA_MARCA_START',
  BUSCA_LIST_MARCA_SUCCESS: 'list/BUSCA_MARCA_SUCCESS',
  BUSCA_LIST_MARCA_ERROR: 'list/BUSCA_MARCA_ERROR',

  BUSCA_MARCA: 'detail/BUSCA_MARCA',
  BUSCA_MARCA_START: 'detail/BUSCA_MARCA_START',
  BUSCA_MARCA_SUCCESS: 'detail/BUSCA_MARCA_SUCCESS',
  BUSCA_MARCA_ERROR: 'detail/BUSCA_MARCA_ERROR',

  DELETE_MARCA: 'list/DELETE_MARCA',
  DELETE_MARCA_START: 'list/DELETE_MARCA_START',
  DELETE_MARCA_SUCCESS: 'list/DELETE_MARCA_SUCCESS',
  DELETE_MARCA_ERROR: 'list/DELETE_MARCA_ERROR',

  INSERT_MARCA: 'form/INSERT_MARCA',
  INSERT_MARCA_START: 'form/INSERT_MARCA_START',
  INSERT_MARCA_SUCCESS: 'form/INSERT_MARCA_SUCCESS',
  INSERT_MARCA_ERROR: 'form/INSERT_MARCA_ERROR',

  EDIT_MARCA: 'form/EDIT_MARCA',
  EDIT_MARCA_START: 'form/EDIT_MARCA_START',
  EDIT_MARCA_SUCCESS: 'form/EDIT_MARCA_SUCCESS',
  EDIT_MARCA_ERROR: 'form/EDIT_MARCA_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE MARCAS **/
  buscaListMarcas : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_MARCA,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaListMarcasStart : () => ({  
    type: Types.BUSCA_LIST_MARCA_START,
    loading: true,
    erro: false,
    codigoErro: 0
  }),

  buscaListMarcasSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_MARCA_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false,
    codigoErro: 0
  }),

  buscaListMarcasError : (codigoErro) => ({
    type: Types.BUSCA_LIST_MARCA_ERROR,
    loading: false,
    erro: true,
    codigoErro
  }),

  /** DELETA A MARCAS DA LISTA **/
  deleteMarcas: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_MARCA,
    itemSelected,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteMarcasStart : () => ({  
    type: Types.DELETE_MARCA_START,
    loading: true,
    erro: false
  }),

  deleteMarcasSucess: () => ({
    type: Types.DELETE_MARCA_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteMarcasError: () => ({
    type: Types.DELETE_MARCA_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A MARCAS **/
  insertMarca: marca => ({
    type: Types.INSERT_MARCA,
    marca
  }),

  insertMarcaStart : () => ({  
    type: Types.INSERT_MARCA_START,
    loading: true,
    erro: false
  }),

  insertMarcaSucess: () => ({
    type: Types.INSERT_MARCA_SUCCESS,
    loading: false,
    erro: false
  }),

  insertMarcaError: () => ({
    type: Types.INSERT_MARCA_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A MARCA **/
  editMarca: marca => ({
    type: Types.EDIT_MARCA,
    marca
  }),

  editMarcaStart : () => ({  
    type: Types.EDIT_MARCA_START,
    loading: true,
    erro: false
  }),

  editMarcaSucess: () => ({
    type: Types.EDIT_MARCA_SUCCESS,
    loading: false,
    erro: false
  }),

  editMarcaError: () => ({
    type: Types.EDIT_MARCA_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A UM MARCA **/
  buscaMarca : itemSelected  => ({  
    type: Types.BUSCA_MARCA,
    itemSelected 
  }),

  buscaMarcaStart : () => ({  
    type: Types.BUSCA_MARCA_START,
    loading: true,
    erro: false
  }),

  buscaMarcaSucess : marca => ({
    type: Types.BUSCA_MARCA_SUCCESS,
    marca,
    loading: false,
    erro: false
  }),

  buscaMarcaError : () => ({
    type: Types.BUSCA_MARCA_ERROR,
    loading: false,
    erro: true
  }),

}

