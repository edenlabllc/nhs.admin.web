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
import Icon from 'components/Icon';
import DictionaryValue from 'containers/blocks/DictionaryValue';

import Table from 'components/Table';
import ShowBy from 'containers/blocks/ShowBy';

import SearchForm from 'containers/forms/SearchForm';

import { getInnmDosages } from 'reducers';

import { fetchInnmDosages } from './redux';

import uuidValidate from '../../../helpers/validators/uuid-validate';

const FILTER_PARAMS = ['id', 'name'];

@withRouter
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
        <ListHeader
          button={
            <Button
              to="/innm-dosages/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Створити лікарську форму
            </Button>
          }
        >
          <H1>Лікарські форми</H1>
        </ListHeader>

        <div>
          <H2>Знайти лікарську форму</H2>
          <SearchForm
            active={activeFilter}
            placeholder="Знайти лікарську форму"
            items={[
              {
                name: 'id',
                title: t('За ідентифікатором'),
                validate: uuidValidate
              },
              { name: 'name', title: t('За назвою') }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  id: null,
                  name: null,
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

        <ListTable id="innm-dosages-table">
          <Table
            columns={[
              { key: 'id', title: t('ID') },
              { key: 'name', title: t('Назва') },
              { key: 'form', title: t('Форма') },
              { key: 'active', title: t('Активна') },
              { key: 'action', title: t('Деталі /Деактивація'), width: 150 }
            ]}
            data={innm_dosages.map(item => ({
              id: <div>{item.id}</div>,
              name: <div>{item.name}</div>,
              form: (
                <div>
                  <DictionaryValue
                    dictionary="MEDICATION_FORM"
                    value={item.form}
                  />
                </div>
              ),
              active: (
                <div>{item.is_active && <Icon name="check-right" />}</div>
              ),
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
