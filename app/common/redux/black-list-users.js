import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { black_list_user } from 'schemas';
import { invoke } from './api';

export const fetchBlackListUsers = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/black_list_users`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'black_list_users/FETCH_LIST_REQUEST',
      {
        type: 'black_list_users/FETCH_LIST_SUCCESS',
        payload: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => normalize(json.data, [black_list_user])),
        meta: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => json.paging)
      },
      'black_list_users/FETCH_LIST_FAILURE'
    ]
  });

export const createInnmDosage = body =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/innm_dosages`),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'innm_dosages/CREATE_INNM_DOSAGES_REQUEST',
      'innm_dosages/CREATE_INNM_DOSAGES_SUCCESS',
      {
        type: 'innm_dosages/CREATE_INNM_DOSAGES_FAILURE',
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ],
    body
  });

export const deactivateInnmDosage = id =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/innm_dosages/${id}/actions/deactivate`),
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'innm_dosages/DEACTIVATE_INNM_DOSAGES_REQUEST',
      'innm_dosages/DEACTIVATE_INNM_DOSAGES_SUCCESS',
      {
        type: 'innm_dosages/DEACTIVATE_INNM_DOSAGES_FAILURE',
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ]
  });

export const fetchInnmDosage = id =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/innm_dosages/${id}`),
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'innm_dosages/FETCH_DETAILS_REQUEST',
      {
        type: 'innm_dosages/FETCH_DETAILS_SUCCESS',
        payload: (action, state, res) =>
          res.json().then(json => normalize(json.data, innm_dosage))
      },
      'innm_dosages/FETCH_DETAILS_FAILURE'
    ]
  });

export default handleAction(
  combineActions('black_list_users/FETCH_LIST_SUCCESS'),
  (state, action) => ({
    ...state,
    ...action.payload.entities.black_list_users
  }),
  {}
);
