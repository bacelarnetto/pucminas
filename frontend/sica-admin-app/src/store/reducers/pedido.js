import { Types as types} from '../actions/pedido';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  idPedidoSelected: 0,
  idFornecedorSelected: 0,
  erro: false,
  showMessage: '',
  pedido: '',
  fornedor: '',
  tiposInsumos: {},
  status:[],
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_PEDIDO_START:
    case types.EDIT_PEDIDO_START:
    case types.BUSCA_PEDIDO_START:
    case types.DELETE_PEDIDO_START:
    case types.DELETE_PEDIDO_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_LIST_PEDIDOS_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_PEDIDO_ERROR:
    case types.EDIT_PEDIDO_ERROR:
    case types.BUSCA_PEDIDO_ERROR:
    case types.DELETE_PEDIDO_ERROR:
    case types.BUSCA_LIST_PEDIDOS_ERROR:
      return {
        ...state,
        loading: false,
        erro: true
      };

    case types.BUSCA_LIST_PEDIDOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_PEDIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        pedido: action.pedido,
        tiposInsumos: action.tiposInsumos,
        status: action.status
      };

    case types.INSERT_PEDIDO_SUCCESS:
    case types.EDIT_PEDIDO_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
