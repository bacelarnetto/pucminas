export const actionTypes = {
  AUTH_CHECK_STATE: 'AUTH_CHECK_STATE',
  AUTH_USER: 'AUTH_USER',
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAIL: 'AUTH_FAIL',
  AUTH_CHECK_TIMEOUT: 'AUTH_CHECK_TIMEOUT',
  AUTH_INITIATE_LOGOUT: 'AUTH_INITIATE_LOGOUT',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  SET_AUTH_REDIRECT_PATH: 'SET_AUTH_REDIRECT_PATH'
}

export const Creators = {
  authStart : () => {
    return {
      type: actionTypes.AUTH_START
    };
  },

  authSuccess : (token, userId) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
    };
  },

  authFail : error => {
    return {
      type: actionTypes.AUTH_FAIL,
      error: error
    };
  },

  logout: () => {
    return {
      type: actionTypes.AUTH_INITIATE_LOGOUT
    };
  },

  logoutSucceed: () => {
    return {
      type: actionTypes.AUTH_LOGOUT
    };
  },

  checkAuthTimeout: expirationTime => {
    return {
      type: actionTypes.AUTH_CHECK_TIMEOUT,
      expirationTime: expirationTime
    };
  },

  auth : (email, senha) => {
    return {
      type: actionTypes.AUTH_USER,
      email: email,
      senha: senha,
    };
  },

  setAuthRedirectPath : path => {
    return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
    };
  },
  
  authCheckState: () => {
    return {
      type: actionTypes.AUTH_CHECK_STATE
    };
  }
  
}
