import React from 'react';
import format from 'date-fns/format';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import filter from 'helpers/filter';

import { H1 } from 'components/Title';
import { ListShowBy, ListTable } from 'components/List';
import Table from 'components/Table';
import Button from 'components/Button';
import Pagination from 'components/Pagination';

import ShowBy from 'containers/blocks/ShowBy';
import SearchForm from 'containers/forms/SearchForm';

import DictionaryValue from 'containers/blocks/DictionaryValue';

import { getEmployees } from 'reducers';

import { fetchEmployees } from './redux';
import uuidValidate from '../../../helpers/validators/uuid-validate';

const FILTER_PARAMS = ['party_id', 'edrpou', 'legal_entity_id'];

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchEmployees({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.EmployeesListPage,
  employees: getEmployees(state, state.pages.EmployeesListPage.employees)
}))
export default class EmployeesListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }

  render() {
    const { employees = [], t, location, paging = {} } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="employees-list-page">
        <Helmet
          title={t('Employees')}
          meta={[{ property: 'og:title', content: t('Employees') }]}
        />

        <H1>{t('Employees')}</H1>

        <SearchForm
          active={activeFilter}
          placeholder={t('Find employee')}
          items={[
            {
              name: 'party_id',
              title: t('By party id'),
              validate: uuidValidate
            },
            { name: 'edrpou', title: t('By edrpou') },
            {
              name: 'legal_entity_id',
              title: t('By legal entity'),
              validate: uuidValidate
            }
          ]}
          initialValues={{
            [activeFilter]: location.query[activeFilter]
          }}
          onSubmit={values =>
            filter(
              {
                party_id: null,
                edrpou: null,
                legal_entity_id: null,
                page: 1,
                ...values
              },
              this.props
            )}
        />

        <ListShowBy>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </ListShowBy>

        <ListTable id="employees-table">
          <Table
            columns={[
              { key: 'date', title: t('Date registration') },
              { key: 'name', title: t('Employee name') },
              { key: 'position', title: t('Position') },
              { key: 'legalEntity', title: t('Legal entity') },
              { key: 'action', title: t('Action'), width: 100 }
            ]}
            data={employees.map(item => ({
              key: item.id,
              date: format(item.start_date, 'DD/MM/YYYY'),
              name: (
                <div>
                  {item.party.last_name} {item.party.first_name}
                  <div>{item.party.second_name}</div>
                </div>
              ),
              position: (
                <DictionaryValue dictionary="POSITION" value={item.position} />
              ),
              legalEntity: (
                <div>
                  <p>{item.legal_entity.name}</p>
                  <small>
                    {t('edrpou')} {item.legal_entity.edrpou}
                  </small>
                </div>
              ),
              action: (
                <Button
                  id={`show-employees-detail-button-${item.id}`}
                  theme="link"
                  to={`/employees/${item.id}`}
                >
                  {t('Details')}
                </Button>
              )
            }))}
          />
        </ListTable>
        {paging.total_pages > 1 && (
          <Pagination
            currentPage={paging.page_number}
            totalPage={paging.total_pages}
            location={location}
            cb={() => {}}
          />
        )}
      </div>
    );
  }
}
