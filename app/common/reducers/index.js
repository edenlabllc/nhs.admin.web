import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';

import labels from 'redux/labels';

import dictionaries from 'redux/dictionaries';
import clinics from 'redux/clinics';
import declarations from 'redux/declarations';
import employees from 'redux/employees';
import { globalStat, detailStat, declarationsStat } from 'redux/reports';
import configuration from 'redux/configuration';

import Aside from 'containers/blocks/Aside/redux';

import DashboardPage from 'containers/pages/DashboardPage/redux';

import ClinicsListPage from 'containers/pages/ClinicsListPage/redux';
import ClinicDetailPage from 'containers/pages/ClinicDetailPage/redux';

import DeclarationsListPage from 'containers/pages/DeclarationsListPage/redux';
import DeclarationDetailPage from 'containers/pages/DeclarationDetailPage/redux';

import EmployeesListPage from 'containers/pages/EmployeesListPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  DashboardPage,
  ClinicsListPage,
  ClinicDetailPage,
  DeclarationsListPage,
  DeclarationDetailPage,
  EmployeesListPage,
});

const data = combineReducers({
  labels,
  dictionaries,
  clinics,
  declarations,
  employees,
  globalStat,
  detailStat,
  declarationsStat,
  configuration,
});

export default combineReducers({
  blocks,
  pages,
  data,
  // external libraries
  form,
  routing,
  loading,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getTemplate = (state, id) => denormalize(id, schemas.template, state.data);
export const getTemplates = (state, ids) => denormalize(ids, [schemas.template], state.data);

export const getDictionary = (state, name) => denormalize(name, schemas.dictionary, state.data);
export const getDictionaries = state => state.data.dictionaries;


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
