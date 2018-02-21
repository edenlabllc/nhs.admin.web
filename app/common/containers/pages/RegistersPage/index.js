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
import Button from "components/Button";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import DictionaryValue from "containers/blocks/DictionaryValue";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";
import SelectFilterField from "containers/forms/SelectFilterField";
import DateFilterField from "containers/forms/DateFilterField";

import { getRegisters } from "reducers";
import required from "helpers/validators/required-validate";
import uuidValidate from "helpers/validators/uuid-validate";
import { PERSON_TYPE, REGISTER_STATUS } from "helpers/enums";
import { fetchRegistersList } from "./redux";

const DATE_FORMAT = "DD/MM/YYYY";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    labelText: "Пошук файлів",
    placeholder: "Знайти файл",
    filters: [
      {
        name: "id",
        title: "За ID",
        validate: uuidValidate
      },
      { name: "file_name", title: "За назвою файлу" }
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
    component: DateFilterField,
    detailed: true,
    filters: [
      {
        name: "inserted_at_from",
        labelText: "Занесено від дати",
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
        labelText: "Занесено по дату",
        placeholder: "1990-01-01"
      }
    ]
  },
  {
    component: SelectFilterField,
    labelText: "Cтатус",
    placeholder: "Новий/В обробці/Оброблений",
    name: "status",
    detailed: true,
    options: [
      { title: "Новий", name: "NEW" },
      { title: "В обробці", name: "PROCESSING" },
      { title: "Оброблений", name: "PROCESSED" }
    ]
  }
];

const RegistersPage = ({ registers = [], paging = {}, location }) => (
  <div id="files-list-page">
    <Helmet title="Файли" meta={[{ property: "og:title", content: "Файли" }]} />
    <ListHeader
      button={
        <Button
          to="/registers/upload"
          theme="border"
          size="small"
          color="orange"
          icon="add"
        >
          Завантажити файл
        </Button>
      }
    >
      <H1>Перелік файлів</H1>
    </ListHeader>

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
            { key: "id", title: "ID Файлу" },
            { key: "inserted_at", title: "Дата додавання" },
            { key: "type", title: "Тип файлу" },
            { key: "file_name", title: "Назва файлу" },
            { key: "person_type", title: "Тип людини" },
            { key: "qty", title: "Статистика", width: 150 },
            { key: "errors", title: "Помилки" },
            { key: "status", title: "Статус файлу" },
            { key: "action", title: "Дії" }
          ]}
          data={registers.map(
            ({
              id,
              file_name,
              inserted_at,
              status,
              person_type,
              type,
              errors,
              qty: { total }
            }) => ({
              id,
              inserted_at: format(inserted_at, DATE_FORMAT),
              type: (
                <DictionaryValue
                  dictionary="REGISTER_TYPE"
                  value={type.toUpperCase()}
                />
              ),
              file_name,
              person_type: PERSON_TYPE[person_type] || person_type,
              qty: (
                <div>
                  {`Усьго записів:${total}`}
                  <br />
                  <Button
                    id={`registers-errors-button-${id}`}
                    theme="link"
                    to={`/registers/${id}`}
                  >
                    Показати
                  </Button>
                </div>
              ),
              status: (
                <ColoredText color={REGISTER_STATUS[status].color}>
                  <b>{REGISTER_STATUS[status].title}</b>
                </ColoredText>
              ),
              errors,
              action: (
                <Button
                  id={`show-declaration-detail-button-${id}`}
                  theme="link"
                  to={`/registers-entries?register_id=${id}`}
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
