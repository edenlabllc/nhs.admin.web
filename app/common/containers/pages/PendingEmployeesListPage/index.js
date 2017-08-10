import React from 'react';
import format from 'date-fns/format';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import filter from 'helpers/filter';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import Pagination from 'components/CursorPagination';

import ShowBy from 'containers/blocks/ShowBy';
import SearchForm from 'containers/forms/SearchForm';

import { getEmployees } from 'reducers';

import { fetchEmployeesRequest } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = ['tax_id', 'party_id', 'edrpou', 'legal_entity_id'];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchEmployeesRequest({ limit: 5, status: 'NEW', ...query })),
})
@connect(state => ({
  ...state.pages.PendingEmployeesListPage,
  employees: getEmployees(state, state.pages.PendingEmployeesListPage.employees),
}))
export default class PendingEmployeesListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(Object.keys(this.props.location.query)
      .filter(key => ~FILTER_PARAMS.indexOf(key))[0]);
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }

  render() {
    const { employees = [], t, location, paging = {} } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="pending-employees-list-page">
        <Helmet
          title={t('Pending Employees')}
          meta={[
            { property: 'og:title', content: t('Pending Employees') },
          ]}
        />

        <H1>{ t('Pending Employees') }</H1>

        <SearchForm
          active={activeFilter}
          placeholder={t('Find employee')}
          items={[
            { name: 'tax_id', title: t('By tax id') },
            { name: 'party_id', title: t('By party id') },
            { name: 'edrpou', title: t('By edrpou') },
            { name: 'legal_entity_id', title: t('By legal entity') },
          ]}
          initialValues={{
            [activeFilter]: location.query[activeFilter],
          }}
          onSubmit={values => filter({
            party_id: null,
            edrpou: null,
            legal_entity_id: null,
            tax_id: null,
            ...values,
          }, this.props)}
        />

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.limit) || 5}
            onChange={limit => filter({ limit }, this.props)}
          />
        </div>

        <div id="pending-employees-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('ID') },
              { key: 'date', title: t('Date registration') },
              { key: 'name', title: t('Employee name') },
              { key: 'legalEntity', title: t('Legal entity') },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={employees.map(item => ({
              key: item.id,
              id: item.id,
              date: format(item.inserted_at, 'DD/MM/YYYY'),
              name: (
                <div>
                  {item.last_name} {item.first_name}
                  <div>{item.second_name}</div>
                </div>
              ),
              legalEntity: <div>
                <p>{item.legal_entity_name}</p>
                <small>{t('edrpou')} {item.edrpou}</small>
              </div>,
              action: (<Button id={`show-employees-detail-button-${item.id}`} theme="link" to={`/pending-employees/${item.id}`}>{ t('Details') }</Button>),
            }))}
          />
        </div>

        {paging.cursors && <div className={styles.pagination}>
          <Pagination
            location={location}
            after={paging.cursors.starting_after}
            before={paging.cursors.ending_before}
          />
        </div>}
      </div>
    );
  }
}
