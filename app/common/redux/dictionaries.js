import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { dictionary } from 'schemas';
import { createUrl } from 'helpers/url';
import { invoke } from './api';

const DATA = [
  {
    id: 'GENDER',
    values: {
      MALE: 'Чоловік',
      FEMALE: 'Жінка',
    },
    labels: ['SYSTEM', 'EXTERNAL'],
    is_active: true,
  }, {
    id: 'DOCUMENT_TYPE',
    values: {
      PASSPORT: 'Паспорт',
      NATIONAL_ID: 'Біометричний паспорт',
      BIRTH_CERTIFICATE: 'Свідоцтво про народження',
      TEMPORARY_CERTIFICATE: 'Тимчасовий паспорт',
    },
    labels: ['SYSTEM', 'EXTERNAL'],
    is_active: true,
  },
];

export const fetchDictionaries = options => invoke({
  endpoint: createUrl(`${API_URL}/dictionaries`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['dictionaries/FETCH_DICTIONARIES_REQUEST', {
    type: 'dictionaries/FETCH_DICTIONARIES_SUCCESS',
    payload: (action, state, res) => res.json().then(
      () => normalize(DATA, [dictionary])
    ),
  }, 'dictionaries/FETCH_DICTIONARIES_FAILURE'],
});

export const updateDictionary = (name, body) => invoke({
  endpoint: `${API_URL}/dictionaries/${body.id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['dictionaries/UPDATE_DICTIONARY_REQUEST', {
    type: 'dictionaries/UPDATE_DICTIONARY_SUCCESS',
    payload: (action, state, res) => res.json().then(
      resp => normalize(resp, dictionary)
    ),
  }, 'dictionaries/UPDATE_DICTIONARY_FAILURE'],
  body,
});

export default handleAction(
  combineActions(
    'dictionaries/FETCH_DICTIONARIES_SUCCESS',
    'dictionaries/UPDATE_DICTIONARY_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.dictionaries,
  }),
  []
);
