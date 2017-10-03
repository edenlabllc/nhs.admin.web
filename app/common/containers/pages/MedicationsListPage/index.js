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
import Icon from 'components/Icon';
import DictionaryValue from 'containers/blocks/DictionaryValue';

import SearchForm from 'containers/forms/SearchForm';

import { getMedications } from 'reducers';

import { fetchMedications } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = ['id', 'innm_id', 'name', 'form'];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchMedications({ page_size: 5, ...query })),
})
@connect(state => ({
  ...state.pages.InnmsListPage,
  medications: getMedications(state, state.pages.MedicationsListPage.medications),
}))
export default class MedicationsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(Object.keys(this.props.location.query)
      .filter(key => ~FILTER_PARAMS.indexOf(key))[0]);
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { medications = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="medication-list-page">
        <Helmet
          title={t('Medications')}
          meta={[
            { property: 'og:title', content: t('Medications') },
          ]}
        />
        <div className={styles.header}>
          <H1>{ t('Medications') }</H1>
          <div className={styles.header__btn}>
            <Button to="/medications/create" theme="border" size="small" color="orange" icon="add">

              {t('Create medication')}
            </Button>
          </div>
        </div>

        <div className={styles.search}>
          <H2>{ t('Search medication') }</H2>

          <SearchForm
            active={activeFilter}
            placeholder={t('Find medication')}
            items={[
              { name: 'id', title: t('By id') },
              { name: 'innm_id', title: t('By innm_id') },
              { name: 'name', title: t('By medication name') },
              { name: 'form', title: t('By form') },
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter],
            }}
            onSubmit={values => filter({
              id: null,
              name: null,
              innm_name: null,
              form: null,
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

        <div id="medication-table" className={styles.table}>
          <Table
            columns={[
              { key: 'innm_id', title: t('Innm ID') },
              { key: 'id', title: t('Medication ID') },
              { key: 'name', title: t('Medication name') },
              { key: 'form', title: t('Form') },
              { key: 'active', title: t('Active') },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={medications.map(item => ({
              innm_id: <div>{item.ingredients[0].id}</div>,
              id: <div>{item.id}</div>,
              name: <div>{item.name}</div>,
              form: <div>
                <DictionaryValue dictionary="MEDICATION_FORM" value={item.form} />
                <br />
                {item.manufacturer.name}
              </div>,
              active: <div>{ item.is_active && <Icon name="check-right" /> }</div>,
              action: (<Button id={`show-medication-detail-button-${item.id}`} theme="link" to={`/medications/${item.id}`}>{ t('Details') }</Button>),
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
