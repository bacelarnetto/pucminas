import { all } from 'redux-saga/effects';

import { watchMarca } from './marca'
import { watchAuth } from './auth'
import { watchInsumo } from './insumo'
import { watchFornecedor } from './fornecedor'
import { watchPedido } from './pedido'
import { watchManutencao } from './manutencao'
import { watchBarragem } from './barragem'
import { watchMorador } from './morador'
import { watchUsuario } from './usuario'
import { watchDashboard } from './dashboard'

export default function* rootSaga() {
  return yield all([
    watchMarca(),
    watchAuth(),
    watchInsumo(),
    watchFornecedor(),
    watchPedido(),
    watchManutencao(),
    watchBarragem(),
    watchMorador(),
    watchUsuario(),
    watchDashboard()
  ])
}
