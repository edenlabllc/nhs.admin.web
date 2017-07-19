import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';
import Pagination from 'components/CursorPagination';
import Icon from 'components/Icon';

import ClinicsList from 'containers/blocks/ClinicsList';
import ShowBy from 'containers/blocks/ShowBy';

import { getClinics } from 'reducers';

import { fetchClinics } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(
    fetchClinics({ ...query, nhs_verified: false })
  ),
})
@connect(state => ({
  ...state.pages.ClinicsListPage,
  clinics: getClinics(state, state.pages.ClinicsListPage.clinics),
}), { fetchClinics })
export default class ClinicsVerificationListPage extends React.Component {
  filterClinics(filter) {
    const newFilter = {
      ...this.props.location.query,
      ...filter,
    };

    const query = Object.keys(newFilter).reduce((target, key) => {
      if (newFilter[key]) {
        target[key] = newFilter[key]; // eslint-disable-line
      }

      return target;
    }, { });

    this.props.router.push({
      ...this.props.location,
      query,
    });
  }

  render() {
    const { clinics = [], t, paging, location } = this.props;

    return (
      <div id="clinics-verification-list-page">
        <Helmet
          title={t('Verification clinics')}
          meta={[
            { property: 'og:title', content: t('Verification clinics') },
          ]}
        />

        <div className={styles.back}>
          <Link to="/clinics-verification">
            <Icon name="back" /> {t('Back to search page')}
          </Link>
        </div>

        <H1>{ t('Verification clinics') }</H1>

        <ShowBy
          active={Number(location.query.limit) || 5}
          onChange={limit => this.filterClinics({ limit })}
        />

        <ClinicsList clinics={clinics} />

        <div className={styles.pagination}>
          <Pagination
            location={location}
            after={paging.cursors.starting_after}
            before={paging.cursors.ending_before}
          />
        </div>
      </div>
    );
  }
}
