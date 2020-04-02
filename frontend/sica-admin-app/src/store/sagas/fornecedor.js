import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/fornecedor';
import { FornecedorService as service }  from './../../servers/fornecedor'
import { toastr } from 'react-redux-toastr'

function* buscaListFornecedoresSaga(action) {
  yield put(actions.buscaListFornecedoresStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const fornecedores = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListFornecedoresSucess(fornecedores, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListFornecedoresError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaFornecedorSaga(action) {
  yield put(actions.buscaFornecedorStart())
  try {    
    const response = yield service.findFornecedorById(action.itemSelected);
    const fornecedor = response.data;
    yield put(actions.buscaFornecedorSucess(fornecedor)) 
  } catch (error) {
    yield put(actions.buscaFornecedorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteFornecedorSaga(action) {
  yield put(actions.deleteFornecedorStart())
  try {    
    const responseDelete = yield service.deleteFornecedor(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteFornecedorSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListFornecedoresStart()) 
      const responseList = yield service.findListPagination(action.query);
      const fornecedores = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListFornecedoresSucess(fornecedores, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteFornecedorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editFornecedorSaga(action) {
  yield put(actions.editFornecedorStart())
  try {    
    const response = yield service.submitFornecedor(action.fornecedor); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editFornecedorSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editFornecedorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertFornecedorSaga(action) {
  yield put(actions.insertFornecedorStart())
  try {    
    const response = yield service.submitFornecedor(action.fornecedor); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertFornecedorSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertFornecedorError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchFornecedor() {
  yield all([
    takeEvery(types.BUSCA_FORNECEDOR, buscaFornecedorSaga) ,
    takeLatest(types.INSERT_FORNECEDOR, insertFornecedorSaga),
    takeLatest(types.DELETE_FORNECEDOR, deleteFornecedorSaga),
    takeLatest(types.EDIT_FORNECEDOR, editFornecedorSaga),
    takeEvery(types.BUSCA_LIST_FORNECEDORES, buscaListFornecedoresSaga) 
  ]);
}
