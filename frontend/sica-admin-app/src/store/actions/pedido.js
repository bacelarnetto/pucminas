export const Types = {
  BUSCA_LIST_PEDIDOS: 'list/BUSCA_PEDIDOS',
  BUSCA_LIST_PEDIDOS_START: 'list/BUSCA_PEDIDOS_START',
  BUSCA_LIST_PEDIDOS_SUCCESS: 'list/BUSCA_PEDIDOS_SUCCESS',
  BUSCA_LIST_PEDIDOS_ERROR: 'list/BUSCA_PEDIDOS_ERROR',

  BUSCA_PEDIDO: 'detail/BUSCA_PEDIDO',
  BUSCA_PEDIDO_START: 'detail/BUSCA_PEDIDO_START',
  BUSCA_PEDIDO_SUCCESS: 'detail/BUSCA_PEDIDO_SUCCESS',
  BUSCA_PEDIDO_ERROR: 'detail/BUSCA_PEDIDO_ERROR',

  DELETE_PEDIDO: 'list/DELETE_PEDIDO',
  DELETE_PEDIDO_START: 'list/DELETE_PEDIDO_START',
  DELETE_PEDIDO_SUCCESS: 'list/DELETE_PEDIDO_SUCCESS',
  DELETE_PEDIDO_ERROR: 'list/DELETE_PEDIDO_ERROR',

  INSERT_PEDIDO: 'form/INSERT_PEDIDO',
  INSERT_PEDIDO_START: 'form/INSERT_PEDIDO_START',
  INSERT_PEDIDO_SUCCESS: 'form/INSERT_PEDIDO_SUCCESS',
  INSERT_PEDIDO_ERROR: 'form/INSERT_PEDIDO_ERROR',

  EDIT_PEDIDO: 'form/EDIT_PEDIDO',
  EDIT_PEDIDO_START: 'form/EDIT_PEDIDO_START',
  EDIT_PEDIDO_SUCCESS: 'form/EDIT_PEDIDO_SUCCESS',
  EDIT_PEDIDO_ERROR: 'form/EDIT_PEDIDO_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE PEDIDOS **/
  buscaListPedidos : (id_fornecedor, page, rowsPerPage ) => ({  
    type: Types.BUSCA_LIST_PEDIDOS,
    query: { 
      id_fornecedor,
      page, 
      lines_per_page: rowsPerPage,
      direction: 'DESC', 
      order_by: 'instante'
    }
  }),

  buscaListPedidosStart : () => ({  
    type: Types.BUSCA_LIST_PEDIDOS_START,
    loading: true,
    erro: false
  }),

  buscaListPedidosSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_PEDIDOS_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaListPedidosError : () => ({
    type: Types.BUSCA_LIST_PEDIDOS_ERROR,
    loading: false,
    erro: true
  }),

  /** DELETA A PEDIDO DA LISTA **/
  deletePedido: (itemSelected , id_fornecedor, page, rowsPerPage)=> ({
    type: Types.DELETE_PEDIDO,
    itemSelected,
    query: { 
      id_fornecedor,
      page, 
      lines_per_page: rowsPerPage, 
      direction: 'DESC', 
      order_by: 'instante'
    }
  }),

  deletePedidoStart : () => ({  
    type: Types.DELETE_PEDIDO_START,
    loading: true,
    erro: false
  }),

  deletePedidoSucess: () => ({
    type: Types.DELETE_PEDIDO_SUCCESS,
    loading: false,
    erro: false
  }),

  deletePedidoError: () => ({
    type: Types.DELETE_PEDIDO_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A PEDIDOS **/
  insertPedido: (idFornecedorSelected, dataItens) => ({
    type: Types.INSERT_PEDIDO,
    pedido:{
      idFornecedor:idFornecedorSelected,
      itens: dataItens
    }
  }),

  insertPedidoStart : () => ({  
    type: Types.INSERT_PEDIDO_START,
    loading: true,
    erro: false
  }),

  insertPedidoSucess: () => ({
    type: Types.INSERT_PEDIDO_SUCCESS,
    loading: false,
    erro: false
  }),

  insertPedidoError: () => ({
    type: Types.INSERT_PEDIDO_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A PEDIDO **/
  editPedido: (idPedidoSelected, status, dataItens) => ({
    type: Types.EDIT_PEDIDO,
    pedido:{
      id: idPedidoSelected,
      codStatus: status,
      itens: dataItens
    }
  } ),

  editPedidoStart : () => ({  
    type: Types.EDIT_PEDIDO_START,
    loading: true,
    erro: false
  }),

  editPedidoSucess: () => ({
    type: Types.EDIT_PEDIDO_SUCCESS,
    loading: false,
    erro: false
  }),

  editPedidoError: () => ({
    type: Types.EDIT_PEDIDO_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A UM PEDIDO **/
  buscaPedido : (idPedidoSelected, idFornecedorSelected)  => ({  
    type: Types.BUSCA_PEDIDO,
    idPedidoSelected,
    idFornecedorSelected
  }),

  buscaPedidoStart : () => ({  
    type: Types.BUSCA_PEDIDO_START,
    loading: true,
    erro: false
  }),

  buscaPedidoSucess : (pedido, tiposInsumos, status) => ({
    type: Types.BUSCA_PEDIDO_SUCCESS,
    pedido,
    tiposInsumos,
    status,
    loading: false,
    erro: false
  }),

  buscaPedidoError : () => ({
    type: Types.BUSCA_PEDIDO_ERROR,
    loading: false,
    erro: true
  }),

}

