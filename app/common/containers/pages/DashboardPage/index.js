import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import { H1 } from "components/Title";

import { getGlobalSatistic } from "reducers";

import { fetchGlobalStat } from "./redux";
import styles from "./styles.scss";

const { BI_URL } = process.env;

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => Promise.all([dispatch(fetchGlobalStat())])
})
@connect(state => ({
  globalStatistic: getGlobalSatistic(state)
}))
@translate()
export default class DashboardPage extends React.Component {
  render() {
    const { globalStatistic, t } = this.props;

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

        {BI_URL && (
          <iframe
            width="100%"
            height="600"
            src={BI_URL}
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>
    );
  }
}
