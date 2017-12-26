import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "config";
import { invoke } from "./api";
import { fetchSessionToken } from "./auth";

export const fetchUserData = token => dispatch =>
  dispatch(fetchSessionToken(token)).then(action => {
    if (action.error) return action;
    if (new Date(action.payload.expires_at * 1000) < new Date()) {
      return {
        ...action,
        error: true
      };
    }
    return dispatch(fetchUserByToken(token));
  });

export const fetchUserByToken = token =>
  invoke({
    endpoint: `${API_URL}/admin/tokens/${token}/user`,
    method: "GET",
    types: [
      "user/FETCH_USER_BY_TOKEN_REQUEST",
      "user/FETCH_USER_BY_TOKEN_SUCCESS",
      "user/FETCH_USER_BY_TOKEN_FAILURE"
    ]
  });

export const fetchUser = userId =>
  invoke({
    endpoint: `${API_URL}/admin/users/${userId}`,
    method: "GET",
    types: [
      "user/FETCH_USER_REQUEST",
      "user/FETCH_USER_SUCCESS",
      "user/FETCH_USER_FAILURE"
    ]
  });

export const getUserIdFromCookies = () => (dispatch, getState, { cookies }) =>
  cookies.get("userId", { path: "/" });
export const removeUserIdFromCookies = () => (
  dispatch,
  getState,
  { cookies }
) => cookies.remove("userId", { path: "/" });

export default handleAction(
  combineActions(
    "user/FETCH_USER_SUCCESS",
    "user/CREATE_USER_FROM_REQUEST_SUCCESS"
  ),
  (state, action) => ({
    ...state,
    ...action.payload.data
  }),
  null
);
