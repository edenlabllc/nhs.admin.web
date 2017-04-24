import React from 'react';
import { Route } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

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
          <Route path="clinics" component={ClinicsListPage} />
          <Route path="clinics/:id" component={ClinicDetailPage} />

          <Route path="declarations" component={DeclarationsListPage} />
          <Route path="declarations/:id" component={DeclarationDetailPage} />

          <Route path="employees" component={EmployeesListPage} />
          <Route path="employees/:id" component={EmployeeDetailPage} />

          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
