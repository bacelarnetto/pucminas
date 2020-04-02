import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/marca';
import { MarcaService as service }  from './../../servers/marca'
import { toastr } from 'react-redux-toastr'

function* buscaListMarcasSaga(action) {
  yield put(actions.buscaListMarcasStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const marcas = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListMarcasSucess(marcas, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListMarcasError(error.codigoErro))
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaMarcaSaga(action) {
  yield put(actions.buscaMarcaStart())
  try {    
    const response = yield service.findMarcaById(action.itemSelected);
    const marca = response.data;
    yield put(actions.buscaMarcaSucess(marca)) 
  } catch (error) {
    yield put(actions.buscaMarcaError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteMarcaSaga(action) {
  yield put(actions.deleteMarcasStart())
  try {    
    const responseDelete = yield service.deleteMarca(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteMarcasSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListMarcasStart()) 
      const responseList = yield service.findListPagination(action.query);
      const marcas = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListMarcasSucess(marcas, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteMarcasError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editMarcaSaga(action) {
  yield put(actions.editMarcaStart())
  try {    
    const response = yield service.submitMarca(action.marca); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editMarcaSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editMarcaError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertMarcaSaga(action) {
  yield put(actions.insertMarcaStart())
  try {    
    const response = yield service.submitMarca(action.marca); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertMarcaSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertMarcaError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchMarca() {
  yield all([
    takeEvery(types.BUSCA_MARCA, buscaMarcaSaga) ,
    takeLatest(types.INSERT_MARCA, insertMarcaSaga),
    takeLatest(types.DELETE_MARCA, deleteMarcaSaga),
    takeLatest(types.EDIT_MARCA, editMarcaSaga),
    takeEvery(types.BUSCA_LIST_MARCA, buscaListMarcasSaga) 
  ]);
}
