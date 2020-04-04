import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import { Types as types, Creators as actions } from '../actions/manutencao';
import { ManutencaoService as service }  from './../../servers/manutencao'
import { InsumoService as insumoService }  from './../../servers/insumo'

import {  isEdit }  from './../../common/util';

function* buscaListManutencoesSaga(action) {
  yield put(actions.buscaListManutencoesStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const manutencoes = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListManutencoesSucess(manutencoes, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListManutencoesError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaDetailManutencaoSaga(action) {
  yield put(actions.buscaDetailManutencaoStart())
  try {    
    let manutencao = null
    let rspInsumo = null
    if (isEdit(action.itemSelected)){
      let rspManutencao = yield service.findManutencaoById(action.itemSelected);
      manutencao = rspManutencao.data;
      rspInsumo = yield insumoService.findInsumoById(manutencao.insumo.id); 
    }else{
      rspInsumo = yield insumoService.findInsumoById(action.idInsumo);
    }
    const insumo = rspInsumo.data;    
    let rspTypes = yield service.findTypesManutencao();
    const types = rspTypes.data;  
    let rspStatus = yield insumoService.findStatusInsumo();    
    const status = rspStatus.data;  
    yield put(actions.buscaDetailManutencaoSucess(manutencao, types, insumo, status)) 
  } catch (error) {
    yield put(actions.buscaDetailManutencaoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteManutencaoSaga(action) {
  yield put(actions.deleteManutencaoStart())
  try {    
    const responseDelete = yield service.deleteManutencao(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteManutencaoSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListManutencoesStart()) 
      const responseList = yield service.findListPagination(action.query);
      const manutencoes = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListManutencoesSucess(manutencoes, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteManutencaoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* editManutencaoSaga(action) {
  yield put(actions.editManutencaoStart())
  try {    
    let response = null;
    if(action.finalizar){
      response = yield service.finalizarManutencao(action.manutencao);      
    }else{
      response = yield service.submitManutencao(action.manutencao);
    }
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editManutencaoSucess())
      toastr.success('Sucesso:', action.finalizar ? 'Finalização realizada com sucesso.':'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editManutencaoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertManutencaoSaga(action) {
  yield put(actions.insertManutencaoStart())
  try {    
    const response = yield service.submitManutencao(action.manutencao); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertManutencaoSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertManutencaoError())
    toastr.error('Erro: ', error.message )
    console.error(error) // eslint-disable-line
  }
}



export function* watchManutencao() {
  yield all([
    takeEvery(types.BUSCA_LIST_MANUTENCAO, buscaListManutencoesSaga),
    takeEvery(types.BUSCA_DETAIL_MANUTENCAO, buscaDetailManutencaoSaga) ,
    takeLatest(types.INSERT_MANUTENCAO, insertManutencaoSaga),
    takeLatest(types.DELETE_MANUTENCAO, deleteManutencaoSaga),
    takeLatest(types.EDIT_MANUTENCAO, editManutencaoSaga),   
  ]);
}
