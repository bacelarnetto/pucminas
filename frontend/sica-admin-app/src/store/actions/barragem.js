import moment from 'moment';
export const Types = {
  BUSCA_LIST_BARRAGEM: 'list/BUSCA_BARRAGEM',
  BUSCA_LIST_BARRAGEM_START: 'list/BUSCA_BARRAGEM_START',
  BUSCA_LIST_BARRAGEM_SUCCESS: 'list/BUSCA_BARRAGEM_SUCCESS',
  BUSCA_LIST_BARRAGEM_ERROR: 'list/BUSCA_BARRAGEM_ERROR',

  BUSCA_DETAIL_BARRAGEM: 'detail/BUSCA_BARRAGEM',
  BUSCA_DETAIL_BARRAGEM_START: 'detail/BUSCA_BARRAGEM_START',
  BUSCA_DETAIL_BARRAGEM_SUCCESS: 'detail/BUSCA_BARRAGEM_SUCCESS',
  BUSCA_DETAIL_BARRAGEM_ERROR: 'detail/BUSCA_BARRAGEM_ERROR',

  DELETE_BARRAGEM: 'list/DELETE_BARRAGEM',
  DELETE_BARRAGEM_START: 'list/DELETE_BARRAGEM_START',
  DELETE_BARRAGEM_SUCCESS: 'list/DELETE_BARRAGEM_SUCCESS',
  DELETE_BARRAGEM_ERROR: 'list/DELETE_BARRAGEM_ERROR',

  INSERT_BARRAGEM: 'form/INSERT_BARRAGEM',
  INSERT_BARRAGEM_START: 'form/INSERT_BARRAGEM_START',
  INSERT_BARRAGEM_SUCCESS: 'form/INSERT_BARRAGEM_SUCCESS',
  INSERT_BARRAGEM_ERROR: 'form/INSERT_BARRAGEM_ERROR',

  EDIT_BARRAGEM: 'form/EDIT_BARRAGEM',
  EDIT_BARRAGEM_START: 'form/EDIT_BARRAGEM_START',
  EDIT_BARRAGEM_SUCCESS: 'form/EDIT_BARRAGEM_SUCCESS',
  EDIT_BARRAGEM_ERROR: 'form/EDIT_BARRAGEM_ERROR',
}

export const Creators = {
  
  /** BUSCA A LISTA DE BARRAGEMS **/
  buscaListBarragens : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_BARRAGEM,
    query: { 
      description: filter.descricao,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaListBarragensStart : () => ({  
    type: Types.BUSCA_LIST_BARRAGEM_START,
    loading: true,
    erro: false
  }),

  buscaListBarragensSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_BARRAGEM_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaListBarragensError : (codigoErro) => ({
    type: Types.BUSCA_LIST_BARRAGEM_ERROR,
    loading: false,
    erro: true,
    codigoErro
  }),

  /** DELETA A BARRAGENS DA LISTA **/
  deleteBarragem: (itemSelected , filter, page, rowsPerPage, order, orderBy )=> ({
    type: Types.DELETE_BARRAGEM,
    itemSelected,
    query: { 
      description: filter.descricao,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  deleteBarragemStart : () => ({  
    type: Types.DELETE_BARRAGEM_START,
    loading: true,
    erro: false
  }),

  deleteBarragemSucess: () => ({
    type: Types.DELETE_BARRAGEM_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteBarragemError: () => ({
    type: Types.DELETE_BARRAGEM_ERROR,
    loading: false,
    erro: true
  }),

  /** CADASTRAR A BARRAGEMS **/
  insertBarragem: (result, dataConstrucao) => ({
    type: Types.INSERT_BARRAGEM,
    barragem: { 
      descricao: result.descricao,
      empreendedor: result.empreendedor,
      cnpjEmpreendedor: result.cnpjEmpreendedor,
      minerio: result.minerio,
      tipo: {
        id: result.tipo
      } ,
      alimentadoUsina: result.alimentadoUsina,
      codigoCategoriaRisco: result.codigoCategoriaRisco,
      codigoDanoPotencial: result.codigoDanoPotencial,
      codigoObjetivoContencao: result.codigoObjetivoContencao,
      codigoSituacaoOperacional: result.codigoSituacaoOperacional, 
      cidade: result.cidade,
      uf: result.uf,
      latitude: result.latitude,
      longitude: result.longitude,
      vidaUtilQuantidadeAnos: result.vidaUtilQuantidadeAnos,
      dataConstrucao: moment(dataConstrucao).format('DD/MM/YYYY')   
    }
  }),

  insertBarragemStart : () => ({  
    type: Types.INSERT_BARRAGEM_START,
    loading: true,
    erro: false
  }),

  insertBarragemSucess: () => ({
    type: Types.INSERT_BARRAGEM_SUCCESS,
    loading: false,
    erro: false
  }),

  insertBarragemError: () => ({
    type: Types.INSERT_BARRAGEM_ERROR,
    loading: false,
    erro: true
  }),

  /** EDITAR A BARRAGEM **/
  editBarragem: (result, dataConstrucao) => ({
    type: Types.EDIT_BARRAGEM,
    barragem: { 
      id: result.id,
      descricao: result.descricao,
      empreendedor: result.empreendedor,
      cnpjEmpreendedor: result.cnpjEmpreendedor,
      minerio: result.minerio,
      tipo: {
        id: result.tipo
      } ,
      alimentadoUsina: result.alimentadoUsina,
      codigoCategoriaRisco: result.codigoCategoriaRisco,
      codigoDanoPotencial: result.codigoDanoPotencial,
      codigoObjetivoContencao: result.codigoObjetivoContencao,
      codigoSituacaoOperacional: result.codigoSituacaoOperacional, 
      cidade: result.cidade,
      uf: result.uf,
      latitude: result.latitude,
      longitude: result.longitude,
      vidaUtilQuantidadeAnos: result.vidaUtilQuantidadeAnos,  
      dataConstrucao: moment(dataConstrucao).format('DD/MM/YYYY')  
    }
  }),

  editBarragemStart : () => ({  
    type: Types.EDIT_BARRAGEM_START,
    loading: true,
    erro: false
  }),

  editBarragemSucess: () => ({
    type: Types.EDIT_BARRAGEM_SUCCESS,
    loading: false,
    erro: false
  }),

  editBarragemError: () => ({
    type: Types.EDIT_BARRAGEM_ERROR,
    loading: false,
    erro: true
  }),

  /** BUSCA A DETALHE DO BARRAGEM **/
  buscaDetailBarragem : itemSelected  => ({  
    type: Types.BUSCA_DETAIL_BARRAGEM,
    itemSelected 
  }),

  buscaDetailBarragemStart : () => ({  
    type: Types.BUSCA_DETAIL_BARRAGEM_START,
    loading: true,
    erro: false
  }),

  buscaDetailBarragemSucess : (
    barragem, types, situacoesOperacionais, categoriasRisco, danosPotenciais, objetivosContencao 
  ) => ({
    type: Types.BUSCA_DETAIL_BARRAGEM_SUCCESS,
    barragem, 
    types, 
    situacoesOperacionais, 
    categoriasRisco,
    danosPotenciais,
    objetivosContencao,
    loading: false,
    erro: false
  }),

  buscaDetailBarragemError : () => ({
    type: Types.BUSCA_DETAIL_BARRAGEM_ERROR,
    loading: false,
    erro: true
  }),

}

