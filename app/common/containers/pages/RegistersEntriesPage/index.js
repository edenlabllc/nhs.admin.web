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
import { ListHeader } from "components/List";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import DictionaryValue from "containers/blocks/DictionaryValue";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";
import DateFilterField from "containers/forms/DateFilterField";
import SelectFilterField from "containers/forms/SelectFilterField";

import { getRegisterEntry } from "reducers";

import required from "helpers/validators/required-validate";
import uuidValidate from "helpers/validators/uuid-validate";

import { PERSON_TYPE, REGISTER_ENTITY_STATUS } from "helpers/enums";
import { fetchRegisterEntriesList } from "./redux";

const DATE_FORMAT = "DD/MM/YYYY";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    // labelText: "Пошук файлів",
    placeholder: "Знайти файл",
    filters: [
      {
        name: "id",
        title: "За ID",
        validate: uuidValidate
      },
      { name: "register_id", title: "За ID реєстру" }
    ]
  },
  {
    component: SelectFilterField,
    labelText: "Cтатус",
    placeholder: "Знайдено/В обробці/Не знайдено",
    name: "status",
    detailed: true,
    options: [
      { title: "Не знайдено", name: "NOT_FOUND" },
      { title: "В обробці", name: "PROCESSING" },
      { title: "Знайдено", name: "MATCHED" }
    ]
  },
  {
    component: SelectFilterField,
    labelText: "Тип файлу",
    placeholder: "Оберіть тип файлу",
    name: "type",
    detailed: true,
    options: [{ title: "Реєстрація смерті", name: "DEATH_REGISTRATION" }]
  },
  {
    component: SearchFilterField,
    labelText: "Номер файлу",
    placeholder: "Введіть назву файлу",
    hasSelect: false,
    detailed: true,
    filters: [
      {
        name: "file_name"
      }
    ]
  },
  {
    component: DateFilterField,
    detailed: true,
    filters: [
      {
        name: "inserted_at_from",
        labelText: "Дата з",
        placeholder: "1990-01-01"
      }
    ]
  },
  {
    component: DateFilterField,
    detailed: true,
    filters: [
      {
        name: "inserted_at_to",
        labelText: "Дата по",
        placeholder: "1990-01-01"
      }
    ]
  },
  {
    component: SearchFilterField,
    labelText: "Номер документу",
    placeholder: "Введіть номер документу",
    hasSelect: false,
    detailed: true,
    filters: [
      {
        name: "document_number"
      }
    ]
  }
];

const RegistersEntriesPage = ({
  register_entries = [],
  paging = {},
  location
}) => (
  <div id="files-list-page">
    <Helmet
      title="Записи файлів"
      meta={[{ property: "og:title", content: "Записи файлів" }]}
    />

    <H1>Записи файлів</H1>
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
            { key: "register_id", title: "ID Запису" },
            { key: "file_name", title: "Назва файлу" },
            { key: "type", title: "Тип файлу" },
            { key: "document_type", title: "Документ номер" },
            { key: "inserted_at", title: "Дата додавання" },
            { key: "status", title: "Статус запису" }
          ]}
          data={register_entries.map(
            ({
              id,
              register_id,
              document_type,
              document_number,
              inserted_at,
              file_name,
              type,
              status
            }) => ({
              id,
              register_id,
              file_name,
              type: (
                <DictionaryValue
                  dictionary="REGISTER_TYPE"
                  value={type.toUpperCase()}
                />
              ),
              document_type: (
                <div>
                  <DictionaryValue
                    dictionary="DOCUMENT_TYPE"
                    value={document_type.toUpperCase()}
                  />
                  <br />
                  {`${document_number}`}
                </div>
              ),
              inserted_at: format(inserted_at, DATE_FORMAT),
              status: (
                <ColoredText color={REGISTER_ENTITY_STATUS[status].color}>
                  <b>{REGISTER_ENTITY_STATUS[status].title}</b>
                </ColoredText>
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
        fetchRegisterEntriesList({
          page_size: 10,
          ...query
        })
      )
  }),
  connect((state, location) => ({
    ...state.pages.RegistersEntriesPage,
    register_entries: getRegisterEntry(
      state,
      state.pages.RegistersEntriesPage.registerEntries
    )
  }))
)(RegistersEntriesPage);
