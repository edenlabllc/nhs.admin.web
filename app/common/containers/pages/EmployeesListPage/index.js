import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";
import format from "date-fns/format";

import { H1 } from "components/Title";
import { ListShowBy, ListTable } from "components/List";
import Table from "components/Table";
import Button from "components/Button";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import DictionaryValue from "containers/blocks/DictionaryValue";

import { getEmployees } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchEmployees } from "./redux";

const EmployeesListPage = ({ employees = [], paging = {}, location, t }) => (
  <div id="employees-list-page">
    <Helmet
      title={t("Employees")}
      meta={[{ property: "og:title", content: t("Employees") }]}
    />

    <H1>{t("Employees")}</H1>

    <SearchForm
      fields={[
        {
          component: SearchFilterField,
          title: t("Find employee"),
          filters: [
            {
              name: "party_id",
              title: t("By party id"),
              validate: uuidValidate
            },
            { name: "edrpou", title: t("By edrpou") },
            {
              name: "legal_entity_id",
              title: t("By legal entity"),
              validate: uuidValidate
            }
          ]
        }
      ]}
      location={location}
    />

    <ListShowBy>
      <ShowBy location={location} />
    </ListShowBy>

    <ListTable id="employees-table">
      <Table
        columns={[
          { key: "date", title: t("Date registration") },
          { key: "name", title: t("Employee name") },
          { key: "position", title: t("Position") },
          { key: "legalEntity", title: t("Legal entity") },
          { key: "action", title: t("Action"), width: 100 }
        ]}
        data={employees.map(item => ({
          key: item.id,
          date: format(item.start_date, "DD/MM/YYYY"),
          name: (
            <div>
              {item.party.last_name} {item.party.first_name}
              <br />
              {item.party.second_name}
            </div>
          ),
          position: (
            <DictionaryValue dictionary="POSITION" value={item.position} />
          ),
          legalEntity: (
            <div>
              <p>{item.legal_entity.name}</p>
              <small>
                {t("edrpou")} {item.legal_entity.edrpou}
              </small>
            </div>
          ),
          action: (
            <Button
              id={`show-employees-detail-button-${item.id}`}
              theme="link"
              to={`/employees/${item.id}`}
            >
              {t("Details")}
            </Button>
          )
        }))}
      />
    </ListTable>
    {paging.total_pages > 1 && (
      <Pagination
        currentPage={paging.page_number}
        totalPage={paging.total_pages}
        location={location}
        cb={() => {}}
      />
    )}
  </div>
);

export default compose(
  translate(),
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(fetchEmployees({ page_size: 5, ...query }))
  }),
  connect(state => ({
    ...state.pages.EmployeesListPage,
    employees: getEmployees(state, state.pages.EmployeesListPage.employees)
  }))
)(EmployeesListPage);
