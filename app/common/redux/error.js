import { createAction, combineActions, handleActions } from 'redux-actions';

export const dismissError = createAction('error/DISMISS_ERROR');

export default handleActions(
  {
    [combineActions(
      'innms/CREATE_INNM_FAILURE',
      'innm_dosages/CREATE_INNM_DOSAGES_FAILURE',
      'innm_dosages/DEACTIVATE_INNM_DOSAGES_FAILURE',
      'medications/CREATE_FAILURE'
    )]: (state, action) => action.payload,
    [dismissError]: () => null
  },
  null
);
