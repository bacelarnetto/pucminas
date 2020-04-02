import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import { Types as types, Creators as actions } from '../actions/barragem';
import { BarragemService as service }  from './../../servers/barragem'


import {  isEdit }  from './../../common/util';

function* buscaListBarragemsSaga(action) {
  yield put(actions.buscaListBarragensStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const barragems = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListBarragensSucess(barragems, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListBarragensError(error.codigoErro))
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaDetailBarragemSaga(action) {
  yield put(actions.buscaDetailBarragemStart())
  try {    
    let barragem = null
    if (isEdit(action.itemSelected)){
      let rspBarragem = yield service.findBarragemById(action.itemSelected);
      barragem = rspBarragem.data;
    } 
    let rspTypes = yield service.getTypesBarragem();
    const types = rspTypes.data;
    let rspSituacoesOperacionais = yield service.getListSituacoesOperacionais();    
    const situacoesOperacionais = rspSituacoesOperacionais.data; 
    let rspCategoriasRisco = yield service.getListCategoriasRisco();    
    const categoriasRisco = rspCategoriasRisco.data; 
    let rspDanosPotenciais = yield service.getListDanosPotenciais();    
    const danosPotenciais = rspDanosPotenciais.data; 
    let rspObjetivosContencao = yield service.getListObjetivosContencao();    
    const objetivosContencao = rspObjetivosContencao.data;    
    yield put(actions.buscaDetailBarragemSucess(
      barragem, 
      types, 
      situacoesOperacionais, 
      categoriasRisco,
      danosPotenciais,
      objetivosContencao )) 
  } catch (error) {
    yield put(actions.buscaDetailBarragemError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteBarragemSaga(action) {
  yield put(actions.deleteBarragemStart())
  try {    
    const responseDelete = yield service.deleteBarragem(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteBarragemSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListBarragensStart()) 
      const responseList = yield service.findListPagination(action.query);
      const barragems = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListBarragensSucess(barragems, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteBarragemError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editBarragemSaga(action) {
  yield put(actions.editBarragemStart())
  try {    
    const response = yield service.submitBarragem(action.barragem); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editBarragemSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editBarragemError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertBarragemSaga(action) {
  yield put(actions.insertBarragemStart())
  try {    
    const response = yield service.submitBarragem(action.barragem); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertBarragemSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertBarragemError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchBarragem() {
  yield all([
    takeEvery(types.BUSCA_LIST_BARRAGEM, buscaListBarragemsSaga),
    takeEvery(types.BUSCA_DETAIL_BARRAGEM, buscaDetailBarragemSaga) ,
    takeLatest(types.INSERT_BARRAGEM, insertBarragemSaga),
    takeLatest(types.DELETE_BARRAGEM, deleteBarragemSaga),
    takeLatest(types.EDIT_BARRAGEM, editBarragemSaga),   
  ]);
}
