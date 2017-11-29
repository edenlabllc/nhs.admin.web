import React from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

import filter from "helpers/filter";

import { H1, H2 } from "components/Title";
import { ListTable, ListShowBy } from "components/List";
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

const DATE_FORMAT = "DD.MM.YYYY hh:mm";

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchDeclarations({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.DeclarationsListPage,
  declarations: getDeclarations(
    state,
    state.pages.DeclarationsListPage.declarations
  )
}))
export default class DeclarationsListPage extends React.Component {
  render() {
    const { declarations = [], t, location, paging = {} } = this.props;

    return (
      <div id="declarations-list-page">
        <Helmet
          title={t("Declarations")}
          meta={[{ property: "og:title", content: t("Declarations") }]}
        />

        <H1>{t("Declarations")}</H1>

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
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </ListShowBy>

        <ListTable id="declarations-table">
          <Table
            columns={[
              { key: "person", title: t("Person") },
              { key: "legalEntity", title: t("Legal entity") },
              { key: "dates", title: t("Dates"), width: 150 },
              { key: "status", title: t("Status") },
              { key: "action", title: t("Action"), width: 100 }
            ]}
            data={declarations.map(
              ({
                id,
                person = {},
                legal_entity = {},
                start_date,
                end_date,
                status
              }) => ({
                person: (
                  <div>
                    {`${person.last_name} ${person.first_name} `}
                    <br />
                    {person.second_name}
                  </div>
                ),
                legalEntity: (
                  <div>
                    {legal_entity && (
                      <div>
                        {legal_entity.name}
                        <br />
                        <ColoredText color="gray">
                          {t("EDRPOU")}: {legal_entity.edrpou}
                        </ColoredText>
                      </div>
                    )}
                  </div>
                ),
                dates: [
                  format(start_date, DATE_FORMAT),
                  format(end_date, DATE_FORMAT)
                ].join(" "),
                status,
                action: (
                  <Button
                    id={`show-declaration-detail-button-${id}`}
                    theme="link"
                    to={`/declarations/${id}`}
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
  }
}
