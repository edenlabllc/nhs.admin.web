import { handleAction, combineActions } from 'redux-actions';
import { DICTIONARY_HOST } from 'config';
import { createUrl } from 'helpers/url';
import { invoke } from './api';

export const fetchDictionaries = (options) => {
  console.log('op', options);
  return invoke({
    endpoint: createUrl(`${DICTIONARY_HOST}/dictionaries`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: ['dictionaries/FETCH_DICTIONARIES_REQUEST', {
      type: 'dictionaries/FETCH_DICTIONARIES_SUCCESS',
      payload: (action, state, res) => res.json().then(
        json => json.data
      ),
    }, 'dictionaries/FETCH_DICTIONARIES_FAILURE'],
  });
};

export default handleAction(
  combineActions(
    'dictionaries/FETCH_DICTIONARIES_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  {}
);
