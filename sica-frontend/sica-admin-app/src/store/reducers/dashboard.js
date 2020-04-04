import { Types as types} from '../actions/dashboard';

const INITIAL_STATE = {
  loading: false, 
  qntInsumo: 0,
  qntManutencao: 0,
  qntBarragem: 0,
  qntMorador: 0,
  resumeBarragemMorador: [],
  resumeBarragemMoradorRiscoAlto: [],
  listQntMoradores: [],
  listBarragem: [],
  listColor: [],
  listColorRisco: [],
  listColorRiscoAlto:[],
  listQntMoradoresRiscoAlto:[],
  listBarragemRiscoAlto:[],
  erro: false,
  codigoErro: 0,
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.BUSCA_DASHBOARD_START:
      return {
        ...state,
        loading: true
      };
  
    case types.BUSCA_DASHBOARD_ERROR:
      return {
        ...state,
        loading: false,
        erro: true,
        codigoErro: action.codigoErro
      };

    case types.BUSCA_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        qntInsumo: action.qntInsumo,
        qntManutencao: action.qntManutencao,
        qntBarragem: action.qntBarragem,
        qntMorador: action.qntMorador,
        resumeBarragemMorador: action.resumeBarragemMorador,
        resumeBarragemMoradorRiscoAlto: action.resumeBarragemMoradorRiscoAlto,
        listQntMoradores: action.listQntMoradores,
        listBarragem: action.listBarragem,
        listColor: action.listColor,
        listColorRiscoAlto: action.listColorRiscoAlto,
        listQntMoradoresRiscoAlto: action.listQntMoradoresRiscoAlto,
        listBarragemRiscoAlto: action.listBarragemRiscoAlto
      };

    default: return state;
    
  }
       
}
