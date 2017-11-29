import React from "react";
import { compose } from "redux";
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
import SearchFilterField from "containers/forms/SearchFilterField";

import { getClinics } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchClinics } from "./redux";

const ClinicsListPage = ({ clinics = [], t, paging, location, router }) => (
  <div id="clinics-list-page">
    <Helmet
      title={t("Clinics")}
      meta={[{ property: "og:title", content: t("Clinics") }]}
    />

    <H1>{t("Clinics")}</H1>

    <div>
      <H2>{t("Search clinic")}</H2>

      <SearchForm
        fields={[
          {
            component: SearchFilterField,
            title: t("Find clinic"),
            filters: [
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
            ]
          }
        ]}
        location={location}
      />
    </div>

    <ListShowBy>
      <ShowBy
        active={Number(location.query.page_size) || 5}
        onChange={page_size =>
          filter({ page_size, page: 1 }, { location, router })}
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

export default compose(
  withRouter,
  translate(),
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(fetchClinics({ page_size: 5, ...query }))
  }),
  connect(
    state => ({
      ...state.pages.ClinicsListPage,
      clinics: getClinics(state, state.pages.ClinicsListPage.clinics)
    }),
    { fetchClinics }
  )
)(ClinicsListPage);
