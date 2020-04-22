const url = {
  BASE: 'http://192.168.56.101/gateway',
  LOGIN: '/auth/login',
  BARRAGEM_MORADOR: '/monitoramento/public/morador/',
  BARRAGEM_LIST: '/monitoramento/public/barragem/',
  BARRAGEM_BY_MORADOR: '/monitoramento/public/barragem-por-morador?',
};

const method = {
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
};

export default {
  url,
  method,
};
