import { takeEvery, put, all } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import { Types as types, Creators as actions } from '../actions/monitoramento';
import { MonitoramentoService as service }  from './../../servers/monitoramento'


function* buscaDetailMonitoramentoSaga(action) {
  yield put(actions.buscaDetailMonitoramentoStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const monitoramento = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;

    const resumo = yield service.getResumeMonitoramento(action.query)
    
    const nomeBarragem = resumo.data.nomeBarragem;
    const listDates = resumo.data.datas;
    const listVolumes = resumo.data.volumes;
    const listTemperaturas = resumo.data.temperaturas;
    const listMovimentacoes = resumo.data.movimentacoes;
    const listPressoes = resumo.data.pressoes;

    yield put(actions.buscaDetailMonitoramentoSucess(
      monitoramento, 
      nomeBarragem,
      listDates,
      listVolumes,
      listTemperaturas,
      listMovimentacoes,
      listPressoes,
      totalPages, 
      itemsCountPerPage, 
      totalElements )) 
  } catch (error) {
    yield put(actions.buscaDetailMonitoramentoError(error.codigoErro))
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchMonitoramento() {
  yield all([
    takeEvery(types.BUSCA_DETALHE_MONITORAMENTO, buscaDetailMonitoramentoSaga), 
  ]);
}
