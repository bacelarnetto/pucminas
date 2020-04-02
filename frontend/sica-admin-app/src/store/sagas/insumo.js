import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import { Types as types, Creators as actions } from '../actions/insumo';
import { InsumoService as service }  from './../../servers/insumo'
import { MarcaService as marcaService }  from './../../servers/marca'

import {  isEdit }  from './../../common/util';

function* buscaListInsumosSaga(action) {
  yield put(actions.buscaListInsumosStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const insumos = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListInsumosSucess(insumos, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListInsumosError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaDetailInsumoSaga(action) {
  yield put(actions.buscaDetailInsumoStart())
  try {    
    let insumo = null
    if (isEdit(action.itemSelected)){
      let rspInsumo = yield service.findInsumoById(action.itemSelected);
      insumo = rspInsumo.data;
    }
    let rspTypes = yield service.findTypesInsumo();
    const types = rspTypes.data;
    let rspMarcas = yield marcaService.findAllMarca();    
    const marcas = rspMarcas.data;  
    let rspStatus = yield service.findStatusInsumo();    
    const status = rspStatus.data;   
    yield put(actions.buscaDetailInsumoSucess(insumo, types, marcas, status)) 
  } catch (error) {
    yield put(actions.buscaDetailInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteInsumoSaga(action) {
  yield put(actions.deleteInsumoStart())
  try {    
    const responseDelete = yield service.deleteInsumo(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteInsumoSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListInsumosStart()) 
      const responseList = yield service.findListPagination(action.query);
      const insumos = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListInsumosSucess(insumos, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editInsumoSaga(action) {
  yield put(actions.editInsumoStart())
  try {    
    const response = yield service.submitInsumo(action.insumo); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editInsumoSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertInsumoSaga(action) {
  yield put(actions.insertInsumoStart())
  try {    
    const response = yield service.submitInsumo(action.insumo); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertInsumoSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchInsumo() {
  yield all([
    takeEvery(types.BUSCA_LIST_INSUMO, buscaListInsumosSaga),
    takeEvery(types.BUSCA_DETAIL_INSUMO, buscaDetailInsumoSaga) ,
    takeLatest(types.INSERT_INSUMO, insertInsumoSaga),
    takeLatest(types.DELETE_INSUMO, deleteInsumoSaga),
    takeLatest(types.EDIT_INSUMO, editInsumoSaga),   
  ]);
}
