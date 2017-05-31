import { createAction, handleActions } from 'redux-actions';

import { AUTH_COOKIE_NAME } from 'config';

export const getToken = () => (dispatch, getState, { cookies }) =>
  cookies.get(AUTH_COOKIE_NAME, { path: '/' });
export const setToken = token => (dispatch, getState, { cookies }) =>
  cookies.set(AUTH_COOKIE_NAME, token, { path: '/' });
export const removeToken = () => (dispatch, getState, { cookies }) =>
  cookies.remove(AUTH_COOKIE_NAME, { path: '/' });

export const isLoginned = () => dispatch => dispatch(getToken()).then(resp => !!resp);

export const logoutAction = createAction('session/LOGOUT');
export const setData = createAction('session/SET_DATA');

export const loadTokenFromStorage = () => (dispatch, getState, { cookies }) =>
  dispatch(setData({
    token: cookies.get(AUTH_COOKIE_NAME, { path: '/' }),
  }));

export const logout = () => dispatch =>
  dispatch(removeToken()).then(() => dispatch(logoutAction()));

export const login = token => dispatch =>
  dispatch([
    setToken(token),
    setData({ token }),
  ]);

export default handleActions({
  [setData]: (state, action) => action.payload,
  [logoutAction]: () => ({}),
}, {});
