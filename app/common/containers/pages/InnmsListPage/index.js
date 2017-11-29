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

import Table from "components/Table";
import ShowBy from "containers/blocks/ShowBy";
import Icon from "components/Icon";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import { getInnms } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchInnms } from "./redux";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    title: "Знайти МНН",
    filters: [
      { name: "id", title: "За ідентифікатором", validate: uuidValidate },
      { name: "sctid", title: "За sctid" },
      { name: "name", title: "За назвою" },
      { name: "name_original", title: "За оригінальною назвою" }
    ]
  }
];

const InnmsListPage = ({ innms = [], t, paging, location, router }) => (
  <div id="innms-list-page">
    <Helmet
      title={t("МНН")}
      meta={[{ property: "og:title", content: t("МНН") }]}
    />

    <ListHeader
      button={
        <Button
          to="/innms/create"
          theme="border"
          size="small"
          color="orange"
          icon="add"
        >
          Cтворити МНН
        </Button>
      }
    >
      <H1>{t("МНН")}</H1>
    </ListHeader>

    <div>
      <H2>Пошук МНН</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <ListShowBy>
      <ShowBy
        active={Number(location.query.page_size) || 5}
        onChange={page_size =>
          filter({ page_size, page: 1 }, { location, router })}
      />
    </ListShowBy>

    <ListTable id="innms-table">
      <Table
        columns={[
          { key: "id", title: t("id") },
          { key: "name", title: t("Назва МНН") },
          { key: "name_original", title: t("Оригінальна назва МНН") },
          { key: "sctid", title: t("SCTID") },
          { key: "active", title: t("Активна") },
          { key: "action", title: t("Action"), width: 100 }
        ]}
        data={innms.map(item => ({
          id: <div>{item.id}</div>,
          name: <div>{item.name}</div>,
          name_original: <div>{item.name_original}</div>,
          sctid: <div>{item.sctid ? item.sctid : "-"}</div>,
          active: <div>{item.is_active && <Icon name="check-right" />}</div>,
          action: (
            <Button
              id={`show-innm-detail-button-${item.id}`}
              theme="link"
              to={`/innms/${item.id}`}
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
      dispatch(fetchInnms({ page_size: 5, ...query }))
  }),
  connect(state => ({
    ...state.pages.InnmsListPage,
    innms: getInnms(state, state.pages.InnmsListPage.innms)
  }))
)(InnmsListPage);
