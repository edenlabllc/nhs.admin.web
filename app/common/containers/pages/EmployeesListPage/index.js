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

import ShowBy from 'containers/blocks/ShowBy';
import SearchForm from 'containers/forms/SearchForm';

import { getEmployees } from 'reducers';

import { fetchEmployees } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(fetchEmployees(query)),
})
@connect(state => ({
  ...state.pages.EmployeesListPage,
  employees: getEmployees(state, state.pages.EmployeesListPage.employees),
}))
export default class EmployeesListPage extends React.Component {
  render() {
    const { employees = [], t, location } = this.props;

    return (
      <div id="employees-list-page">
        <Helmet
          title={t('Employees')}
          meta={[
            { property: 'og:title', content: t('Employees') },
          ]}
        />
        <H1>{ t('Employees') }</H1>

        <SearchForm
          active="tax_id"
          placeholder={t('Find employee')}
          items={[
            { name: 'tax_id', title: t('By tax id') },
            { name: 'party_id', title: t('By party id') },
            { name: 'edrpou', title: t('By edrpou') },
            { name: 'legal_entity_id', title: t('By legal entity') },
          ]}
          onSubmit={(values) => {
            this.props.router.push({
              pathname: location.pathname,
              query: values,
            });
          }}
        />

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.limit) || 5}
            onChange={limit => filter({ limit }, this.props)}
          />
        </div>

        <div id="employees-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'name', title: t('Name') },
              { key: 'position', title: t('Position') },
              { key: 'dates', title: t('Dates'), width: 150 },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={employees.map(item => ({
              id: item.id,
              name: (
                <div>
                  {item.party.last_name} {item.party.first_name}
                  <div>{item.party.second_name}</div>
                </div>
              ),
              dates: `${format(item.start_date, 'DD.MM.YYYY hh:mm')} ${format(item.end_date, 'DD.MM.YYYY hh:mm')}`,
              position: item.position,
              action: (<Button id={`show-employees-detail-button-${item.id}`} theme="link" to={`/employees/${item.id}`}>{ t('Details') }</Button>),
            }))}
          />
        </div>
      </div>
    );
  }
}
