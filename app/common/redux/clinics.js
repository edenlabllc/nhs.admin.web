import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { clinic } from 'schemas';
import { invoke } from './api';

export const fetchClinics = options => invoke({
  endpoint: createUrl(`${API_URL}/api/legal_entities`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clinics/FETCH_LIST_REQUEST', {
    type: 'clinics/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [clinic])
    ),
    meta: (action, state, res) => res.clone().json().then(json => json.paging),
  }, 'clinics/FETCH_LIST_FAILURE'],
});

export const fetchClinic = id => invoke({
  endpoint: createUrl(`${API_URL}/api/legal_entities/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clinics/FETCH_DETAILS_REQUEST', {
    type: 'clinics/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, clinic)
    ),
  }, 'clinics/FETCH_DETAILS_FAILURE'],
});

export default handleAction(
  combineActions(
    'clinics/FETCH_LIST_SUCCESS',
    'clinics/FETCH_DETAILS_SUCCESS',
    'clinics/CREATE_SUCCESS',
    'clinics/UPDATE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.clinics,
    ...action.meta,
  }),
  {}
);
