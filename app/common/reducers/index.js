import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';

import labels from 'redux/labels';

import session from 'redux/session';
import user from 'redux/user';
import auth from 'redux/auth';

import dictionaries from 'redux/dictionaries';
import clinics from 'redux/clinics';
import declarations from 'redux/declarations';
import employees from 'redux/employees';
import { globalStat, detailStat, declarationsStat, reports } from 'redux/reports';
import configuration from 'redux/configuration';

import Aside from 'containers/blocks/Aside/redux';

import DashboardPage from 'containers/pages/DashboardPage/redux';

import ClinicsListPage from 'containers/pages/ClinicsListPage/redux';
import ClinicDetailPage from 'containers/pages/ClinicDetailPage/redux';

import DeclarationsListPage from 'containers/pages/DeclarationsListPage/redux';
import DeclarationDetailPage from 'containers/pages/DeclarationDetailPage/redux';

import PendingDeclarationDetailPage from 'containers/pages/PendingDeclarationDetailPage/redux';
import PendingDeclarationsListPage from 'containers/pages/PendingDeclarationsListPage/redux';

import EmployeesListPage from 'containers/pages/EmployeesListPage/redux';
import EmployeeDetailPage from 'containers/pages/EmployeeDetailPage/redux';
import PendingEmployeesListPage from 'containers/pages/PendingEmployeesListPage/redux';
import PendingEmployeeDetailPage from 'containers/pages/PendingEmployeeDetailPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  DashboardPage,
  ClinicsListPage,
  ClinicDetailPage,
  DeclarationsListPage,
  DeclarationDetailPage,
  PendingDeclarationDetailPage,
  PendingDeclarationsListPage,
  EmployeesListPage,
  EmployeeDetailPage,
  PendingEmployeesListPage,
  PendingEmployeeDetailPage,
});

const data = combineReducers({
  labels,
  user,
  dictionaries,
  clinics,
  declarations,
  employees,
  globalStat,
  detailStat,
  declarationsStat,
  configuration,
  reports,
});

export default combineReducers({
  blocks,
  session,
  pages,
  data,
  // external libraries
  form,
  routing,
  loading,
  auth,
});

export const getToken = state => state.session.token;
export const getUser = state => state.data.user;

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getTemplate = (state, id) => denormalize(id, schemas.template, state.data);
export const getTemplates = (state, ids) => denormalize(ids, [schemas.template], state.data);

export const getDictionaries = state => state.data.dictionaries;
export const getDictionary = (state, name) => denormalize(name, schemas.dictionary, state.data);
export const getDictionaryValues = (state, name) => {
  const values = getDictionary(state, name).values;
  return Object.keys(values).map(key => ({ key, value: values[key] }));
};

export const getDictionariesNames = state => (
  Object.keys(getDictionaries(state)).map(name => ({ name, title: name }))
);
export const getDictionariesLabels = (state) => {
  const dictionaries = getDictionaries(state);
  return Object.keys(dictionaries).reduce((target, name) => {
    dictionaries[name].labels.forEach((label) => {
      if (target.indexOf(label) === -1) {
        target.push(label);
      }
    });

    return target;
  }, []);
};

export const getClinics = (state, ids) => denormalize(ids, [schemas.clinic], state.data);
export const getClinic = (state, id) => denormalize(id, schemas.clinic, state.data);

export const getDeclarations = (state, ids) => denormalize(ids, [schemas.declaration], state.data);
export const getDeclaration = (state, id) => denormalize(id, schemas.declaration, state.data);

export const getEmployees = (state, ids) => denormalize(ids, [schemas.employee], state.data);
export const getEmployee = (state, id) => denormalize(id, schemas.employee, state.data);

export const getGlobalSatistic = state => state.data.globalStat;
export const getDetailStatistic = (state, ids) => (
  denormalize(ids, [schemas.detailStat], state.data)
);

export const getDeclarationsStatByArea = (state, id) => state.data.declarationsStat[id];

export const getConfiguration = state => state.data.configuration;

export const getReports = state => state.data.reports;

export const getScope = state => (state.auth.details || {}).scope;
