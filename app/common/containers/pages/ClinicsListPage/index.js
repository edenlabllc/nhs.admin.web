import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H1, H2 } from 'components/Title';
import Pagination from 'components/CursorPagination';

import ClinicsList from 'containers/blocks/ClinicsList';
import ShowBy from 'containers/blocks/ShowBy';

import SearchForm from 'containers/forms/SearchForm';

import { getClinics } from 'reducers';

import { fetchClinics } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(fetchClinics(query)),
})
@connect(state => ({
  ...state.pages.ClinicsListPage,
  clinics: getClinics(state, state.pages.ClinicsListPage.clinics),
}), { fetchClinics })
export default class ClinicsListPage extends React.Component {
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
      <div id="clinics-list-page">
        <Helmet
          title={t('Clinics')}
          meta={[
            { property: 'og:title', content: t('Clinics') },
          ]}
        />

        <H1>{ t('Clinics') }</H1>

        <div className={styles.search}>
          <H2>{ t('Search clinic') }</H2>
          <SearchForm
            active="edrpou"
            placeholder={t('Find clinic')}
            items={[
              { name: 'edrpou', title: t('By edrpou') },
              { name: 'legal_entity_id', title: t('By legal entity') },
              { name: 'settlement_id', title: t('By settlement id') },
            ]}
            onSubmit={values => this.filterClinics({
              edrpou: null,
              legal_entity_id: null,
              settlement_id: null,
              ...values,
            })}
          />
        </div>

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.limit) || 5}
            onChange={limit => this.filterClinics({ limit })}
          />
        </div>

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
