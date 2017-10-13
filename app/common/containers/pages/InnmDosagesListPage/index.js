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

import { getInnmDosages } from 'reducers';

import { fetchInnmDosages } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = ['id', 'form', 'name'];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchInnmDosages({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.InnmDosagesListPage,
  innm_dosages: getInnmDosages(
    state,
    state.pages.InnmDosagesListPage.innm_dosages
  )
}))
export default class InnmDosagesListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { innm_dosages = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="innm-dosages-list-page">
        <Helmet
          title="Лікарські форми"
          meta={[{ property: 'og:title', content: t('Лікарські форми') }]}
        />
        <div className={styles.header}>
          <H1>Лікарські форми</H1>
          <div className={styles.header__btn}>
            <Button
              to="/innm-dosages/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Створити лікарську форму
            </Button>
          </div>
        </div>

        <div className={styles.search}>
          <H2>Знайти лікарську форму</H2>

          <SearchForm
            active={activeFilter}
            placeholder="Знайти лікарську форму"
            items={[
              { name: 'id', title: t('За ідентифікатором') },
              { name: 'form', title: t('За формою') },
              { name: 'name', title: t('За назвою') }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  id: null,
                  form: null,
                  name: null,
                  ...values
                },
                this.props
              )}
          />
        </div>

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </div>

        <div id="innm-dosages-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('id') },
              { key: 'name', title: t('Innms name') },
              { key: 'form', title: t('Form') },
              { key: 'action', title: t('Action'), width: 100 }
            ]}
            data={innm_dosages.map(item => ({
              id: <div>{item.id}</div>,
              name: <div>{item.name}</div>,
              form: <div>{item.form}</div>,
              action: (
                <Button
                  id={`show-innm-dosages-detail-button-${item.id}`}
                  theme="link"
                  to={`/innm-dosages/${item.id}`}
                >
                  {t('Details')}
                </Button>
              )
            }))}
          />
        </div>

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
