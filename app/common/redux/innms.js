import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { innm } from 'schemas';
import { invoke } from './api';

export const fetchInnms = options => invoke({
  endpoint: createUrl(`${API_URL}/api/innms`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['innms/FETCH_LIST_REQUEST', {
    type: 'innms/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [innm])
    ),
    meta: (action, state, res) => res.clone().json().then(json => json.paging),
  }, 'innms/FETCH_LIST_FAILURE'],
});

export const createInnm = body => invoke({
  endpoint: createUrl(`${API_URL}/api/innms`),
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['innms/CREATE_INNM_REQUEST',
    'innms/CREATE_INNM_SUCCESS',
    'innms/CREATE_INNM_FAILURE'],
  body,
});

export const fetchInnm = id => invoke({
  endpoint: createUrl(`${API_URL}/api/innms/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['innms/FETCH_DETAILS_REQUEST', {
    type: 'innms/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, innm)
    ),
  }, 'innms/FETCH_DETAILS_FAILURE'],
});


export default handleAction(
  combineActions(
    'innms/FETCH_LIST_SUCCESS',
    'innms/CREATE_INNM_SUCCESS',
    'innms/FETCH_DETAILS_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.innms,
    ...action.meta,
  }),
  {}
);
