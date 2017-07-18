import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromEmployees from 'redux/employees';

export const showEmployees = createAction('employeesListPage/SHOW_DECLARATIONS');
export const pagingEmployees = createAction('employeesListPage/ADD_PAGING');

export const fetchEmployees = options => dispatch =>
  dispatch(fromEmployees.fetchEmployees(options))
  .then((action) => {
    if (action.error) throw action;
    return [
      dispatch(showEmployees(action.payload.result)),
      dispatch(pagingEmployees(action.meta)),
    ];
  });

const employees = handleAction(showEmployees, (state, action) => action.payload, []);
const paging = handleAction(pagingEmployees, (state, action) => action.payload, {});

export default combineReducers({
  employees,
  paging,
});
