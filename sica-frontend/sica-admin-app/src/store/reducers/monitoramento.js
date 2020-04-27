import { Types as types} from '../actions/monitoramento';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  nomeBarragem: '',
  listDates: [],
  listVolumes: [],
  listTemperaturas: [],
  listMovimentacoes: [],
  listPressoes: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  itemSelected: 0,
  erro: false,
  codigoErro: 0,
  showMessage: '',
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {


    case types.BUSCA_DETALHE_MONITORAMENTO_START:
      return {
        ...state,
        loading: true
      };

    case types.BUSCA_DETALHE_MONITORAMENTO_ERROR:
      return {
        ...state,
        loading: false,
        erro: true,
        codigoErro: action.codigoErro
      };

    case types.BUSCA_DETALHE_MONITORAMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        nomeBarragem: action.nomeBarragem,
        listDates: action.listDates,
        listVolumes: action.listVolumes,
        listTemperaturas: action.listTemperaturas,
        listMovimentacoes: action.listMovimentacoes,
        listPressoes: action.listPressoes,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };


    default: return state;
    
  }
       
}
