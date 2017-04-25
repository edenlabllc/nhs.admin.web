import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { declaration } from 'schemas';
import { invoke } from './api';

export const fetchDeclarations = options => invoke({
  endpoint: createUrl(`${API_URL}/api/declarations`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['declarations/FETCH_LIST_REQUEST', {
    type: 'declarations/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [declaration])
    ),
  }, 'declarations/FETCH_LIST_FAILURE'],
});

export const fetchDeclaration = id => invoke({
  endpoint: createUrl(`${API_URL}/api/declarations/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['declarations/FETCH_DETAILS_REQUEST', {
    type: 'declarations/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, declaration)
    ),
  }, 'declarations/FETCH_DETAILS_FAILURE'],
});

export default handleAction(
  combineActions(
    'declarations/FETCH_LIST_SUCCESS',
    'declarations/FETCH_DETAILS_SUCCESS',
    'declarations/CREATE_SUCCESS',
    'declarations/UPDATE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.declarations,
  }),
  {}
);
