const url = {
  BASE: process.env.REACT_APP_BACKEND_SICA || 'http://localhost:8080/gateway',
  LOGIN: '/auth/login',
  // API DE ATIVOS
  ATIVO_MARCA_LIST_PAGE: '/ativo/marca/list-page?',
  ATIVO_MARCA_LIST: '/ativo/marca/list',
  ATIVO_MARCA: '/ativo/marca/',

  ATIVO_INSUMO_LIST_PAGE: '/ativo/insumo/list-page?',
  ATIVO_INSUMO: '/ativo/insumo/',
  ATIVO_INSUMO_TIPOS: '/ativo/insumo/types',
  ATIVO_INSUMO_STATUS: '/ativo/insumo/status',
  ATIVO_INSUMO_QNT: '/ativo/insumo/qnt-insumo',     

  ATIVO_FORNECEDOR_LIST_PAGE: '/ativo/fornecedor/list-page?',
  ATIVO_FORNECEDOR_LIST: '/ativo/fornecedor/list',
  ATIVO_FORNECEDOR: '/ativo/fornecedor/',

  ATIVO_PEDIDO_LIST_PAGE: '/ativo/pedido/list-page?',
  ATIVO_PEDIDO_LIST: '/ativo/pedido/list',
  ATIVO_PEDIDO: '/ativo/pedido/',
  ATIVO_PEDIDO_STATUS: '/ativo/pedido/status',

  ATIVO_MANUTENCAO_LIST_PAGE: '/ativo/manutencao/list-page?',
  ATIVO_MANUTENCAO: '/ativo/manutencao/',
  ATIVO_MANUTENCAO_TIPOS: '/ativo/manutencao/types',
  ATIVO_MANUTENCAO_FINALIZAR: '/ativo/manutencao/finalizar/',
  ATIVO_MANUTENCAO_QNT: '/ativo/manutencao/qnt-manutencao',

  // API DE BARRAGEM
  BARRAGEM_LIST_PAGE: '/barragem/barragem/list-page?',
  BARRAGEM: '/barragem/barragem/',
  BARRAGEM_TIPOS: 'barragem/barragem/types',
  BARRAGEM_LIST_CATEGORIAS_RISCO: '/barragem/barragem/lista-categorias-risco',
  BARRAGEM_LIST_DANOS_POTENCIAIS: '/barragem/barragem/lista-danos-potenciais',
  BARRAGEM_LIST_OBJETIVOS_CONTENCAO: '/barragem/barragem/lista-objetivos-contencao',
  BARRAGEM_LIST_SITUACOES_OPERACIONAIS: '/barragem/barragem/lista-situacoes-operacionais', 
  BARRAGEM_LIST: '/barragem/public/barragem/',
  BARRAGEM_QNT:'barragem/barragem/qnt-barragem',
  BARRAGEM_QNT_ALERT:'barragem/barragem/qnt-barragem-alert',

  BARRAGEM_MORADOR_RESUMO:'/barragem/barragem/list-barragem-morador',
  BARRAGEM_MORADOR_RESUMO_RISCO_ALTO: '/barragem/barragem/list-barragem-morador-risco-alto',

  BARRAGEM_MORADOR_LIST_PAGE: '/barragem/morador/list-page?',
  BARRAGEM_MORADOR: '/barragem/morador/',
  BARRAGEM_MORADOR_QNT:'/barragem/morador/qnt-morador',
  BARRAGEM_MORADOR_ENVIAR_ALERTA:'/barragem/morador/enviar-alerta',
 
  // API AUTH
  AUTH_USUARIO_LIST_PAGE: '/auth/user/list-page?',
  AUTH_USUARIO_LIST: '/auth/user/list',
  AUTH_USUARIO: '/auth/user/',
  AUTH_USUARIO_BY_EMAIL: '/auth/user/email/',

}

const method = {
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
}

const role = {
  ADMIN: 'ROLE_ADMIN', 
  USER: 'ROLE_FUNCTIONARY',
  ENGINEER: 'ROLE_ENGINEER',
  PROVIFER: 'ROLE_PROVIDER',
  RESIDENT: 'ROLE_RESIDENT',
  MECHANICAL: 'ROLE_MECHANICAL'
}

export default {
  url,
  method,
  role
}


