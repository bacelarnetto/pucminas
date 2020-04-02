import { combineReducers } from 'redux';
import marca from './marca'
import auth from './auth'
import insumo from './insumo'
import fornecedor from './fornecedor'
import pedido from './pedido'
import manutencao from './manutencao'
import barragem from './barragem'
import morador from './morador'
import usuario from './usuario'
import dashboard from './dashboard'

import { reducer as toastrReducer } from 'react-redux-toastr'

import { actionTypes } from './../actions/auth';

/*const rootReducer = combineReducers({
  toastr: toastrReducer,
  auth,
  marca,
  insumo,  
  fornecedor,
  pedido,
  manutencao,
  barragem,
  morador
});*/


// Combine all reducers.
const appReducer = combineReducers({
  toastr: toastrReducer,
  auth,
  marca,
  insumo,  
  fornecedor,
  pedido,
  manutencao,
  barragem,
  morador,
  usuario,
  dashboard
});

const rootReducer = (state, action) => {   
  // Clear all data in redux store to initial.
  if(action.type === actionTypes.AUTH_LOGOUT)
    state = undefined;
  
  return appReducer(state, action);
};

export default rootReducer;
