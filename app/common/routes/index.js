import React from 'react';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';
import PreloadData from 'containers/layouts/PreloadData';

import SignInPage from 'containers/pages/SignInPage';

import DashboardPage from 'containers/pages/DashboardPage';

import DictionariesPage from 'containers/pages/DictionariesPage';
import DictionaryPage from 'containers/pages/DictionaryPage';

import ClinicsListPage from 'containers/pages/ClinicsListPage';
import ClinicsSearchPage from 'containers/pages/ClinicsSearchPage';
import ClinicsVerificationListPage from 'containers/pages/ClinicsVerificationListPage';
import ClinicDetailPage from 'containers/pages/ClinicDetailPage';

import DeclarationsListPage from 'containers/pages/DeclarationsListPage';
import DeclarationDetailPage from 'containers/pages/DeclarationDetailPage';
import PendingDeclarationsListPage from 'containers/pages/PendingDeclarationsListPage';
import PendingDeclarationDetailPage from 'containers/pages/PendingDeclarationDetailPage';

import EmployeesListPage from 'containers/pages/EmployeesListPage';
import EmployeeDetailPage from 'containers/pages/EmployeeDetailPage';
import PendingEmployeesListPage from 'containers/pages/PendingEmployeesListPage';
import PendingEmployeeDetailPage from 'containers/pages/PendingEmployeeDetailPage';

import ReportsListPage from 'containers/pages/ReportsListPage';

import SystemConfigurationPage from 'containers/pages/SystemConfigurationPage';

import NotFoundPage from 'containers/pages/NotFoundPage';
import AccessDeniedPage from 'containers/pages/AccessDeniedPage';

import { getUser, getToken, getScope } from 'reducers';

import { PUBLIC_INDEX_ROUTE } from 'config';

import { hasScope } from 'helpers/scope';
import { isLoginned, logout } from 'redux/session';
import { fetchUserData } from 'redux/user';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  const requireAuth = (nextState, replace, next) =>
    store.dispatch(isLoginned()).then((loginned) => {
      if (!loginned) {
        replace({ pathname: PUBLIC_INDEX_ROUTE });
        return next();
      }

      const currentState = store.getState();
      const person = getUser(currentState);

      if (person) return next();

      return store.dispatch(fetchUserData(getToken(currentState))).then((action) => {
        if (action.error) {
          store.dispatch(logout());
          replace({ pathname: PUBLIC_INDEX_ROUTE });
        }

        return next();
      });
    });

  const requireScope = requiredScope => (nextState, replace, next) => {
    if (!hasScope(requiredScope, getScope(store.getState()))) {
      replace({ pathname: '/401' });
    }
    return next();
  };

  return (
    <Route component={App}>
      <Route component={Main} onEnter={requireAuth}>
        <Route path="/" component={PreloadData}>
          <IndexRedirect to="dashboard" />
          <Route path="dashboard" component={DashboardPage} />
          <Route path="dictionaries">
            <IndexRoute component={DictionariesPage} />
            <Route path=":name" component={DictionaryPage} />
          </Route>
          <Route path="clinics" onEnter={requireScope(['legal_entity:read'])}>
            <IndexRoute component={ClinicsListPage} />
            <Route path=":id" component={ClinicDetailPage} />
          </Route>
          <Route path="clinics-verification" onEnter={requireScope(['legal_entity:read'])} >
            <IndexRoute component={ClinicsSearchPage} />
            <Route path="list" component={ClinicsVerificationListPage} />
          </Route>
          <Route path="declarations" onEnter={requireScope(['declaration:read'])} >
            <IndexRoute component={DeclarationsListPage} />
            <Route path=":id" component={DeclarationDetailPage} />
          </Route>
          <Route path="pending-declarations" onEnter={requireScope(['declaration_request:read'])}>
            <IndexRoute component={PendingDeclarationsListPage} />
            <Route path=":id" component={PendingDeclarationDetailPage} />
          </Route>
          <Route path="employees" onEnter={requireScope(['employee:read'])} >
            <IndexRoute component={EmployeesListPage} />
            <Route path=":id" component={EmployeeDetailPage} />
          </Route>
          <Route path="pending-employees" onEnter={requireScope(['employee_request:read'])} >
            <IndexRoute component={PendingEmployeesListPage} />
            <Route path=":id" component={PendingEmployeeDetailPage} />
          </Route>
          <Route path="configuration" component={SystemConfigurationPage} onEnter={requireScope(['global_parameters:read'])} />
          <Route path="reports" component={ReportsListPage} />
        </Route>
        <Route path="401" component={AccessDeniedPage} />
      </Route>
      <Route path="sign-in" component={SignInPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
