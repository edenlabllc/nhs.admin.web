import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import { H1 } from "components/Title";

import { fetchConfiguration } from "redux/configuration";
import { getGlobalSatistic, getConfiguration } from "reducers";

import { fetchGlobalStat } from "./redux";
import styles from "./styles.scss";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) =>
    Promise.all([dispatch(fetchGlobalStat()), dispatch(fetchConfiguration())])
})
@connect(state => ({
  globalStatistic: getGlobalSatistic(state),
  configuration: getConfiguration(state)
}))
@translate()
export default class DashboardPage extends React.Component {
  render() {
    const { globalStatistic, configuration: { bi_url }, t } = this.props;

    return (
      <div id="dashboard-page">
        <Helmet
          title={t("Dashboard")}
          meta={[{ property: "og:title", content: t("Dashboard") }]}
        />

        <H1>{t("Dashboard")}</H1>

        <div className={styles.global}>
          <div>
            <div className={styles.count}>{globalStatistic.declarations}</div>
            {t("Declarations")}
          </div>
          <div>
            <div className={styles.count}>{globalStatistic.doctors}</div>
            {t("Doctors")}
          </div>
          <div>
            <div className={styles.count}>{globalStatistic.msps}</div>
            {t("Medical system providers")}
          </div>
        </div>

        {bi_url && (
          <iframe
            src={bi_url}
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>
    );
  }
}
