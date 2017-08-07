import { handleActions, combineActions } from 'redux-actions';
import { MOCK_API_URL, API_URL } from 'config';
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
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [declaration])
    ),
    meta: (action, state, res) => res.clone().json().then(json => json.paging || { cursors: {} }),
  }, 'declarations/FETCH_LIST_FAILURE'],
});

export const fetchDeclarationsRequests = options => invoke({
  endpoint: createUrl(`${API_URL}/api/declaration_requests`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['declarations/FETCH_LIST_REQUEST', {
    type: 'declarations/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [declaration])
    ),
    meta: (action, state, res) => res.clone().json().then(json => json.paging || { cursors: {} }),
  }, 'declarationsRequests/FETCH_LIST_FAILURE'],
});

export const fetchDeclarationRequest = id => invoke({
  endpoint: createUrl(`${API_URL}/api/declaration_requests/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['declarations/FETCH_DETAILS_REQUEST', {
    type: 'declarations/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, declaration)
    ),
  }, 'declarationsRequests/FETCH_DETAILS_FAILURE'],
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

export const updateDeclaration = (id, body) => invoke({
  endpoint: `${MOCK_API_URL}/declaration/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['dictionaries/UPDATE_REQUEST', {
    type: 'dictionaries/UPDATE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      resp => normalize(resp.data, declaration)
    ),
  }, 'dictionaries/UPDATE_FAILURE'],
  body,
});

export const approveDeclarationRequest = id => invoke({
  endpoint: `${API_URL}/api/declaration_requests/${id}/actions/approve`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['dictionaries/APPROVE_REQUEST', {
    type: 'dictionaries/APPROVE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      resp => normalize(resp.data, declaration)
    ),
  }, 'dictionaries/APPROVE_FAILURE'],
});

export const rejectDeclarationRequest = id => invoke({
  endpoint: `${API_URL}/api/declaration_requests/${id}/actions/reject`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['dictionaries/REJECT_REQUEST', {
    type: 'dictionaries/REJECT_SUCCESS',
    payload: (action, state, res) => res.json().then(
      resp => normalize(resp.data, declaration)
    ),
  }, 'dictionaries/REJECT_FAILURE'],
});

export const getDeclarationRequestImage = id => invoke({
  endpoint: `${API_URL}/api/declaration_requests/${id}/images`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['declarations/GET_DECLARATION_REQUEST_IMAGE', {
    type: 'declarations/GET_DECLARATION_REQUEST_IMAGE_SUCCESS',
    payload: (action, state, res) => res.json(),
  }, 'dictionaries/GET_DECLARATION_REQUEST_IMAGE_FAILURE'],
});

export default handleActions({
  [combineActions(
    'declarations/FETCH_LIST_SUCCESS',
    'declarations/CREATE_SUCCESS',
    'declarations/UPDATE_SUCCESS',
  )]: (state, action) => ({
    ...state,
    ...action.payload.entities.declarations,
    ...action.meta,
  }),
  'declarations/FETCH_DETAILS_SUCCESS': (state, action) => ({
    ...state,
    [action.payload.result]: {
      ...state[action.payload.result],
      ...action.payload.entities.declarations[action.payload.result],
      ...action.meta,
    },
  }),
  'declarations/GET_DECLARATION_REQUEST_IMAGE_SUCCESS': (state, action) => ({
    ...state,
    [action.payload.meta.url.split(/declaration_requests\//)[1].split(/\/images/)[0]]: {
      ...state[action.payload.meta.url.split(/declaration_requests\//)[1].split(/\/images/)[0]],
      images: action.payload.data,
    },
  }),
}, {});

