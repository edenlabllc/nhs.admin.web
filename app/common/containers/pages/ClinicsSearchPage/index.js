import React from "react";
import { compose } from "redux";
import { translate } from "react-i18next";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import { H1, H2 } from "components/Title";
import Button from "components/Button";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import uuidValidate from "helpers/validators/uuid-validate";

import styles from "./styles.scss";

const ClinicsSearchPage = ({ location, t }) => (
  <div id="clinics-search-page">
    <Helmet
      title={t("Clinics verification search")}
      meta={[
        { property: "og:title", content: t("Clinics verification search") }
      ]}
    />

    <H1>{t("Clinics verification")}</H1>

    <H2>{t("Search clinic for verification")}</H2>

    <div className={styles.search}>
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
    <div>
      <Button to="/clinics" theme="link">
        <span className={styles.link}>{t("Go to clinics list")}</span>
      </Button>
    </div>
  </div>
);

export default compose(withStyles(styles), translate())(ClinicsSearchPage);
