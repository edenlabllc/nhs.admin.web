import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";
import format from "date-fns/format";

import { H1, H2 } from "components/Title";
import { ListTable, ListShowBy } from "components/List";
import Table from "components/Table";
import ColoredText from "components/ColoredText";
import Button from "components/Button";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";
import SelectFilterField from "containers/forms/SelectFilterField";

import { getContracts } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchContractRequests } from "./redux";

import { CONTRACT_STATUS } from "helpers/enums";

const DATE_FORMAT = "DD.MM.YYYY hh:mm";

const SEARCH_FIELDS = [
  // {
  //   component: SearchFilterField,
  //   filters: [
  //     {
  //       name: "id",
  //       title: "За ID",
  //       validate: uuidValidate
  //     },
  //     {
  //       name: "contract_number",
  //       title: "За номером контракту",
  //       validate: uuidValidate
  //     },
  //     {
  //       name: "contractor_legal_entity_id",
  //       title: "За ID надавача",
  //       validate: uuidValidate
  //     }
  //   ]
  // },
  {
    component: SearchFilterField,
    // detailed: true,
    hasSelect: false,
    labelText: "ID договору",
    placeholder: "Введіть ID",
    filters: [
      {
        name: "id",
        validate: uuidValidate
      }
    ]
  },
  {
    component: SearchFilterField,
    // detailed: true,
    hasSelect: false,
    labelText: "За номером контракту",
    placeholder: "Введіть номер",
    filters: [
      {
        name: "contract_number",
        validate: uuidValidate
      }
    ]
  },
  {
    component: SearchFilterField,
    // detailed: true,
    hasSelect: false,
    labelText: "За ID надавача",
    placeholder: "Введіть ID надавача",
    filters: [
      {
        name: "contractor_legal_entity_id",
        validate: uuidValidate
      }
    ]
  },
  {
    component: SelectFilterField,
    labelText: "Статус",
    placeholder: "Новий/Відмінений/Підписаний",
    name: "status",
    options: [
      { title: "Новий", name: "NEW" },
      { title: "Відмінений", name: "DECLINED" },
      { title: "Завершений", name: "TERMINATED" },
      { title: "Підтверджений", name: "APPROVED" },
      { title: "Очікує на підписання від НСЗУ", name: "PENDING_NHS_SIGN" },
      { title: "Підписаний НСЗУ", name: "NHS_SIGNED" },
      { title: "Підписаний", name: "SIGNED" }
    ]
    // detailed: true
  }
];

const ContractRequestsListPage = ({
  contracts = [],
  paging = {},
  location,
  t
}) => (
  <div id="contracts-list-page">
    <Helmet
      title={t("Contracts")}
      meta={[{ property: "og:title", content: t("Contracts") }]}
    />

    <H1>{t("Contracts")}</H1>

    <div>
      <H2>{t("Search contracts")}</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <ListShowBy>
      <ShowBy location={location} />
    </ListShowBy>

    <ListTable id="contracts-table">
      <Table
        columns={[
          {
            key: "id",
            title: "ID контракту"
          },
          {
            key: "legalEntityId",
            title: "ID надавача"
          },
          {
            key: "contractNumber",
            title: "Номер контракту"
          },
          {
            key: "dates",
            title: "Дата дії контракту з по"
          },
          { key: "status", title: "Статус" },
          { key: "action", title: "Дія", width: 100 }
        ]}
        data={contracts.map(
          ({
            id,
            contract_id,
            contract_number,
            contractor_legal_entity_id,
            start_date,
            end_date,
            status
          }) => ({
            id,
            legalEntityId: contractor_legal_entity_id,
            contractNumber: contract_number,
            dates: [
              format(start_date, DATE_FORMAT),
              format(end_date, DATE_FORMAT)
            ].join(" "),
            status: (
              <ColoredText color={CONTRACT_STATUS[status].color}>
                {CONTRACT_STATUS[status].title}
              </ColoredText>
            ),
            action: (
              <Button
                id={`show-contract-detail-button-${id}`}
                theme="link"
                to={`/contract-requests/${id}`}
              >
                {t("Details")}
              </Button>
            )
          })
        )}
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
      dispatch(fetchContractRequests({ page_size: 5, ...query }))
  }),
  connect(state => ({
    ...state.pages.ContractRequestsListPage,
    contracts: getContracts(
      state,
      state.pages.ContractRequestsListPage.contracts
    )
  }))
)(ContractRequestsListPage);
