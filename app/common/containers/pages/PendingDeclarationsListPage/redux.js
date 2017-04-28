import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromDeclarations from 'redux/declarations';

export const showDeclarations = createAction('declarationsListPage/SHOW_DECLARATIONS');

export const fetchDeclarations = () => dispatch =>
  dispatch(fromDeclarations.fetchDeclarations({ limit: 100 }))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(showDeclarations(action.payload.result));
  });

const declarations = handleAction(showDeclarations, (state, action) => action.payload, []);

export default combineReducers({
  declarations,
});
