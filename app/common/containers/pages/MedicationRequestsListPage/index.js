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
  { name: 'request_number', title: 'За номером рецепту' },
  // { name: 'created_from', title: 'За датою створення' },
  // { name: 'created_to', title: 'За датою створення' },
  { name: 'division_id', title: 'За ID підрозділу' },
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
      title="Рецепти"
      meta={[{ property: 'og:title', content: 'Рецепти' }]}
    />

    <ListHeader>
      <H1>Рецепти</H1>
    </ListHeader>

    <div>
      <H2>Пошук рецепту</H2>

      <SearchForm
        active={activeFilter}
        placeholder="Знайти рецепт"
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
          { key: 'request_number', title: 'Номер рецепту' },
          { key: 'division_id', title: 'ID підрозділу' },
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
            id,
            request_number,
            division_id: division.id,
            medication_id,
            person_id: person.id,
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
