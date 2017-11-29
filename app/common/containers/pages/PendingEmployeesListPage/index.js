import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";
import format from "date-fns/format";

import filter from "helpers/filter";

import { H1 } from "components/Title";
import { ListFilter, ListShowBy, ListTable } from "components/List";
import Table from "components/Table";
import Button from "components/Button";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import Select from "components/Select";

import { getEmployeesRequests, getDictionaryValues } from "reducers";

import { fetchEmployeesRequest } from "./redux";

const PendingEmployeesListPage = ({
  employees = [],
  status = [],
  t,
  location,
  router,
  paging = {}
}) => (
  <div id="pending-employees-list-page">
    <Helmet
      title={t("Pending employees")}
      meta={[{ property: "og:title", content: t("Pending Employees") }]}
    />

    <H1>{t("Pending Employees")}</H1>

    <ListFilter>
      <div>
        <Select
          placeholder={t("Filter by status")}
          options={status.map(i => ({ name: i.key, title: i.value }))}
          onChange={value =>
            setTimeout(() => {
              filter({ status: value, page: 1 }, { location, router });
            })}
          active={location.query.status || "NEW"}
        />
      </div>
      <div />
    </ListFilter>

    <ListShowBy>
      <ShowBy
        active={Number(location.query.page_size) || 5}
        onChange={page_size =>
          filter({ page_size, page: 1 }, { location, router })}
      />
    </ListShowBy>

    <ListTable id="pending-employees-table">
      <Table
        columns={[
          { key: "id", title: t("ID") },
          { key: "date", title: t("Date registration") },
          { key: "name", title: t("Employee name") },
          { key: "legalEntity", title: t("Legal entity") },
          { key: "action", title: t("Action"), width: 100 }
        ]}
        data={employees.map(item => ({
          key: item.id,
          id: item.id,
          date: format(item.inserted_at, "DD/MM/YYYY"),
          name: (
            <div>
              {item.last_name} {item.first_name}
              <div>{item.second_name}</div>
            </div>
          ),
          legalEntity: (
            <div>
              <p>{item.legal_entity_name}</p>
              <small>
                {t("edrpou")} {item.edrpou}
              </small>
            </div>
          ),
          action: (
            <Button
              id={`show-employees-detail-button-${item.id}`}
              theme="link"
              to={`/pending-employees/${item.id}`}
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
  withRouter,
  translate(),
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(fetchEmployeesRequest({ page_size: 5, status: "NEW", ...query }))
  }),
  connect(state => ({
    ...state.pages.PendingEmployeesListPage,
    employees: getEmployeesRequests(
      state,
      state.pages.PendingEmployeesListPage.employeesRequests
    ),
    status: getDictionaryValues(state, "EMPLOYEE_REQUEST_STATUS")
  }))
)(PendingEmployeesListPage);
