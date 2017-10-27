import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import filter from 'helpers/filter';

import { H1, H2 } from 'components/Title';
import { ListShowBy, ListTable } from 'components/List';
import Table from 'components/Table';
import ColoredText from 'components/ColoredText';
import Button from 'components/Button';
import Pagination from 'components/Pagination';

import ShowBy from 'containers/blocks/ShowBy';
import SearchForm from 'containers/forms/SearchForm';

import { getDeclarations } from 'reducers';

import { fetchDeclarations } from './redux';

const FILTER_PARAMS = ['employee_id', 'legal_entity_id'];

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(
      fetchDeclarations({
        page_size: 5,
        status: 'pending_verification',
        ...query
      })
    )
})
@connect(state => ({
  ...state.pages.PendingDeclarationsListPage,
  declarations: getDeclarations(
    state,
    state.pages.PendingDeclarationsListPage.declarations
  )
}))
export default class PendingDeclarationsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }

  render() {
    const { declarations = [], t, location, paging = {} } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="pending-declarations-list-page">
        <Helmet
          title={t('Pending declarations')}
          meta={[{ property: 'og:title', content: t('Pending declarations') }]}
        />

        <H1>{t('Pending declarations')}</H1>

        <div>
          <H2>{t('Search declaration')}</H2>
          <SearchForm
            ctive={activeFilter}
            placeholder={t('Find declaration')}
            items={[
              { name: 'employee_id', title: t('By employee id') },
              { name: 'legal_entity_id', title: t('By legal entity') }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  employee_id: null,
                  legal_entity_id: null,
                  page: 1,
                  ...values
                },
                this.props
              )}
          />
        </div>

        <ListShowBy>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </ListShowBy>

        <ListTable id="declarations-table">
          <Table
            columns={[
              { key: 'person', title: t('Person') },
              { key: 'legalEntity', title: t('Legal entity') },
              { key: 'dates', title: t('Dates'), width: 150 },
              { key: 'action', title: t('Action'), width: 100 }
            ]}
            data={declarations.map(item => ({
              person: item.person ? (
                <div>
                  {`${item.person.last_name} ${item.person.first_name}`}
                  <div>{item.person.second_name}</div>
                </div>
              ) : (
                '-'
              ),
              legalEntity: item.legal_entity ? (
                <div>
                  {item.legal_entity.name}
                  <br />
                  <ColoredText color="gray">
                    {t('EDRPOU')}: {item.legal_entity.edrpou}
                  </ColoredText>
                </div>
              ) : (
                '-'
              ),
              dates: `${format(item.start_date, 'DD.MM.YYYY hh:mm')} – ${format(
                item.end_date,
                'DD.MM.YYYY hh:mm'
              )}`,
              action: (
                <Button
                  id={`show-declaration-detail-button-${item.id}`}
                  theme="link"
                  to={`/pending-declarations/${item.id}`}
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
