import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import { Types as types, Creators as actions } from '../actions/morador';
import { MoradorService as service }  from './../../servers/morador'
import { BarragemService as barragemService }  from './../../servers/barragem'

import {  isEdit }  from './../../common/util';

function* buscaListMoradoresSaga(action) {
  yield put(actions.buscaListMoradoresStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const moradores = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListMoradoresSucess(moradores, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListMoradoresError(error.codigoErro))
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaDetailMoradorSaga(action) {
  yield put(actions.buscaDetailMoradorStart())
  try {    
    let morador = null
    if (isEdit(action.itemSelected)){
      let rspMorador = yield service.findMoradorById(action.itemSelected);
      morador = rspMorador.data;
    } 
    const barragens = yield barragemService.findList()
    yield put(actions.buscaDetailMoradorSucess(morador, barragens)) 
  } catch (error) {
    yield put(actions.buscaDetailMoradorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteMoradorSaga(action) {
  yield put(actions.deleteMoradorStart())
  try {    
    const responseDelete = yield service.deleteMorador(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteMoradorSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListMoradoresStart()) 
      const responseList = yield service.findListPagination(action.query);
      const moradores = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListMoradoresSucess(moradores, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteMoradorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editMoradorSaga(action) {
  yield put(actions.editMoradorStart())
  try {    
    const response = yield service.submitMorador(action.morador); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editMoradorSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editMoradorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertMoradorSaga(action) {
  yield put(actions.insertMoradorStart())
  try {    
    const response = yield service.submitMorador(action.morador); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertMoradorSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertMoradorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchMorador() {
  yield all([
    takeEvery(types.BUSCA_LIST_MORADOR, buscaListMoradoresSaga),
    takeEvery(types.BUSCA_DETAIL_MORADOR, buscaDetailMoradorSaga) ,
    takeLatest(types.INSERT_MORADOR, insertMoradorSaga),
    takeLatest(types.DELETE_MORADOR, deleteMoradorSaga),
    takeLatest(types.EDIT_MORADOR, editMoradorSaga),   
  ]);
}
