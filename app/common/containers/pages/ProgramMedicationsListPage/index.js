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
import DictionaryValue from 'containers/blocks/DictionaryValue';

import Table from 'components/Table';
import ShowBy from 'containers/blocks/ShowBy';
import ColoredText from 'components/ColoredText';

import SearchForm from 'containers/forms/SearchForm';

import { getProgramMedications } from 'reducers';

import { fetchProgramMedications } from './redux';
import styles from './styles.scss';

const FILTER_PARAMS = [
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
    dispatch(fetchProgramMedications({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.ProgramMedicationsListPage,
  program_medications: getProgramMedications(
    state,
    state.pages.ProgramMedicationsListPage.program_medications
  )
}))
export default class ProgramMedicationsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { program_medications = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="medication-list-page">
        <Helmet
          title="Учасники медичних программ"
          meta={[
            { property: 'og:title', content: 'Учасники медичних программ' }
          ]}
        />
        <div className={styles.header}>
          <H1>Перелік учасників медичних програм</H1>
          <div className={styles.header__btn}>
            <Button
              to="/program-medications/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Додати учасника
            </Button>
          </div>
        </div>

        <div className={styles.search}>
          <H2>Пошук учасників програм</H2>
          <SearchForm
            active={activeFilter}
            placeholder="Знайти учасника програми"
            items={[
              {
                name: 'medical_program_id',
                title: t('за ID медичної програми')
              },
              {
                name: 'medical_program_name',
                title: t('за назва медичної програми')
              },
              {
                name: 'innm_id',
                title: t('за ID Лікарської форми')
              },
              { name: 'innm_name', title: t('за Назвою Лікарської форми') },
              { name: 'medication_id', title: t('за ID Торгової Назви') },
              { name: 'medication_name', title: t('за Торговою Назвою') }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  medical_program_id: null,
                  medical_program_name: null,
                  innm_id: null,
                  innm_name: null,
                  medication_id: null,
                  medication_name: null,
                  page: 1,
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
              { key: 'medical_program_id', title: 'ID\n медичної программи' },
              {
                key: 'medical_program_name',
                title: 'Назва медичної программи'
              },
              { key: 'medication_name', title: 'Торгова Назва' },
              { key: 'medication_form', title: 'Форма' },
              { key: 'manufacturer', title: 'Виробник' },
              { key: 'reimbursement_amount', title: 'Сума Відшкодування' },
              { key: 'status', title: 'Активний' },
              { key: 'action', title: t('Action'), width: 100 }
            ]}
            data={program_medications.map(item => ({
              medical_program_id: <div>{item.medical_program.id}</div>,
              medical_program_name: <div>{item.medical_program.name}</div>,
              medication_name: <div>{item.medication.name}</div>,
              medication_form: (
                <div>
                  <DictionaryValue
                    dictionary="MEDICATION_FORM"
                    value={item.medication.form}
                  />
                </div>
              ),
              manufacturer: (
                <div>
                  {`${item.medication.manufacturer.name} ${item.medication
                    .manufacturer.country}`}
                </div>
              ),
              reimbursement_amount: (
                <div>{item.reimbursement.reimbursement_amount}</div>
              ),
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
                  to={`/program-medications/${item.id}`}
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
