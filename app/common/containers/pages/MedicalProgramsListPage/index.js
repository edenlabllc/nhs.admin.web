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
import ColoredText from 'components/ColoredText';

import SearchForm from 'containers/forms/SearchForm';

import { getMedicalPrograms } from 'reducers';

import { fetchMedicalPrograms } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = [
  'id',
  'medical_program_id',
  'medical_program_name',
  'innm_id',
  'innm_name',
  'medication_id',
  'medication_name'
];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchMedicalPrograms({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.MedicalProgramsListPage,
  medical_programs: getMedicalPrograms(
    state,
    state.pages.MedicalProgramsListPage.medical_programs
  )
}))
export default class MedicalProgramsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { medical_programs = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="medication-list-page">
        <Helmet
          title="Перелік медичний програм"
          meta={[{ property: 'og:title', content: 'Перелік медичний програм' }]}
        />
        <div className={styles.header}>
          <H1>Перелік медичний програм</H1>
          <div className={styles.header__btn}>
            <Button
              to="/medical-programs/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Додати програму
            </Button>
          </div>
        </div>

        <div className={styles.search}>
          <H2>Пошук програм</H2>

          <SearchForm
            active={activeFilter}
            placeholder="Знайти програму"
            items={[
              { name: 'id', title: t('By id') },
              { name: 'medical_program_id', title: t('By medical_program_id') },
              {
                name: 'medical_program_name',
                title: t('By medical_program_name')
              },
              { name: 'innm_id', title: t('By innm_id') },
              { name: 'innm_name', title: t('By innm_name') },
              { name: 'medication_id', title: t('By medication_id') },
              { name: 'medication_name', title: t('By medication_name') }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  id: null,
                  medical_program_id: null,
                  medical_program_name: null,
                  innm_id: null,
                  innm_name: null,
                  medication_id: null,
                  medication_name: null,
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

        <div id="medication-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: 'ID\n медичної программи' },
              { key: 'name', title: 'Назва медичної программи' },
              { key: 'status', title: 'Статус программи' },
              { key: 'action', title: t('Action'), width: 100 }
            ]}
            data={medical_programs.map(item => ({
              id: <div>{item.id}</div>,
              name: <div>{item.name}</div>,
              status: (
                <div>
                  {item.is_active ? (
                    <ColoredText color="green">активна</ColoredText>
                  ) : (
                    <ColoredText color="red">неактивна</ColoredText>
                  )}
                </div>
              ),
              action: (
                <Button
                  id={`show-medical-programs-detail-button-${item.id}`}
                  theme="link"
                  to={`/medical-programs/${item.id}`}
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
