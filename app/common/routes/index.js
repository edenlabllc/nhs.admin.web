import React from 'react';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

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

import SystemConfigurationPage from 'containers/pages/SystemConfigurationPage';

import NotFoundPage from 'containers/pages/NotFoundPage';

import { getUser, getToken } from 'reducers';

import { isLoginned, logout } from 'redux/session';
import { fetchUserData } from 'redux/user';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  const requireAuth = (nextState, replace, next) =>
    store.dispatch(isLoginned()).then((loginned) => {
      if (!loginned) {
        replace({ pathname: '/sign-in' });
        return next();
      }

      const currentState = store.getState();
      const person = getUser(currentState);

      if (person) return next();

      return store.dispatch(fetchUserData(getToken(currentState))).then((action) => {
        if (action.error) {
          store.dispatch(logout());
          replace({ pathname: '/sign-in' });
        }

        return next();
      });
    });

  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">

          <Route onEnter={requireAuth}>
            <IndexRedirect to="/dictionaries" />

            <Route path="dashboard" component={DashboardPage} />

            <Route path="dictionaries">
              <IndexRoute component={DictionariesPage} />
              <Route path=":name" component={DictionaryPage} />
            </Route>

            <Route path="clinics">
              <IndexRoute component={ClinicsListPage} />
              <Route path=":id" component={ClinicDetailPage} />
            </Route>

            <Route path="clinics-verification">
              <IndexRoute component={ClinicsSearchPage} />
              <Route path="list" component={ClinicsVerificationListPage} />
            </Route>

            <Route path="declarations">
              <IndexRoute component={DeclarationsListPage} />
              <Route path=":id" component={DeclarationDetailPage} />
            </Route>

            <Route path="pending-declarations">
              <IndexRoute component={PendingDeclarationsListPage} />
              <Route path=":id" component={PendingDeclarationDetailPage} />
            </Route>

            <Route path="employees">
              <IndexRoute component={EmployeesListPage} />
              <Route path=":id" component={EmployeeDetailPage} />
            </Route>

            <Route path="configuration" component={SystemConfigurationPage} />
          </Route>
        </Route>

        <IndexRedirect to="sign-in" />
      </Route>

      <Route path="sign-in" component={SignInPage} />

      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
