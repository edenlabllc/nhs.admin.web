import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { login } from 'redux/session';
import { CLIENT_ID } from 'config';

export const onSubmit = ({ email, password }) => (dispatch, getState) =>
  dispatch(
    createSessionToken({
      grant_type: 'password',
      email,
      password,
      client_id: CLIENT_ID,
      scope: 'app:authorize legal_entity:read'
    })
  ).then(action => {
    if (action.error) {
      throw new SubmissionError({
        email: {
          accountPasswordMismatch: true
        }
      });
    }
    const state = getState();
    const location = getLocation(state);

    return dispatch(login(action.payload.value)).then(() =>
      dispatch(
        push({
          ...location,
          pathname: '/dashboard'
        })
      )
    );
  });
