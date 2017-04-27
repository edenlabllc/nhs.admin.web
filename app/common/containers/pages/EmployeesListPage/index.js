import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getEmployees } from 'reducers';

import { fetchEmployees } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchEmployees()),
})
@connect(state => ({
  ...state.pages.EmployeesListPage,
  employees: getEmployees(state, state.pages.EmployeesListPage.employees),
}))
export default class EmployeesListPage extends React.Component {
  render() {
    const { employees = [], t } = this.props;

    return (
      <div id="employees-list-page">
        <H1>{ t('Employees') }</H1>
        <p>{ t('Select dictionary to edit') }</p>
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
