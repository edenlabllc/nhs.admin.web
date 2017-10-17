import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { program_medication } from 'schemas';
import { invoke } from './api';

export const fetchProgramMedications = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/program_medications`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'program_medications/FETCH_LIST_REQUEST',
      {
        type: 'program_medications/FETCH_LIST_SUCCESS',
        payload: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => normalize(json.data, [program_medication])),
        meta: (action, state, res) =>
          res
            .clone()
            .json()
            .then(json => json.paging)
      },
      'program_medications/FETCH_LIST_FAILURE'
    ]
  });

export const createMedicalProgram = body =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/program_medications`),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'program_medications/CREATE_MEDICAL_PROGRAM_REQUEST',
      'program_medications/CREATE_SUCCESS',
      'program_medications/CREATE_FAILURE'
    ],
    body
  });

export const deactivateMedicalProgram = id =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/program_medications/${id}/deactivate`),
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'program_medications/DEACTIVATE_REQUEST',
      'program_medications/DEACTIVATE_SUCCESS',
      'program_medications/DEACTIVATE_FAILURE'
    ]
  });

export const fetchMedicalProgram = id =>
  invoke({
    endpoint: createUrl(`${API_URL}/api/program_medications/${id}`),
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'program_medications/FETCH_DETAILS_REQUEST',
      {
        type: 'program_medications/FETCH_DETAILS_SUCCESS',
        payload: (action, state, res) =>
          res.json().then(json => normalize(json.data, program_medication))
      },
      'program_medications/FETCH_DETAILS_FAILURE'
    ]
  });

export default handleAction(
  combineActions(
    'program_medications/FETCH_LIST_SUCCESS',
    'program_medications/FETCH_DETAILS_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.program_medications,
    ...action.meta
  }),
  {}
);
