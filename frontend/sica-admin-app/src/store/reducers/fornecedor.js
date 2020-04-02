import { Types as types} from '../actions/fornecedor';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  itemSelected: 0,
  erro: false,
  showMessage: '',
  fornecedor:''
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_FORNECEDOR_START:
    case types.EDIT_FORNECEDOR_START:
    case types.BUSCA_FORNECEDOR_START:
    case types.DELETE_FORNECEDOR_START:
    case types.DELETE_FORNECEDOR_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_LIST_FORNECEDORES_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_FORNECEDOR_ERROR:
    case types.EDIT_FORNECEDOR_ERROR:
    case types.BUSCA_FORNECEDOR_ERROR:
    case types.DELETE_FORNECEDOR_ERROR:
    case types.BUSCA_LIST_FORNECEDORES_ERROR:
      return {
        ...state,
        loading: false,
        erro: true
      };

    case types.BUSCA_LIST_FORNECEDORES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_FORNECEDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        fornecedor: action.fornecedor,
      };

    case types.INSERT_FORNECEDOR_SUCCESS:
    case types.EDIT_FORNECEDOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
