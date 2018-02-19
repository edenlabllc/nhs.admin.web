import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

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

const ClinicsListPage = ({ clinics = [], paging, location, t }) => (
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
            labelText: t("Find clinic"),
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
      <ShowBy location={location} />
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
