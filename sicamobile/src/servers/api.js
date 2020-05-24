import axios from 'axios';
import globalTypes from './../common/constants/GlobalTypes'

const api = axios.create({
  baseURL: globalTypes.url.BASE ,
});

export default api;
