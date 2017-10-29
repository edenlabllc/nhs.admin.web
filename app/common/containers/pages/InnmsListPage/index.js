import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import filter from 'helpers/filter';

import { ListHeader, ListShowBy, ListTable } from 'components/List';
import { H1, H2 } from 'components/Title';
import Pagination from 'components/Pagination';
import Button from 'components/Button';

import Table from 'components/Table';
import ShowBy from 'containers/blocks/ShowBy';
import Icon from 'components/Icon';

import SearchForm from 'containers/forms/SearchForm';

import { getInnms } from 'reducers';

import { fetchInnms } from './redux';

const FILTER_PARAMS = ['id', 'sctid', 'name', 'name_original'];

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchInnms({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.InnmsListPage,
  innms: getInnms(state, state.pages.InnmsListPage.innms)
}))
export default class InnmsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { innms = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="innms-list-page">
        <Helmet
          title={t('МНН')}
          meta={[{ property: 'og:title', content: t('МНН') }]}
        />

        <ListHeader
          button={
            <Button
              to="/innms/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Cтворити МНН
            </Button>
          }
        >
          <H1>{t('МНН')}</H1>
        </ListHeader>

        <div>
          <H2>Пошук МНН</H2>
          <SearchForm
            active={activeFilter}
            placeholder="Знайти МНН"
            items={[
              { name: 'id', title: 'За ідентифікатором' },
              { name: 'sctid', title: t('За sctid') },
              { name: 'name', title: t('За назвою') },
              { name: 'name_original', title: t('За оригінальною назвою') }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  id: null,
                  sctid: null,
                  name: null,
                  name_original: null,
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

        <ListTable id="innms-table">
          <Table
            columns={[
              { key: 'id', title: t('id') },
              { key: 'name', title: t('Назва МНН') },
              { key: 'name_original', title: t('Оригінальна назва МНН') },
              { key: 'sctid', title: t('SCTID') },
              { key: 'active', title: t('Активна') },
              { key: 'action', title: t('Action'), width: 100 }
            ]}
            data={innms.map(item => ({
              id: <div>{item.id}</div>,
              name: <div>{item.name}</div>,
              name_original: <div>{item.name_original}</div>,
              sctid: <div>{item.sctid ? item.sctid : '-'}</div>,
              active: (
                <div>{item.is_active && <Icon name="check-right" />}</div>
              ),
              action: (
                <Button
                  id={`show-innm-detail-button-${item.id}`}
                  theme="link"
                  to={`/innms/${item.id}`}
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
