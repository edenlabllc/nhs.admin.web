import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "config";
import { invoke } from "./api";

export const createSessionToken = body =>
  invoke({
    endpoint: `${API_URL}/oauth/tokens`,
    method: "POST",
    types: [
      "auth/CREATE_SESSION_TOKEN_REQUEST",
      {
        type: "auth/CREATE_SESSION_TOKEN_SUCCESS",
        payload: (action, state, res) => res.json().then(json => json.data)
      },
      "auth/CREATE_SESSION_TOKEN_FAILURE"
    ],
    body: {
      token: body
    }
  });

export const fetchSessionToken = token =>
  invoke({
    endpoint: `${API_URL}/admin/tokens/${token}/verify`,
    method: "GET",
    types: [
      "auth/FETCH_SESSION_TOKEN_REQUEST",
      {
        type: "auth/FETCH_SESSION_TOKEN_SUCCESS",
        payload: (action, state, res) => res.json().then(json => json.data)
      },
      "auth/FETCH_SESSION_TOKEN_FAILURE"
    ]
  });

export const authorize = ({ clientId, scope, redirectUri }) =>
  invoke(
    {
      endpoint: `${API_URL}/oauth/apps/authorize`,
      method: "POST",
      types: [
        "auth/AUTHORIZE_REQUEST",
        {
          type: "auth/AUTHORIZE_SUCCESS",
          payload: (action, state, res) =>
            res.json().then(json => ({
              ...json,
              headers: res.headers
            }))
        },
        "auth/AUTHORIZE_FAILURE"
      ],
      body: {
        app: {
          client_id: clientId,
          redirect_uri: redirectUri,
          scope
        }
      }
    },
    { auth: true }
  );

export default handleAction(
  combineActions(
    "auth/CREATE_SESSION_TOKEN_SUCCESS",
    "auth/FETCH_SESSION_TOKEN_SUCCESS"
  ),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  {}
);
