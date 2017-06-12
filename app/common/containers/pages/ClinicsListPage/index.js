import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import YesNo from 'components/YesNo';
import Select from 'components/Select';
import Pagination from 'components/CursorPagination';

import EdrpouFilterForm from 'containers/forms/EdrpouFilterForm';

import { fetchDictionaries } from 'redux/dictionaries';

import { getClinics, getDictionaryValues } from 'reducers';

import { fetchClinics } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => Promise.all([
    dispatch(fetchClinics(query)),
    dispatch(fetchDictionaries({ name: 'LEGAL_FORM' })),
  ]),
})
@connect(state => ({
  ...state.pages.ClinicsListPage,
  clinics: getClinics(state, state.pages.ClinicsListPage.clinics),
  legalForms: getDictionaryValues(state, 'LEGAL_FORM'),
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
    const { clinics = [], legalForms, t, paging, location } = this.props;

    return (
      <div id="clinics-list-page">
        <H1>{ t('Clinics') }</H1>
        <div className={styles.filter}>
          <div>
            <Select
              placeholder={t('Filter by type')}
              active={location.query.type}
              options={[
                { title: t('All'), name: null },
                { name: 'MSP', title: 'MSP' },
              ]}
              onChange={type => this.filterClinics({ type })}
            />
          </div>
          <div>
            <Select
              placeholder={t('Filter by status')}
              active={location.query.status}
              options={[
                { title: t('All'), name: null },
                { title: t('Verified'), name: 'VERIFIED' },
                { title: t('Not verified'), name: 'NOT_VERIFIED' },
              ]}
              onChange={status => this.filterClinics({ status })}
            />
          </div>
          <div>
            <Select
              placeholder={t('Filter by owner type')}
              active={location.query.owner_property_type}
              options={[
                { title: t('All'), name: null },
                { title: t('State'), name: 'STATE' },
                { title: t('Private'), name: 'PRIVATE' },
              ]}
              onChange={owner_property_type => this.filterClinics({ owner_property_type })}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <div>
            <Select
              placeholder={t('Filter by legal form')}
              active={location.query.legal_form}
              options={[
                { title: t('All'), name: null },
                ...legalForms.map(item => ({ name: item.key, title: item.value })),
              ]}
              onChange={legal_form => this.filterClinics({ legal_form })}
            />
          </div>
          <div>
            <EdrpouFilterForm
              initialValues={{ edrpou: location.query.edrpou }}
              onSubmit={({ edrpou }) => this.filterClinics({ edrpou })}
            />
          </div>
        </div>
        <div id="clinics-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: t('Name') },
              { key: 'type', title: t('Type') },
              { key: 'status', title: t('Status') },
              { key: 'active', title: t('Active'), width: 100 },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={clinics.map(i => ({
              name: <div className={styles.name}>
                {i.name}
                <p>{i.legal_form}</p>
              </div>,
              status: i.status,
              type: i.type,
              active: <YesNo bool={i.active} />,
              action: (<Button id={`show-clinic-detail-button-${i.name}`} theme="link" to={`/clinics/${i.id}`}>{ t('Details') }</Button>),
            }))}
          />
        </div>

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
