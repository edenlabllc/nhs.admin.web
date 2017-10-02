import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { medication } from 'schemas';
import { invoke } from './api';

export const fetchMedications = options => invoke({
  endpoint: createUrl(`${API_URL}/api/medications`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['medications/FETCH_LIST_REQUEST', {
    type: 'medications/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [medication])
    ),
    meta: (action, state, res) => res.clone().json().then(json => json.paging),
  }, 'medications/FETCH_LIST_FAILURE'],
});

export const createMedication = body => invoke({
  endpoint: createUrl(`${API_URL}/api/medications`),
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['medications/CREATE_INNM_DOSAGES_REQUEST',
    'medications/CREATE_SUCCESS',
    'medications/CREATE_FAILURE'],
  body,
});

export const deactivateMedication = id => invoke({
  endpoint: createUrl(`${API_URL}/api/medications/${id}/actions/deactivate`),
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['medications/DEACTIVATE_REQUEST',
    'medications/DEACTIVATE_SUCCESS',
    'medications/DEACTIVATE_FAILURE'],
});

export const fetchMedication = id => invoke({
  endpoint: createUrl(`${API_URL}/api/medications/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['medications/FETCH_DETAILS_REQUEST', {
    type: 'medications/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, medication)
    ),
  }, 'medications/FETCH_DETAILS_FAILURE'],
});


export default handleAction(
  combineActions(
    'medications/FETCH_LIST_SUCCESS',
    'medications/FETCH_DETAILS_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.medications,
    ...action.meta,
  }),
  {}
);
