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
import DateFilterField from "containers/forms/DateFilterField";

import { getContracts } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";
import { CONTRACT_STATUS } from "helpers/enums";
import { fetchContracts } from "./redux";

const DATE_FORMAT = "DD.MM.YYYY";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    filters: [
      {
        name: "id",
        title: "За ID",
        validate: uuidValidate
      },
      {
        name: "contract_number",
        title: "За номером контракту"
      },
      {
        name: "contractor_legal_entity_id",
        title: "За ID надавача",
        validate: uuidValidate
      }
    ]
  },
  {
    component: SearchFilterField,
    detailed: true,
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
    detailed: true,
    hasSelect: false,
    labelText: "За номером контракту",
    placeholder: "Введіть номер",
    filters: [
      {
        name: "contract_number"
      }
    ]
  },
  {
    component: SearchFilterField,
    detailed: true,
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
    component: SearchFilterField,
    detailed: true,
    hasSelect: false,
    labelText: "ЄДРПОУ",
    placeholder: "Введіть ЄДРПОУ",
    filters: [
      {
        name: "edrpou"
      }
    ]
  },
  {
    component: SelectFilterField,
    labelText: "Статус",
    placeholder: "Веріфікований/Завершений",
    name: "status",
    options: [
      { title: "Веріфікований", name: "VERIFIED" },
      { title: "Завершений", name: "TERMINATED" }
    ],
    detailed: true
  },
  {
    component: DateFilterField,
    detailed: true,
    filters: [
      {
        name: "date_from_start_date",
        labelText: "Дата початку дії договору",
        placeholder: "з 01.01.1990"
      },
      {
        name: "date_to_start_date",
        placeholder: "по 01.01.1990"
      }
    ]
  },

  {
    component: DateFilterField,
    detailed: true,
    filters: [
      {
        name: "date_from_end_date",
        labelText: "Кінцева дата дії договору",
        placeholder: "з 01.01.1990"
      },
      {
        name: "date_to_end_date",
        placeholder: "по 01.01.1990"
      }
    ]
  }
];

const ContractsListPage = ({ contracts = [], paging = {}, location, t }) => (
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
            key: "startDate",
            title: "Діє з",
            width: 105
          },
          {
            key: "endDate",
            title: "Діє по",
            width: 105
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
            startDate: format(start_date, DATE_FORMAT),
            endDate: format(end_date, DATE_FORMAT),
            status: status && (
              <ColoredText color={CONTRACT_STATUS[status].color}>
                {CONTRACT_STATUS[status].title}
              </ColoredText>
            ),
            action: (
              <Button
                id={`show-contract-detail-button-${id}`}
                theme="link"
                to={`/contracts/${id}`}
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
      dispatch(fetchContracts({ page_size: 5, ...query }))
  }),
  connect(state => ({
    ...state.pages.ContractsListPage,
    contracts: getContracts(state, state.pages.ContractsListPage.contracts)
  }))
)(ContractsListPage);
