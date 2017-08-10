import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { employeesRequest } from 'schemas';
import { invoke } from './api';

export const fetchEmployeesRequest = options => invoke({
  endpoint: createUrl(`${API_URL}/api/employee_requests`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['employees/FETCH_REQUEST_LIST_REQUEST', {
    type: 'employees/FETCH_REQUEST_LIST_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [employeesRequest])
    ),
    meta: (action, state, res) => res.clone().json().then(json => json.paging || { cursors: {} }),
  }, 'employees/FETCH_REQUEST_LIST_FAILURE'],
});

export const fetchEmployeeRequest = id => invoke({
  endpoint: createUrl(`${API_URL}/api/employee_requests/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['employees/FETCH_REQUEST_DETAILS_REQUEST', {
    type: 'employees/FETCH_REQUEST_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, employeesRequest)
    ),
  }, 'employees/FETCH_REQUEST_DETAILS_FAILURE'],
});

export default handleAction(
  combineActions(
    'employees/FETCH_REQUEST_LIST_SUCCESS',
    'employees/FETCH_REQUEST_DETAILS_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.employeesRequests,
  }),
  {}
);
