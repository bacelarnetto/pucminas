const url = {
  BASE: 'http://192.168.56.101/gateway',
  LOGIN: '/auth/login',
  BARRAGEM_MORADOR: '/barragem/public/morador/',
  BARRAGEM_LIST: '/barragem/public/barragem/',
  BARRAGEM_BY_MORADOR: '/barragem/public/barragem-por-morador?',
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
