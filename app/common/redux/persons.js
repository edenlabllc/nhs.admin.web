import { API_URL } from 'config';
import { createUrl } from 'helpers/url';

import { invoke } from './api';

export const resetAuthMethod = id =>
  invoke({
    endpoint: createUrl(
      `${API_URL}/api/persons/${id}/actions/reset_authentication_method`
    ),
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    types: [
      'persons/RESET_AUTH_REQUEST',
      'persons/RESET_AUTH_SUCCESS',
      {
        type: 'persons/RESET_AUTH_FAILURE',
        payload: (action, state, res) => res.json().then(json => json.error)
      }
    ]
  });
