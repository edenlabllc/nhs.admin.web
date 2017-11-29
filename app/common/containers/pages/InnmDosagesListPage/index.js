import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

import filter from "helpers/filter";

import { ListHeader, ListShowBy, ListTable } from "components/List";
import { H1, H2 } from "components/Title";
import Pagination from "components/Pagination";
import Button from "components/Button";
import Icon from "components/Icon";
import DictionaryValue from "containers/blocks/DictionaryValue";

import Table from "components/Table";
import ShowBy from "containers/blocks/ShowBy";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import { getInnmDosages } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchInnmDosages } from "./redux";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    title: "Знайти лікарську форму",
    filters: [
      {
        name: "id",
        title: "За ідентифікатором",
        validate: uuidValidate
      },
      { name: "name", title: "За назвою" }
    ]
  }
];

const InnmDosagesListPage = ({
  innm_dosages = [],
  t,
  paging,
  location,
  router
}) => (
  <div id="innm-dosages-list-page">
    <Helmet
      title="Лікарські форми"
      meta={[{ property: "og:title", content: t("Лікарські форми") }]}
    />
    <ListHeader
      button={
        <Button
          to="/innm-dosages/create"
          theme="border"
          size="small"
          color="orange"
          icon="add"
        >
          Створити лікарську форму
        </Button>
      }
    >
      <H1>Лікарські форми</H1>
    </ListHeader>

    <div>
      <H2>Знайти лікарську форму</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <ListShowBy>
      <ShowBy
        active={Number(location.query.page_size) || 5}
        onChange={page_size =>
          filter({ page_size, page: 1 }, { location, router })}
      />
    </ListShowBy>

    <ListTable id="innm-dosages-table">
      <Table
        columns={[
          { key: "id", title: t("ID") },
          { key: "name", title: t("Назва") },
          { key: "form", title: t("Форма") },
          { key: "active", title: t("Активна") },
          { key: "action", title: t("Деталі /Деактивація"), width: 150 }
        ]}
        data={innm_dosages.map(item => ({
          id: <div>{item.id}</div>,
          name: <div>{item.name}</div>,
          form: (
            <div>
              <DictionaryValue dictionary="MEDICATION_FORM" value={item.form} />
            </div>
          ),
          active: <div>{item.is_active && <Icon name="check-right" />}</div>,
          action: (
            <Button
              id={`show-innm-dosages-detail-button-${item.id}`}
              theme="link"
              to={`/innm-dosages/${item.id}`}
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
      dispatch(fetchInnmDosages({ page_size: 5, ...query }))
  }),
  connect(state => ({
    ...state.pages.InnmDosagesListPage,
    innm_dosages: getInnmDosages(
      state,
      state.pages.InnmDosagesListPage.innm_dosages
    )
  }))
)(InnmDosagesListPage);
