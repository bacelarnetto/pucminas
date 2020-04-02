import { Types as types} from '../actions/usuario';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  itemSelected: 0,
  erro: false,
  codigoErro: 0,
  showMessage: '',
  usuario:''
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_USUARIO_START:
    case types.EDIT_USUARIO_START:
    case types.BUSCA_USUARIO_START:
    case types.DELETE_USUARIO_START:
    case types.DELETE_USUARIO_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_LIST_USUARIO_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_USUARIO_ERROR:
    case types.EDIT_USUARIO_ERROR:
    case types.BUSCA_USUARIO_ERROR:
    case types.DELETE_USUARIO_ERROR:
    case types.BUSCA_LIST_USUARIO_ERROR:
      return {
        ...state,
        loading: false,
        erro: true,
        codigoErro: action.codigoErro
      };

    case types.BUSCA_LIST_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        usuario: action.usuario,
      };

    case types.INSERT_USUARIO_SUCCESS:
    case types.EDIT_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
