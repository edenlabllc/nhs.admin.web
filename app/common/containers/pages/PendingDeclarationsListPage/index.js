import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";
import format from "date-fns/format";

import { H1, H2 } from "components/Title";
import { ListShowBy, ListTable } from "components/List";
import Table from "components/Table";
import ColoredText from "components/ColoredText";
import Button from "components/Button";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import { getDeclarations } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchDeclarations } from "./redux";

const PendingDeclarationsListPage = ({
  declarations = [],
  paging = {},
  location,
  t
}) => (
  <div id="pending-declarations-list-page">
    <Helmet
      title={t("Pending declarations")}
      meta={[{ property: "og:title", content: t("Pending declarations") }]}
    />

    <H1>{t("Pending declarations")}</H1>

    <div>
      <H2>{t("Search declaration")}</H2>
      <SearchForm
        fields={[
          {
            component: SearchFilterField,
            title: t("Find declaration"),
            filters: [
              {
                name: "employee_id",
                title: t("By employee id"),
                validate: uuidValidate
              },
              {
                name: "legal_entity_id",
                title: t("By legal entity"),
                validate: uuidValidate
              }
            ]
          }
        ]}
        location={location}
      />
    </div>

    <ListShowBy>
      <ShowBy location={location} />
    </ListShowBy>

    <ListTable id="declarations-table">
      <Table
        columns={[
          { key: "person", title: t("Person") },
          { key: "legalEntity", title: t("Legal entity") },
          { key: "dates", title: t("Dates"), width: 150 },
          { key: "action", title: t("Action"), width: 100 }
        ]}
        data={declarations.map(item => ({
          person: item.person ? (
            <div>
              {`${item.person.last_name} ${item.person.first_name}`}
              <div>{item.person.second_name}</div>
            </div>
          ) : (
            "-"
          ),
          legalEntity: item.legal_entity ? (
            <div>
              {item.legal_entity.name}
              <br />
              <ColoredText color="gray">
                {t("EDRPOU")}: {item.legal_entity.edrpou}
              </ColoredText>
            </div>
          ) : (
            "-"
          ),
          dates: `${format(item.start_date, "DD.MM.YYYY hh:mm")} – ${format(
            item.end_date,
            "DD.MM.YYYY hh:mm"
          )}`,
          action: (
            <Button
              id={`show-declaration-detail-button-${item.id}`}
              theme="link"
              to={`/pending-declarations/${item.id}`}
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
      dispatch(
        fetchDeclarations({
          page_size: 5,
          status: "pending_verification",
          ...query
        })
      )
  }),
  connect(state => ({
    ...state.pages.PendingDeclarationsListPage,
    declarations: getDeclarations(
      state,
      state.pages.PendingDeclarationsListPage.declarations
    )
  }))
)(PendingDeclarationsListPage);
