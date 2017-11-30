import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

import { ListHeader, ListShowBy, ListTable } from "components/List";
import { H1, H2 } from "components/Title";
import Pagination from "components/Pagination";
import Button from "components/Button";

import Table from "components/Table";
import ShowBy from "containers/blocks/ShowBy";
import Icon from "components/Icon";
import DictionaryValue from "containers/blocks/DictionaryValue";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import { getMedications } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchMedications } from "./redux";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    title: "Знайти торгівельне найменування",
    filters: [
      { name: "id", title: "за ID", validate: uuidValidate },
      {
        name: "innm_dosage_id",
        title: "за ID лікарської форми",
        validate: uuidValidate
      },
      { name: "innm_dosage_name", title: "за назвою лікарської форми" },
      { name: "name", title: "за назвою" }
    ]
  }
];

const MedicationsListPage = ({ medications = [], paging, location, t }) => (
  <div id="medication-list-page">
    <Helmet
      title="Торгівельні найменування"
      meta={[{ property: "og:title", content: "Торгівельні найменування" }]}
    />

    <ListHeader
      button={
        <Button
          to="/medications/create"
          theme="border"
          size="small"
          color="orange"
          icon="add"
        >
          Створити торгівельне найменування
        </Button>
      }
    >
      <H1>Торгівельні найменування</H1>
    </ListHeader>

    <div>
      <H2>Пошук торгівельного найменування</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <ListShowBy>
      <ShowBy location={location} />
    </ListShowBy>

    <ListTable id="medication-table">
      <Table
        columns={[
          { key: "id", title: t("ID") },
          { key: "innm_dosage_id", title: t("ID лікарської форми") },
          { key: "name", title: t("Торгівельне найменування") },
          { key: "form", title: t("Форма /Виробник") },
          { key: "active", title: t("Активна") },
          { key: "action", title: t("Детально / Деактивація"), width: 200 }
        ]}
        data={medications.map(item => ({
          id: <div>{item.id}</div>,
          innm_dosage_id: (
            <div>{item.ingredients.filter(i => i.is_primary)[0].id}</div>
          ),
          name: <div>{item.name}</div>,
          form: (
            <div>
              <DictionaryValue dictionary="MEDICATION_FORM" value={item.form} />
              <br />
              {item.manufacturer.name}
            </div>
          ),
          active: <div>{item.is_active && <Icon name="check-right" />}</div>,
          action: (
            <Button
              id={`show-medication-detail-button-${item.id}`}
              theme="link"
              to={`/medications/${item.id}`}
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
      dispatch(fetchMedications({ page_size: 5, ...query }))
  }),
  connect(state => ({
    ...state.pages.MedicationsListPage,
    medications: getMedications(
      state,
      state.pages.MedicationsListPage.medications
    )
  }))
)(MedicationsListPage);
