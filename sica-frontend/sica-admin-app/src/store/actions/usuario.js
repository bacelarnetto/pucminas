export const Types = {
  BUSCA_LIST_USUARIO: 'list/BUSCA_USUARIO',
  BUSCA_LIST_USUARIO_START: 'list/BUSCA_USUARIO_START',
  BUSCA_LIST_USUARIO_SUCCESS: 'list/BUSCA_USUARIO_SUCCESS',
  BUSCA_LIST_USUARIO_ERROR: 'list/BUSCA_USUARIO_ERROR',

  BUSCA_USUARIO: 'detail/BUSCA_USUARIO',
  BUSCA_USUARIO_START: 'detail/BUSCA_USUARIO_START',
  BUSCA_USUARIO_SUCCESS: 'detail/BUSCA_USUARIO_SUCCESS',
  BUSCA_USUARIO_ERROR: 'detail/BUSCA_USUARIO_ERROR',

  DELETE_USUARIO: 'list/DELETE_USUARIO',
  DELETE_USUARIO_START: 'list/DELETE_USUARIO_START',
  DELETE_USUARIO_SUCCESS: 'list/DELETE_USUARIO_SUCCESS',
  DELETE_USUARIO_ERROR: 'list/DELETE_USUARIO_ERROR',

  INSERT_USUARIO: 'form/INSERT_USUARIO',
  INSERT_USUARIO_START: 'form/INSERT_USUARIO_START',
  INSERT_USUARIO_SUCCESS: 'form/INSERT_USUARIO_SUCCESS',
  INSERT_USUARIO_ERROR: 'form/INSERT_USUARIO_ERROR',

  EDIT_USUARIO: 'form/EDIT_USUARIO',
  EDIT_USUARIO_START: 'form/EDIT_USUARIO_START',
  EDIT_USUARIO_SUCCESS: 'form/EDIT_USUARIO_SUCCESS',
  EDIT_USUARIO_ERROR: 'form/EDIT_USUARIO_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE USUARIOS **/
  buscaListUsuarios : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_USUARIO,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaListUsuariosStart : () => ({  
    type: Types.BUSCA_LIST_USUARIO_START,
    loading: true,
    erro: false,
    codigoErro: 0
  }),

  buscaListUsuariosSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_USUARIO_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false,
    codigoErro: 0
  }),

  buscaListUsuariosError : (codigoErro) => ({
    type: Types.BUSCA_LIST_USUARIO_ERROR,
    loading: false,
    erro: true,
    codigoErro
  }),

  /** DELETA A USUARIOS DA LISTA **/
  deleteUsuarios: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_USUARIO,
    itemSelected,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteUsuariosStart : () => ({  
    type: Types.DELETE_USUARIO_START,
    loading: true,
    erro: false
  }),

  deleteUsuariosSucess: () => ({
    type: Types.DELETE_USUARIO_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteUsuariosError: () => ({
    type: Types.DELETE_USUARIO_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A USUARIOS **/
  insertUsuario: usuario => ({
    type: Types.INSERT_USUARIO,
    usuario
  }),

  insertUsuarioStart : () => ({  
    type: Types.INSERT_USUARIO_START,
    loading: true,
    erro: false
  }),

  insertUsuarioSucess: () => ({
    type: Types.INSERT_USUARIO_SUCCESS,
    loading: false,
    erro: false
  }),

  insertUsuarioError: () => ({
    type: Types.INSERT_USUARIO_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A USUARIO **/
  editUsuario: usuario => ({
    type: Types.EDIT_USUARIO,
    usuario
  }),

  editUsuarioStart : () => ({  
    type: Types.EDIT_USUARIO_START,
    loading: true,
    erro: false
  }),

  editUsuarioSucess: () => ({
    type: Types.EDIT_USUARIO_SUCCESS,
    loading: false,
    erro: false
  }),

  editUsuarioError: () => ({
    type: Types.EDIT_USUARIO_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A UM USUARIO **/
  buscaUsuario : itemSelected  => ({  
    type: Types.BUSCA_USUARIO,
    itemSelected 
  }),

  buscaUsuarioStart : () => ({  
    type: Types.BUSCA_USUARIO_START,
    loading: true,
    erro: false
  }),

  buscaUsuarioSucess : usuario => ({
    type: Types.BUSCA_USUARIO_SUCCESS,
    usuario,
    loading: false,
    erro: false
  }),

  buscaUsuarioError : () => ({
    type: Types.BUSCA_USUARIO_ERROR,
    loading: false,
    erro: true
  }),

}

