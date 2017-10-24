import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import format from 'date-fns/format';

import { setFilter, getFilter } from 'helpers/filter';

import { ListHeader, ListShowBy, ListTable } from 'components/List';
import { H1, H2 } from 'components/Title';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import Table from 'components/Table';
import Icon from 'components/Icon';

import ShowBy from 'containers/blocks/ShowBy';

import SearchForm from 'containers/forms/SearchForm';

import { getMedicationRequests } from 'reducers';

import { fetchMedicationRequests } from './redux';

const FILTERS = [
  { name: 'employee_id', title: 'За ID працівника' },
  { name: 'person_id', title: 'За ID пацієнта' },
  { name: 'status', title: 'За статусом' },
  { name: 'request_number', title: 'За номером запиту' },
  // { name: 'created_from', title: 'За датою створення' },
  // { name: 'created_to', title: 'За датою створення' },
  { name: 'division_id', title: 'За ID розподілу' },
  { name: 'medication_id', title: 'За ID торгової назви' }
];

const MedicationRequestsListPage = ({
  location,
  router,
  medication_requests = [],
  paging,
  activeFilter
}) => (
  <div id="medication-requests-list-page">
    <Helmet
      title="Медичні запити"
      meta={[{ property: 'og:title', content: 'Медичні запити' }]}
    />

    <ListHeader>
      <H1>Медичні запити</H1>
    </ListHeader>

    <div>
      <H2>Пошук запиту</H2>

      <SearchForm
        active={activeFilter}
        placeholder="Знайти запит"
        items={FILTERS}
        initialValues={{ [activeFilter]: location.query[activeFilter] }}
        onSubmit={values => setFilter(values, { location, router })}
      />
    </div>

    <ListShowBy>
      <ShowBy
        active={Number(location.query.page_size) || 5}
        onChange={page_size =>
          setFilter({ page_size, page: 1 }, { location, router })}
      />
    </ListShowBy>

    <ListTable id="medication-requests-table">
      <Table
        columns={[
          { key: 'created_at', title: 'Дата створення', width: 120 },
          { key: 'id', title: 'ID' },
          { key: 'request_number', title: 'Номер запиту' },
          { key: 'division_id', title: 'ID філії' },
          { key: 'medication_id', title: 'ID торгової назви', width: 110 },
          { key: 'person_id', title: 'ID пацієнта' },
          { key: 'status', title: 'Статус' },
          { key: 'action', title: 'Дії', width: 100 }
        ]}
        data={medication_requests.map(
          ({
            created_at,
            id,
            request_number,
            division,
            medication_info: { medication_id },
            person,
            status
          }) => ({
            created_at: format(created_at, 'DD/MM/YYYY'),
            id: (
              <div className="rtl nobr" title={id}>
                {id}
              </div>
            ),
            request_number: (
              <div className="rtl nobr" title={request_number}>
                {request_number}
              </div>
            ),
            division_id: (
              <div className="rtl nobr" title={division.id}>
                {division.id}
              </div>
            ),
            medication_id: (
              <div className="rtl nobr" title={medication_id}>
                {medication_id}
              </div>
            ),
            person_id: (
              <div className="rtl nobr" title={person.id}>
                {person.id}
              </div>
            ),
            status,
            action: (
              <Button
                id={`show-medication-requests-detail-button-${id}`}
                theme="link"
                to={`/medication-requests/${id}`}
              >
                Детально
              </Button>
            )
          })
        )}
      />
    </ListTable>

    {paging.total_pages > 1 && (
      <Pagination
        currentPage={paging.page_number}
        totalPage={paging.total_pages}
        location={location}
      />
    )}
  </div>
);

export default compose(
  withRouter,
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(fetchMedicationRequests({ page_size: 5, ...query }))
  }),
  connect((state, props) => ({
    ...state.pages.MedicationRequestsListPage,
    medication_requests: getMedicationRequests(
      state,
      state.pages.MedicationRequestsListPage.medication_requests
    ),
    activeFilter: getFilter(props, FILTERS)
  }))
)(MedicationRequestsListPage);
