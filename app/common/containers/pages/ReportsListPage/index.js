import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';

import ReportsList from 'containers/blocks/ReportsList';

import { getReports } from 'reducers';

import { fetchReports } from 'redux/reports';

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchReports()),
})
@connect(state => ({
  reports: getReports(state),
}))
export default class ReportsListPage extends React.Component {
  render() {
    const { reports = [], t } = this.props;

    return (
      <div id="clinics-list-page">
        <Helmet
          title={t('Reports')}
          meta={[
            { property: 'og:title', content: t('Reports') },
          ]}
        />

        <H1>{ t('Reports') }</H1>

        <ReportsList reports={reports} />
      </div>
    );
  }
}
