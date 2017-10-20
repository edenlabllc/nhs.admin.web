import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';
import { ListPagination } from 'components/List';
import Pagination from 'components/CursorPagination';
import Icon from 'components/Icon';

import BackLink from 'containers/blocks/BackLink';
import ClinicsList from 'containers/blocks/ClinicsList';
import ShowBy from 'containers/blocks/ShowBy';

import { getClinics } from 'reducers';

import { fetchClinics } from './redux';

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchClinics({ ...query, nhs_verified: false }))
})
@connect(
  state => ({
    ...state.pages.ClinicsListPage,
    clinics: getClinics(state, state.pages.ClinicsListPage.clinics)
  }),
  { fetchClinics }
)
export default class ClinicsVerificationListPage extends React.Component {
  filterClinics(filter) {
    const newFilter = {
      ...this.props.location.query,
      ...filter
    };

    const query = Object.keys(newFilter).reduce((target, key) => {
      if (newFilter[key]) {
        target[key] = newFilter[key]; // eslint-disable-line
      }

      return target;
    }, {});

    this.props.router.push({
      ...this.props.location,
      query
    });
  }

  render() {
    const { clinics = [], t, paging, location } = this.props;

    return (
      <div id="clinics-verification-list-page">
        <Helmet
          title={t('Verification clinics')}
          meta={[{ property: 'og:title', content: t('Verification clinics') }]}
        />

        <BackLink to="/clinics-verification" detached>
          {t('Back to search page')}
        </BackLink>

        <H1>{t('Verification clinics')}</H1>

        <ShowBy
          active={Number(location.query.limit) || 5}
          onChange={limit => this.filterClinics({ limit })}
        />

        <ClinicsList clinics={clinics} />

        {paging.cursors && (
          <ListPagination>
            <Pagination
              location={location}
              after={paging.cursors.starting_after}
              before={paging.cursors.ending_before}
            />
          </ListPagination>
        )}
      </div>
    );
  }
}
