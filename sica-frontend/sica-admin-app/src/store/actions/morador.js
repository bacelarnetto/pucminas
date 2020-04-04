export const Types = {
  BUSCA_LIST_MORADOR: 'list/BUSCA_MORADOR',
  BUSCA_LIST_MORADOR_START: 'list/BUSCA_MORADOR_START',
  BUSCA_LIST_MORADOR_SUCCESS: 'list/BUSCA_MORADOR_SUCCESS',
  BUSCA_LIST_MORADOR_ERROR: 'list/BUSCA_MORADOR_ERROR',

  BUSCA_DETAIL_MORADOR: 'detail/BUSCA_MORADOR',
  BUSCA_DETAIL_MORADOR_START: 'detail/BUSCA_MORADOR_START',
  BUSCA_DETAIL_MORADOR_SUCCESS: 'detail/BUSCA_MORADOR_SUCCESS',
  BUSCA_DETAIL_MORADOR_ERROR: 'detail/BUSCA_MORADOR_ERROR',

  DELETE_MORADOR: 'list/DELETE_MORADOR',
  DELETE_MORADOR_START: 'list/DELETE_MORADOR_START',
  DELETE_MORADOR_SUCCESS: 'list/DELETE_MORADOR_SUCCESS',
  DELETE_MORADOR_ERROR: 'list/DELETE_MORADOR_ERROR',

  INSERT_MORADOR: 'form/INSERT_MORADOR',
  INSERT_MORADOR_START: 'form/INSERT_MORADOR_START',
  INSERT_MORADOR_SUCCESS: 'form/INSERT_MORADOR_SUCCESS',
  INSERT_MORADOR_ERROR: 'form/INSERT_MORADOR_ERROR',

  EDIT_MORADOR: 'form/EDIT_MORADOR',
  EDIT_MORADOR_START: 'form/EDIT_MORADOR_START',
  EDIT_MORADOR_SUCCESS: 'form/EDIT_MORADOR_SUCCESS',
  EDIT_MORADOR_ERROR: 'form/EDIT_MORADOR_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE MORADORS **/
  buscaListMoradores : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_MORADOR,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaListMoradoresStart : () => ({  
    type: Types.BUSCA_LIST_MORADOR_START,
    loading: true,
    erro: false
  }),

  buscaListMoradoresSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_MORADOR_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaListMoradoresError : (codigoErro) => ({
    type: Types.BUSCA_LIST_MORADOR_ERROR,
    loading: false,
    erro: true,
    codigoErro
  }),

  /** DELETA A MORADORS DA LISTA **/
  deleteMorador: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_MORADOR,
    itemSelected,
    query: { 
      description: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteMoradorStart : () => ({  
    type: Types.DELETE_MORADOR_START,
    loading: true,
    erro: false
  }),

  deleteMoradorSucess: () => ({
    type: Types.DELETE_MORADOR_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteMoradorError: () => ({
    type: Types.DELETE_MORADOR_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A MORADORS **/
  insertMorador: (result) => ({
    type: Types.INSERT_MORADOR,
    morador: { 
      nome: result.nome,
      idade: result.idade,
      email: result.email,
      cidade: result.cidade,
      endereco: result.endereco,
      bairro: result.bairro,
      numero: result.numero,
      telefone: result.telefone,
      uf:  result.uf,
      idBarragem:  result.idBarragem,      
    }
  }),

  insertMoradorStart : () => ({  
    type: Types.INSERT_MORADOR_START,
    loading: true,
    erro: false
  }),

  insertMoradorSucess: () => ({
    type: Types.INSERT_MORADOR_SUCCESS,
    loading: false,
    erro: false
  }),

  insertMoradorError: () => ({
    type: Types.INSERT_MORADOR_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A MORADOR **/
  editMorador: (result) => ({
    type: Types.EDIT_MORADOR,
    morador: { 
      id: result.id,
      nome: result.nome,
      idade: result.idade,
      email: result.email,
      cidade: result.cidade,
      endereco: result.endereco,
      bairro: result.bairro,
      numero: result.numero,
      telefone: result.telefone,
      uf:  result.uf,
      idBarragem:  result.idBarragem,  
     
    }
  }),

  editMoradorStart : () => ({  
    type: Types.EDIT_MORADOR_START,
    loading: true,
    erro: false
  }),

  editMoradorSucess: () => ({
    type: Types.EDIT_MORADOR_SUCCESS,
    loading: false,
    erro: false
  }),

  editMoradorError: () => ({
    type: Types.EDIT_MORADOR_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A DETALHE DO MORADOR **/
  buscaDetailMorador : itemSelected  => ({  
    type: Types.BUSCA_DETAIL_MORADOR,
    itemSelected 
  }),

  buscaDetailMoradorStart : () => ({  
    type: Types.BUSCA_DETAIL_MORADOR_START,
    loading: true,
    erro: false
  }),

  buscaDetailMoradorSucess : (morador, barragens)=> ({
    type: Types.BUSCA_DETAIL_MORADOR_SUCCESS,
    morador,
    barragens,
    loading: false,
    erro: false
  }),

  buscaDetailMoradorError : () => ({
    type: Types.BUSCA_DETAIL_MORADOR_ERROR,
    loading: false,
    erro: true
  }),

}

