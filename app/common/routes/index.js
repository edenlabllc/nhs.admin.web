import React from "react";

import { Route, IndexRoute, IndexRedirect } from "react-router";

import App from "containers/layouts/App";
import Main from "containers/layouts/Main";
import PreloadData from "containers/layouts/PreloadData";

import SignInPage from "containers/pages/SignInPage";

import DashboardPage from "containers/pages/DashboardPage";

import DictionariesPage from "containers/pages/DictionariesPage";
import DictionaryPage from "containers/pages/DictionaryPage";

import ClinicsListPage from "containers/pages/ClinicsListPage";
import ClinicsSearchPage from "containers/pages/ClinicsSearchPage";
import ClinicsVerificationListPage from "containers/pages/ClinicsVerificationListPage";
import ClinicDetailPage from "containers/pages/ClinicDetailPage";

import DeclarationsListPage from "containers/pages/DeclarationsListPage";
import DeclarationDetailPage from "containers/pages/DeclarationDetailPage";
import PendingDeclarationsListPage from "containers/pages/PendingDeclarationsListPage";
import PendingDeclarationDetailPage from "containers/pages/PendingDeclarationDetailPage";

import EmployeesListPage from "containers/pages/EmployeesListPage";
import EmployeeDetailPage from "containers/pages/EmployeeDetailPage";
import PendingEmployeesListPage from "containers/pages/PendingEmployeesListPage";
import PendingEmployeeDetailPage from "containers/pages/PendingEmployeeDetailPage";

import ReportsListPage from "containers/pages/ReportsListPage";

import SystemConfigurationPage from "containers/pages/SystemConfigurationPage";

import InnmsListPage from "containers/pages/InnmsListPage";
import InnmCreatePage from "containers/pages/InnmCreatePage";
import InnmDetailPage from "containers/pages/InnmDetailPage";

import InnmDosagesListPage from "containers/pages/InnmDosagesListPage";
import InnmDosagesCreatePage from "containers/pages/InnmDosagesCreatePage";
import InnmDosagesDetailPage from "containers/pages/InnmDosagesDetailPage";

import MedicationsListPage from "containers/pages/MedicationsListPage";
import MedicationCreatePage from "containers/pages/MedicationCreatePage";
import MedicationDetailPage from "containers/pages/MedicationDetailPage";

import MedicalProgramsListPage from "containers/pages/MedicalProgramsListPage";
import MedicalProgramCreatePage from "containers/pages/MedicalProgramCreatePage";
import MedicalProgramDetailPage from "containers/pages/MedicalProgramDetailPage";

import ProgramMedicationsListPage from "containers/pages/ProgramMedicationsListPage";
import ProgramMedicationDetailPage from "containers/pages/ProgramMedicationDetailPage";
import ProgramMedicationUpdatePage from "containers/pages/ProgramMedicationUpdatePage";
import ProgramMedicationCreatePage from "containers/pages/ProgramMedicationCreatePage";

import MedicationRequestsListPage from "containers/pages/MedicationRequestsListPage";
import MedicationRequestDetailPage from "containers/pages/MedicationRequestDetailPage";

import MedicationDispensesListPage from "containers/pages/MedicationDispensesListPage";
import MedicationDispenseDetailPage from "containers/pages/MedicationDispenseDetailPage";

import BlackUsersListPage from "containers/pages/BlackUsersListPage";
import BlackListUserDetailPage from "containers/pages/BlackListUserDetailPage";
import BlackUserCreatePage from "containers/pages/BlackUserCreatePage";

import PartyUsersListPage from "containers/pages/PartyUsersListPage";

import ResetAuthenticationMethodPage from "containers/pages/ResetAuthenticationMethodPage";

import PersonSearchPage from "containers/pages/PersonSearchPage";

import RegistersPage from "containers/pages/RegistersPage";
import RegisterUploadPage from "containers/pages/RegisterUploadPage";
import RegistersDetailPage from "containers/pages/RegistersDetailPage";

import NotFoundPage from "containers/pages/NotFoundPage";
import AccessDeniedPage from "containers/pages/AccessDeniedPage";

import { isAuthorized, getScope } from "reducers";

import { PUBLIC_INDEX_ROUTE } from "config";

import { hasScope } from "helpers/scope";
import { getToken, verifyToken } from "redux/session";

import ReimbursementReportPage from "../containers/pages/ReimbursementReport/index";
import InternalErrorPage from "../containers/pages/InternalErrorPage/index";

export const configureRoutes = ({ store }) => {
  const requireAuth = async (nextState, replace, next) => {
    if (__CLIENT__) {
      if (!isAuthorized(store.getState())) {
        replace({ pathname: PUBLIC_INDEX_ROUTE });
      }
    } else {
      // FIXME: We should handle case when there is no token passed
      const token = await store.dispatch(getToken());
      const { error } = await store.dispatch(verifyToken(token));
      if (error) {
        replace({ pathname: PUBLIC_INDEX_ROUTE });
      }
    }

    return next();
  };

  const requireScope = requiredScope => (nextState, replace, next) => {
    if (!hasScope(requiredScope, getScope(store.getState()))) {
      replace({ pathname: "/401" });
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
          <Route path="persons">
            <IndexRoute component={PersonSearchPage} />
          </Route>
          <Route path="clinics" onEnter={requireScope(["legal_entity:read"])}>
            <IndexRoute component={ClinicsListPage} />
            <Route path=":id" component={ClinicDetailPage} />
          </Route>
          <Route
            path="clinics-verification"
            onEnter={requireScope(["legal_entity:read"])}
          >
            <IndexRoute component={ClinicsSearchPage} />
            <Route path="list" component={ClinicsVerificationListPage} />
          </Route>
          <Route
            path="declarations"
            onEnter={requireScope(["declaration:read"])}
          >
            <IndexRoute component={DeclarationsListPage} />
            <Route path=":id" component={DeclarationDetailPage} />
          </Route>
          <Route
            path="pending-declarations"
            onEnter={requireScope(["declaration:read"])}
          >
            <IndexRoute component={PendingDeclarationsListPage} />
            <Route path=":id" component={PendingDeclarationDetailPage} />
          </Route>
          <Route path="employees" onEnter={requireScope(["employee:read"])}>
            <IndexRoute component={EmployeesListPage} />
            <Route path=":id" component={EmployeeDetailPage} />
          </Route>
          <Route
            path="pending-employees"
            onEnter={requireScope(["employee_request:read"])}
          >
            <IndexRoute component={PendingEmployeesListPage} />
            <Route path=":id" component={PendingEmployeeDetailPage} />
          </Route>
          <Route path="innms" onEnter={requireScope(["innm:read"])}>
            <IndexRoute component={InnmsListPage} />
            <Route path="create" component={InnmCreatePage} />
            <Route path=":id" component={InnmDetailPage} />
          </Route>
          <Route
            path="innm-dosages"
            onEnter={requireScope(["innm_dosage:read"])}
          >
            <IndexRoute component={InnmDosagesListPage} />
            <Route path="create" component={InnmDosagesCreatePage} />
            <Route path=":id" component={InnmDosagesDetailPage} />
          </Route>
          <Route path="medications" onEnter={requireScope(["medication:read"])}>
            <IndexRoute component={MedicationsListPage} />
            <Route path="create" component={MedicationCreatePage} />
            <Route path=":id" component={MedicationDetailPage} />
          </Route>
          <Route
            path="medication-requests"
            onEnter={requireScope(["medication_request:read"])}
          >
            <IndexRoute component={MedicationRequestsListPage} />
            <Route path=":id" component={MedicationRequestDetailPage} />
          </Route>
          <Route
            path="medication-dispenses"
            onEnter={requireScope(["medication_dispense:read"])}
          >
            <IndexRoute component={MedicationDispensesListPage} />
            <Route path=":id" component={MedicationDispenseDetailPage} />
          </Route>
          <Route
            path="reimbursement-report"
            onEnter={requireScope(["reimbursement_report:download"])}
          >
            <IndexRoute component={ReimbursementReportPage} />
          </Route>
          <Route
            path="medical-programs"
            onEnter={requireScope(["medical_program:read"])}
          >
            <IndexRoute component={MedicalProgramsListPage} />
            <Route path="create" component={MedicalProgramCreatePage} />
            <Route path=":id" component={MedicalProgramDetailPage} />
          </Route>
          <Route
            path="program-medications"
            onEnter={requireScope(["program_medication:read"])}
          >
            <IndexRoute component={ProgramMedicationsListPage} />
            <Route
              path="create"
              onEnter={requireScope(["program_medication:write"])}
              component={ProgramMedicationCreatePage}
            />
            <Route path=":id/update" component={ProgramMedicationUpdatePage} />
            <Route path=":id" component={ProgramMedicationDetailPage} />
          </Route>

          <Route path="party-users" onEnter={requireScope(["party_user:read"])}>
            <IndexRoute component={PartyUsersListPage} />
          </Route>
          <Route
            path="black-list-users"
            onEnter={requireScope(["bl_user:read"])}
          >
            <IndexRoute component={BlackUsersListPage} />
            <Route path="create" component={BlackUserCreatePage} />
            <Route path=":id" component={BlackListUserDetailPage} />
          </Route>
          <Route
            path="configuration"
            component={SystemConfigurationPage}
            onEnter={requireScope(["global_parameters:read"])}
          />
          <Route path="registers" onEnter={requireScope(["register:read"])}>
            <IndexRoute component={RegistersPage} />
            <Route path="upload" component={RegisterUploadPage} />
            <Route path=":id" component={RegistersDetailPage} />
          </Route>
          <Route path="reports" component={ReportsListPage} />
          <Route
            path="reset-authentication-method"
            onEnter={requireScope(["person:reset_authentication_method"])}
            component={ResetAuthenticationMethodPage}
          />
        </Route>
        <Route path="401" component={AccessDeniedPage} />
      </Route>
      <Route path="sign-in" component={SignInPage} />
      <Route path="internal-error" component={InternalErrorPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
