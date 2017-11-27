import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

import filter from "helpers/filter";

import { ListShowBy } from "components/List";
import { H1, H2 } from "components/Title";
import Pagination from "components/Pagination";

import ClinicsList from "containers/blocks/ClinicsList";
import ShowBy from "containers/blocks/ShowBy";

import SearchForm from "containers/forms/SearchForm";

import { getClinics } from "reducers";

import { fetchClinics } from "./redux";
import uuidValidate from "../../../helpers/validators/uuid-validate";

const FILTER_PARAMS = ["edrpou", "legal_entity_id", "settlement_id"];

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchClinics({ page_size: 5, ...query }))
})
@connect(
  state => ({
    ...state.pages.ClinicsListPage,
    clinics: getClinics(state, state.pages.ClinicsListPage.clinics)
  }),
  { fetchClinics }
)
export default class ClinicsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { clinics = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="clinics-list-page">
        <Helmet
          title={t("Clinics")}
          meta={[{ property: "og:title", content: t("Clinics") }]}
        />

        <H1>{t("Clinics")}</H1>

        <div>
          <H2>{t("Search clinic")}</H2>

          <SearchForm
            active={activeFilter}
            placeholder={t("Find clinic")}
            items={[
              { name: "edrpou", title: t("By edrpou") },
              {
                name: "legal_entity_id",
                title: t("By legal entity"),
                validate: uuidValidate
              },
              {
                name: "settlement_id",
                title: t("By settlement id"),
                validate: uuidValidate
              }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  edrpou: null,
                  legal_entity_id: null,
                  settlement_id: null,
                  page: 1,
                  ...values
                },
                this.props
              )
            }
          />
        </div>

        <ListShowBy>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </ListShowBy>

        <ClinicsList clinics={clinics} />

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
