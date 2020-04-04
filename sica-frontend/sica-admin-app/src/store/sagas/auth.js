import { put, call, all, takeEvery, delay } from 'redux-saga/effects';
import decodeJwt from 'jwt-decode';
import { AuthService as service }  from './../../servers/auth'
import { actionTypes, Creators as actions } from '../actions/auth';
import { toastr } from 'react-redux-toastr'

export function* logoutSaga() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield call([localStorage, 'removeItem'], 'username');
  yield call([localStorage, 'removeItem'], 'permissions');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    senha: action.senha
  };  
  
  try {
    const response = yield service.authUser(authData);
    const decodedToken = yield decodeJwt(response.headers.authorization);
    
    const expirationDate = yield new Date(
      new Date().getTime() + response.headers.expires_in * 1000
    );
    yield localStorage.setItem('token', response.headers.authorization );
    yield localStorage.setItem('permissions', decodedToken.authorities);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.headers.user_id); 
    yield localStorage.setItem('username', action.email);  
    yield put(
      actions.authSuccess(response.headers.authorization, response.headers.user_id)
    );
    yield put(actions.checkAuthTimeout(response.headers.expires_in));
  } catch (error) {
    yield put(actions.authFail(error.message));
    toastr.error('Erro:', error.message)
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  } 
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}
