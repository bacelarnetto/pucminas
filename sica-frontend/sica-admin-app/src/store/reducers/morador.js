import { Types as types} from '../actions/morador';

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
  morador:'',
  barragens:[]
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_MORADOR_START:
    case types.EDIT_MORADOR_START:    
    case types.DELETE_MORADOR_START:
    case types.DELETE_MORADOR_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_DETAIL_MORADOR_START:
    case types.BUSCA_LIST_MORADOR_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_MORADOR_ERROR:
    case types.EDIT_MORADOR_ERROR:    
    case types.DELETE_MORADOR_ERROR:
    case types.BUSCA_DETAIL_MORADOR_ERROR:
    case types.BUSCA_LIST_MORADOR_ERROR:
      return {
        ...state,
        loading: false,
        erro: true,
        codigoErro: action.codigoErro
      };

    case types.BUSCA_LIST_MORADOR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_DETAIL_MORADOR_SUCCESS:
      return {
        ...state,
        loading: false,
        morador: action.morador,
        barragens: action.barragens,
      };

    case types.INSERT_MORADOR_SUCCESS:
    case types.EDIT_MORADOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
