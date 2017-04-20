import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromClinics from 'redux/clinics';

export const showClinics = createAction('clinicsListPage/SHOW_CLINICS');

export const fetchClinics = () => dispatch =>
  dispatch(fromClinics.fetchClinics({ limit: 100 }))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(showClinics(action.payload.result));
  });

const clinics = handleAction(showClinics, (state, action) => action.payload, []);

export default combineReducers({
  clinics,
});
