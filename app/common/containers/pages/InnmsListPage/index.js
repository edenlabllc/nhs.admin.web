import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import filter from 'helpers/filter';

import { H1, H2 } from 'components/Title';
import Pagination from 'components/Pagination';
import Button from 'components/Button';

import Table from 'components/Table';
import ShowBy from 'containers/blocks/ShowBy';

import SearchForm from 'containers/forms/SearchForm';

import { getInnms } from 'reducers';

import { fetchInnms } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = ['id', 'sctid', 'name', 'name_original'];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchInnms({ page_size: 5, ...query })),
})
@connect(state => ({
  ...state.pages.InnmsListPage,
  innms: getInnms(state, state.pages.InnmsListPage.innms),
}))
export default class InnmsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(Object.keys(this.props.location.query)
      .filter(key => ~FILTER_PARAMS.indexOf(key))[0]);
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { innms = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="innms-list-page">
        <Helmet
          title={t('Innms')}
          meta={[
            { property: 'og:title', content: t('Innms') },
          ]}
        />

        <H1>{ t('Innms') }</H1>

        <div className={styles.search}>
          <H2>{ t('Search innms') }</H2>
          <SearchForm
            active={activeFilter}
            placeholder={t('Find innms')}
            items={[
              { name: 'id', title: t('By id') },
              { name: 'sctid', title: t('By sctid') },
              { name: 'name', title: t('By name') },
              { name: 'name_original', title: t('By name_original') },
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter],
            }}
            onSubmit={values => filter({
              id: null,
              sctid: null,
              name: null,
              name_original: null,
              ...values,
            }, this.props)}
          />
        </div>

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </div>

        <div id="innms-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('id') },
              { key: 'sctid', title: t('sctid') },
              { key: 'name', title: t('Name') },
              { key: 'name_original', title: t('Name original') },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={innms.map(item => ({
              id: <div>{item.id}</div>,
              sctid: <div>{item.sctid}</div>,
              name: <div>{item.name}</div>,
              name_original: <div>{item.name_original}</div>,
              action: (<Button id={`show-innm-detail-button-${item.id}`} theme="link" to={`/innms/${item.id}`}>{ t('Details') }</Button>),
            }))}
          />
        </div>

        {
          paging.total_pages > 1 && (
            <Pagination
              currentPage={paging.page_number}
              totalPage={paging.total_pages}
              location={location}
              cb={() => {}}
            />
          )
        }
      </div>
    );
  }
}
