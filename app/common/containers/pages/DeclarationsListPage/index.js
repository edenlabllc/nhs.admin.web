import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'withStyles';

import filter from 'helpers/filter';

import { H1, H2 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import Pagination from 'components/CursorPagination';

import ShowBy from 'containers/blocks/ShowBy';
import SearchForm from 'containers/forms/SearchForm';

import { getDeclarations } from 'reducers';

import { fetchDeclarations } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = ['employee_id', 'legal_entity_id'];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(fetchDeclarations({ limit: 5, ...query })),
})
@connect(state => ({
  ...state.pages.DeclarationsListPage,
  declarations: getDeclarations(state, state.pages.DeclarationsListPage.declarations),
}))
export default class DeclarationsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(Object.keys(this.props.location.query)
      .filter(key => ~FILTER_PARAMS.indexOf(key))[0]);
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }

  render() {
    const { declarations = [], t, location, paging = { } } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="declarations-list-page">
        <Helmet
          title={t('Declarations')}
          meta={[
            { property: 'og:title', content: t('Declarations') },
          ]}
        />

        <H1>{ t('Declarations') }</H1>

        <div className={styles.search}>
          <H2>{ t('Search declaration') }</H2>
          <SearchForm
            active={activeFilter}
            placeholder={t('Find declaration')}
            items={[
              { name: 'employee_id', title: t('By employee id') },
              { name: 'legal_entity_id', title: t('By legal entity') },
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter],
            }}
            onSubmit={values => filter({
              employee_id: null,
              legal_entity_id: null,
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

        <div id="declarations-table" className={styles.table}>
          <Table
            columns={[
              { key: 'person', title: t('Person') },
              { key: 'legalEntity', title: t('Legal entity') },
              { key: 'dates', title: t('Dates'), width: 150 },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={declarations.map(item => ({
              person: (
                <div>
                  {
                    item.person && (<div>
                      {`${item.person.last_name} ${item.person.first_name}`}
                      <div>{item.person.second_name}</div>
                    </div>
                    )
                  }
                </div>
              ),
              legalEntity: (
                <div> {
                  item.legal_entity ? (<div>
                    {item.legal_entity.name}
                    <div className={styles.gray}>{t('EDRPOU')}: {item.legal_entity.edrpou}</div>
                  </div>
                  ) : null
                }
                </div>
              ),
              dates: `${format(item.start_date, 'DD.MM.YYYY hh:mm')} ${format(item.end_date, 'DD.MM.YYYY hh:mm')}`,
              action: (<Button id={`show-declaration-detail-button-${item.id}`} theme="link" to={`/declarations/${item.id}`}>{ t('Details') }</Button>),
            }))}
          />
        </div>
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
