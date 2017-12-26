import { createAction, handleActions } from "redux-actions";
import { getUserIdFromCookies, removeUserIdFromCookies } from "redux/user";

import { AUTH_COOKIE_NAME } from "config";

export const getToken = () => (dispatch, getState, { cookies }) => {
  return cookies.get(AUTH_COOKIE_NAME, { path: "/" });
};

export const logoutAction = createAction("session/LOGOUT");
export const setData = createAction("session/SET_DATA");

export const logout = () => dispatch =>
  dispatch(removeUserIdFromCookies()).then(() => dispatch(logoutAction()));

export default handleActions(
  {
    [setData]: (state, action) => action.payload,
    [logoutAction]: () => ({})
  },
  {}
);
