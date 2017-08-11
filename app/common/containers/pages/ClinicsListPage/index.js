import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import filter from 'helpers/filter';

import { H1, H2 } from 'components/Title';
import Pagination from 'components/CursorPagination';

import ClinicsList from 'containers/blocks/ClinicsList';
import ShowBy from 'containers/blocks/ShowBy';

import SearchForm from 'containers/forms/SearchForm';

import { getClinics } from 'reducers';

import { fetchClinics } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = ['edrpou', 'legal_entity_id', 'settlement_id'];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(fetchClinics({ limit: 5, ...query })),
})
@connect(state => ({
  ...state.pages.ClinicsListPage,
  clinics: getClinics(state, state.pages.ClinicsListPage.clinics),
}), { fetchClinics })
export default class ClinicsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(Object.keys(this.props.location.query)
      .filter(key => ~FILTER_PARAMS.indexOf(key))[0]);
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { clinics = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

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
            active={activeFilter}
            placeholder={t('Find clinic')}
            items={[
              { name: 'edrpou', title: t('By edrpou') },
              { name: 'legal_entity_id', title: t('By legal entity') },
              { name: 'settlement_id', title: t('By settlement id') },
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter],
            }}
            onSubmit={values => filter({
              edrpou: null,
              legal_entity_id: null,
              settlement_id: null,
              ...values,
            }, this.props)}
          />
        </div>

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.limit) || 5}
            onChange={limit => filter({ limit }, this.props)}
          />
        </div>

        <ClinicsList clinics={clinics} />

        {paging.cursors && <div className={styles.pagination}>
          <Pagination
            location={location}
            after={paging.cursors.starting_after}
            before={paging.cursors.ending_before}
            more={paging.has_more}
          />
        </div>}
      </div>
    );
  }
}
