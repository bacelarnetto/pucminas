const url = {
  BASE: 'http://192.168.0.9/api',
  ENDPONIT_SOCKET_ALERT: 'http://192.168.0.9:3335',  
  LOGIN: '/auth/login',
  BARRAGEM_MORADOR: '/monitoramento/public/morador/',
  BARRAGEM_LIST: '/monitoramento/public/barragem/',
  BARRAGEM_BY_MORADOR: '/monitoramento/public/barragem-por-morador?',  
  MORADOR_BY_EMAIL: '/monitoramento/morador/detail?email=',
  MORADOR_USER: '/monitoramento/morador/user/',
  MORADOR: '/monitoramento/morador/',

}

const method = {
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
}

export default {
  url,
  method
}
