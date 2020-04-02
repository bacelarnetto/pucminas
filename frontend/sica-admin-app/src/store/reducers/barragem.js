import { Types as types} from '../actions/barragem';

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
  barragem:'',
  types: [],
  situacoesOperacionais: [], 
  categoriasRisco: [],
  danosPotenciais: [],
  objetivosContencao: [],
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_BARRAGEM_START:
    case types.EDIT_BARRAGEM_START:    
    case types.DELETE_BARRAGEM_START:
    case types.DELETE_BARRAGEM_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_DETAIL_BARRAGEM_START:
    case types.BUSCA_LIST_BARRAGEM_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_BARRAGEM_ERROR:
    case types.EDIT_BARRAGEM_ERROR:    
    case types.DELETE_BARRAGEM_ERROR:
    case types.BUSCA_DETAIL_BARRAGEM_ERROR:
    case types.BUSCA_LIST_BARRAGEM_ERROR:
      return {
        ...state,
        loading: false,
        erro: true,
        codigoErro: action.codigoErro
      };

    case types.BUSCA_LIST_BARRAGEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_DETAIL_BARRAGEM_SUCCESS:
      return {
        ...state,
        loading: false,
        barragem: action.barragem,
        types: action.types, 
        situacoesOperacionais: action.situacoesOperacionais, 
        categoriasRisco: action.categoriasRisco,
        danosPotenciais: action.danosPotenciais,
        objetivosContencao: action.objetivosContencao,
      };

    case types.INSERT_BARRAGEM_SUCCESS:
    case types.EDIT_BARRAGEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}
