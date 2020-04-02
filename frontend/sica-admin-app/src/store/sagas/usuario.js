import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/usuario';
import { UsuarioService as service }  from './../../servers/usuario'
import { toastr } from 'react-redux-toastr'

function* buscaListUsuariosSaga(action) {
  yield put(actions.buscaListUsuariosStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const usuarios = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListUsuariosSucess(usuarios, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListUsuariosError(error.codigoErro))
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaUsuarioSaga(action) {
  yield put(actions.buscaUsuarioStart())
  try {    
    const response = yield service.findUsuarioById(action.itemSelected);
    const usuario = response.data;
    yield put(actions.buscaUsuarioSucess(usuario)) 
  } catch (error) {
    yield put(actions.buscaUsuarioError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteUsuarioSaga(action) {
  yield put(actions.deleteUsuariosStart())
  try {    
    const responseDelete = yield service.deleteUsuario(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteUsuariosSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListUsuariosStart()) 
      const responseList = yield service.findListPagination(action.query);
      const usuarios = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListUsuariosSucess(usuarios, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteUsuariosError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editUsuarioSaga(action) {
  yield put(actions.editUsuarioStart())
  try {    
    const response = yield service.submitUsuario(action.usuario); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editUsuarioSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editUsuarioError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertUsuarioSaga(action) {
  yield put(actions.insertUsuarioStart())
  try {    
    const response = yield service.submitUsuario(action.usuario); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertUsuarioSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertUsuarioError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchUsuario() {
  yield all([
    takeEvery(types.BUSCA_USUARIO, buscaUsuarioSaga) ,
    takeLatest(types.INSERT_USUARIO, insertUsuarioSaga),
    takeLatest(types.DELETE_USUARIO, deleteUsuarioSaga),
    takeLatest(types.EDIT_USUARIO, editUsuarioSaga),
    takeEvery(types.BUSCA_LIST_USUARIO, buscaListUsuariosSaga) 
  ]);
}
