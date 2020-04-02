import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/pedido';
import { PedidoService as service }  from './../../servers/pedido'
import { FornecedorService as fornecedorService }  from './../../servers/fornecedor'
import { InsumoService as insumoService }  from './../../servers/insumo'
import { toastr } from 'react-redux-toastr'
import { isEdit }  from './../../common/util'

function* buscaListPedidosSaga(action) {
  yield put(actions.buscaListPedidosStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const pedidos = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListPedidosSucess(pedidos, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListPedidosError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaPedidoSaga(action) {
  yield put(actions.buscaPedidoStart())
  try {    
    let pedido = ''
    if(isEdit(action.idPedidoSelected)){
      const response =  yield service.findPedidoById(action.idPedidoSelected);
      pedido = response.data;
    } else {
      const responseFornec =  yield fornecedorService.findFornecedorById(action.idFornecedorSelected);
      const fornecedor = responseFornec.data;
      pedido = {};
      pedido.fornecedor = fornecedor;      
    }
    let rspStatus = yield service.findStatusPedido();    
    const status = rspStatus.data;
    let rspTypes = yield insumoService.findTypesInsumo();
    var tiposInsumos = rspTypes.data.reduce((obj, item) => ((obj[item.id] = item.nome), obj),{});// eslint-disable-line
    yield put(actions.buscaPedidoSucess(pedido, tiposInsumos, status)) 
  } catch (error) {
    yield put(actions.buscaPedidoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deletePedidoSaga(action) {
  yield put(actions.deletePedidoStart())
  try {    
    const responseDelete = yield service.deletePedido(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deletePedidoSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListPedidosStart()) 
      const responseList = yield service.findListPagination(action.query);
      const pedidos = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListPedidosSucess(pedidos, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deletePedidoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editPedidoSaga(action) {
  yield put(actions.editPedidoStart())
  try {    
    const response = yield service.submitPedido(action.pedido); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editPedidoSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editPedidoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertPedidoSaga(action) {
  yield put(actions.insertPedidoStart())
  try {    
    const response = yield service.submitPedido(action.pedido); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertPedidoSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertPedidoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchPedido() {
  yield all([
    takeEvery(types.BUSCA_PEDIDO, buscaPedidoSaga) ,
    takeLatest(types.INSERT_PEDIDO, insertPedidoSaga),
    takeLatest(types.DELETE_PEDIDO, deletePedidoSaga),
    takeLatest(types.EDIT_PEDIDO, editPedidoSaga),
    takeEvery(types.BUSCA_LIST_PEDIDOS, buscaListPedidosSaga) 
  ]);
}
