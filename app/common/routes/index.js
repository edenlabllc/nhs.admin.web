import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import DictionariesPage from 'containers/pages/DictionariesPage';
import DictionaryPage from 'containers/pages/DictionaryPage';
import ClinicsListPage from 'containers/pages/ClinicsListPage';
import ClinicDetailPage from 'containers/pages/ClinicDetailPage';


import DeclarationsListPage from 'containers/pages/DeclarationsListPage';
import DeclarationDetailPage from 'containers/pages/DeclarationDetailPage';

import EmployeesListPage from 'containers/pages/EmployeesListPage';
import EmployeeDetailPage from 'containers/pages/EmployeeDetailPage';

import NotFoundPage from 'containers/pages/NotFoundPage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <Route path="dictionaries">
            <IndexRoute component={DictionariesPage} />
            <Route path=":name" component={DictionaryPage} />
          </Route>

          <Route path="clinics">
            <IndexRoute component={ClinicsListPage} />
            <Route path=":id" component={ClinicDetailPage} />
          </Route>

          <Route path="declarations">
            <IndexRoute component={DeclarationsListPage} />
            <Route path=":id" component={DeclarationDetailPage} />
          </Route>

          <Route path="employees">
            <IndexRoute component={EmployeesListPage} />
            <Route path=":id" component={EmployeeDetailPage} />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
