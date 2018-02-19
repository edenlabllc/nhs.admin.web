import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
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
import DateFilterField from "containers/forms/DateFilterField";

import { getPersgetRegistersons } from "reducers";
import required from "helpers/validators/required-validate";

import { fetchRegistersList } from "./redux";

const DATE_FORMAT = "DD.MM.YYYY";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    title: "Введіть ім'я",
    hasSelect: false,
    filters: [
      {
        name: "first_name",
        validate: required
      }
    ]
  },
  {
    component: SearchFilterField,
    title: "Введіть прізвище",
    hasSelect: false,
    filters: [
      {
        name: "last_name",
        validate: required
      }
    ]
  },
  {
    component: SearchFilterField,
    title: "Введіть по-батькові",
    hasSelect: false,
    filters: [
      {
        name: "second_name"
      }
    ]
  },
  {
    component: DateFilterField,
    title: "",
    filters: [
      {
        name: "birth_date",
        title: "Дата народження",
        placeholder: "1990-01-01",
        validate: required
      }
    ]
  },
  {
    component: SearchFilterField,
    title: "Введіть tax_id",
    hasSelect: false,
    filters: [
      {
        name: "tax_id"
      }
    ]
  },
  {
    component: SearchFilterField,
    title: "380508887700",
    hasSelect: false,
    hasLabel: true,
    label: "Введіть телефон",
    filters: [
      {
        name: "mobile_phone"
      }
    ]
  }
];

const RegistersPage = ({ registers = [], paging = {}, location }) => (
  <div id="files-list-page">
    <Helmet title="Файли" meta={[{ property: "og:title", content: "Файли" }]} />

    <H1>Персони</H1>

    <div>
      <H2>Пошук файлу</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <div>
      <ListShowBy>
        <ShowBy location={location} />
      </ListShowBy>

      <ListTable id="files-table">
        <Table
          columns={[
            { key: "id", title: "ID" },
            { key: "file_name", title: "Назва" },
            { key: "inserted_date", title: "Створено" },
            { key: "status", title: "Статус" },
            { key: "person_type", title: "person_type" },
            { key: "type", title: "Тип" },
            { key: "qty", title: "qty" },
            { key: "errors", title: "errors" },
            { key: "action", title: "Дії" }
          ]}
          data={registers.map(
            ({
              id,
              file_name,
              inserted_date,
              status,
              person_type,
              type,
              qty,
              errors
            }) => ({
              id,
              file_name,
              inserted_date,
              status,
              person_type,
              type,
              qty,
              errors,
              action: (
                <Button
                  id={`show-declaration-detail-button-${id}`}
                  theme="link"
                  to={`/declarations/?person_id=${id}`}
                >
                  Деталі
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
  </div>
);

export default compose(
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(
        fetchRegistersList({
          page_size: 10,
          ...query
        })
      )
  }),
  connect(state => ({
    ...state.pages.RegistersPage,
    registers: getRegisters(state, state.pages.RegistersPage.registers)
  }))
)(RegistersPage);
