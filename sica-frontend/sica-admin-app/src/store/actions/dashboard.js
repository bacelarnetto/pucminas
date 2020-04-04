export const Types = { 

  BUSCA_DASHBOARD: 'detail/BUSCA_DASHBOARD',
  BUSCA_DASHBOARD_START: 'detail/BUSCA_DASHBOARD_START',
  BUSCA_DASHBOARD_SUCCESS: 'detail/BUSCA_DASHBOARD_SUCCESS',
  BUSCA_DASHBOARD_ERROR: 'detail/BUSCA_DASHBOARD_ERROR',
  
}

export const Creators = {
  
  /** BUSCA A UM DASHBOARD **/
  buscaDashboard : () => ({  
    type: Types.BUSCA_DASHBOARD
  }),

  buscaDashboardStart : () => ({  
    type: Types.BUSCA_DASHBOARD_START,
    loading: true,
    erro: false
  }),

  buscaDashboardSucess : (
    qntInsumo,
    qntManutencao,
    qntBarragem,
    qntMorador,
    resumeBarragemMorador,
    resumeBarragemMoradorRiscoAlto,
    listQntMoradores,
    listBarragem,
    listColor,
    listColorRiscoAlto,
    listQntMoradoresRiscoAlto,
    listBarragemRiscoAlto
  ) => ({
    type: Types.BUSCA_DASHBOARD_SUCCESS,
    qntInsumo,
    qntManutencao,
    qntBarragem,
    qntMorador,
    resumeBarragemMorador,
    resumeBarragemMoradorRiscoAlto,
    listQntMoradores,
    listBarragem,
    listColor,
    listColorRiscoAlto,
    listQntMoradoresRiscoAlto,
    listBarragemRiscoAlto,
    loading: false,
    erro: false
  }),

  buscaDashboardError : () => ({
    type: Types.BUSCA_DASHBOARD_ERROR,
    loading: false,
    erro: true
  }),

}

