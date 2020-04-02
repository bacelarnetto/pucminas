import { Types as types} from '../actions/manutencao';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  itemSelected: 0,
  idInsumo: 0,
  insumo: '', 
  erro: false,
  showMessage: '',
  manutencao:'',
  typesManutencao:[],
  status: [],
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_MANUTENCAO_START:
    case types.EDIT_MANUTENCAO_START:    
    case types.DELETE_MANUTENCAO_START:
    case types.DELETE_MANUTENCAO_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_DETAIL_MANUTENCAO_START:
    case types.BUSCA_LIST_MANUTENCAO_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_MANUTENCAO_ERROR:
    case types.EDIT_MANUTENCAO_ERROR:    
    case types.DELETE_MANUTENCAO_ERROR:
    case types.BUSCA_DETAIL_MANUTENCAO_ERROR:
    case types.BUSCA_LIST_MANUTENCAO_ERROR:
      return {
        ...state,
        loading: false,
        erro: true
      };

    case types.BUSCA_LIST_MANUTENCAO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_DETAIL_MANUTENCAO_SUCCESS:
      return {
        ...state,
        loading: false,
        manutencao: action.manutencao,
        typesManutencao: action.typesManutencao,
        insumo: action.insumo,
        status: action.status,
      };

    case types.INSERT_MANUTENCAO_SUCCESS:
    case types.EDIT_MANUTENCAO_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
