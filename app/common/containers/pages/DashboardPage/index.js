import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1, H3 } from 'components/Title';
import FoldingTable from 'components/FoldingTable';

import DeclarationsChartRow from 'containers/blocks/DeclarationsChartRow';

import { fetchDeclarationsStat } from 'redux/reports';

import { getGlobalSatistic, getDetailStatistic } from 'reducers';

import { fetchGlobalStat, fetchDetailStat } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => Promise.all([
    dispatch(fetchGlobalStat()),
    dispatch(fetchDetailStat()),
  ]),
})
@connect(state => ({
  globalStatistic: getGlobalSatistic(state),
  detailStatistic: getDetailStatistic(state, state.pages.DashboardPage.detailStat),
}), { fetchDeclarationsStat })
@translate()
export default class DashboardPage extends React.Component {
  render() {
    const { globalStatistic, detailStatistic, t } = this.props;

    return (
      <div id="dashboard-page">
        <H1>{ t('Dashboard') }</H1>

        <div className={styles.global}>
          <div>
            <div className={styles.count}>
              {globalStatistic.declarations}
            </div>
            { t('Declarations') }
          </div>
          <div>
            <div className={styles.count}>
              {globalStatistic.declarations_signed}
            </div>
            { t('Declarations signed') }
          </div>
          <div>
            <div className={styles.count}>
              {globalStatistic.declarations_terminated}
            </div>
            { t('Declarations terminated') }
          </div>
          <div>
            <div className={styles.count}>
              {globalStatistic.doctors}
            </div>
            { t('Doctors') }
          </div>
          <div>
            <div className={styles.count}>
              {globalStatistic.medical_system_providers}
            </div>
            { t('Medical system providers') }
          </div>
        </div>

        <H3>{ t('By regions') }</H3>

        <div className={styles.detail}>
          <FoldingTable
            columns={[
              { key: 'region_name', title: t('Region') },
              { key: 'declarations', title: t('Declarations') },
              { key: 'declarations_signed', title: t('Declarations signed') },
              { key: 'declarations_terminated', title: t('Declarations terminated') },
              { key: 'doctors', title: t('Doctors') },
              { key: 'medical_system_providers', title: t('Medical system providers') },
            ]}
            data={detailStatistic}
            component={DeclarationsChartRow}
            onOpen={({ id }) => {
              this.props.fetchDeclarationsStat({ area: id });
            }}
          />
        </div>
      </div>
    );
  }
}
