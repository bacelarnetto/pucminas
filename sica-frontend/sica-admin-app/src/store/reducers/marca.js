import { Types as types} from '../actions/marca';

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
  marca:''
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_MARCA_START:
    case types.EDIT_MARCA_START:
    case types.BUSCA_MARCA_START:
    case types.DELETE_MARCA_START:
    case types.DELETE_MARCA_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_LIST_MARCA_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_MARCA_ERROR:
    case types.EDIT_MARCA_ERROR:
    case types.BUSCA_MARCA_ERROR:
    case types.DELETE_MARCA_ERROR:
    case types.BUSCA_LIST_MARCA_ERROR:
      return {
        ...state,
        loading: false,
        erro: true,
        codigoErro: action.codigoErro
      };

    case types.BUSCA_LIST_MARCA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_MARCA_SUCCESS:
      return {
        ...state,
        loading: false,
        marca: action.marca,
      };

    case types.INSERT_MARCA_SUCCESS:
    case types.EDIT_MARCA_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
