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

import { getPersons } from "reducers";
import required from "helpers/validators/required-validate";

import { fetchPersonsList } from "./redux";

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

const PersonSearchPage = ({ persons = [], paging = {}, location }) => (
  <div id="declarations-list-page">
    <Helmet
      title="Персони"
      meta={[{ property: "og:title", content: "Персони" }]}
    />

    <H1>Персони</H1>

    <div>
      <H2>Пошук персони</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <div>
      <ListShowBy>
        <ShowBy location={location} />
      </ListShowBy>

      <ListTable id="persons-table">
        <Table
          columns={[
            { key: "id", title: "ID" },
            { key: "person", title: "ПІБ" },
            { key: "birth_date", title: " Дата народження" },
            { key: "tax_id", title: "ІНН" },
            { key: "mobile_phone", title: "Телефон" },
            { key: "birth_settlements", title: "Місце народження" },
            { key: "action", title: "Дії" }
          ]}
          data={persons.map(
            ({
              id,
              first_name,
              last_name,
              second_name = "",
              birth_date,
              tax_id = "?",
              mobile_phone = "?",
              birth_settlements = "?"
            }) => ({
              id,
              person: <div>{`${first_name} ${last_name} ${second_name}`}</div>,
              birth_date: <div>{format(birth_date, DATE_FORMAT)}</div>,
              tax_id,
              mobile_phone,
              birth_settlements,
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
      query.first_name &&
      query.last_name &&
      query.birth_date &&
      dispatch(
        fetchPersonsList({
          page_size: 5,
          ...query
        })
      )
  }),
  connect(state => ({
    ...state.pages.PersonSearchPage,
    persons: getPersons(state, state.pages.PersonSearchPage.persons)
  }))
)(PersonSearchPage);
