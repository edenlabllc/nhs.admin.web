import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import Button from 'components/Button';

import BackLink from 'containers/blocks/BackLink';
import DictionaryValue from 'containers/blocks/DictionaryValue';
import DoctorDetails from 'containers/blocks/DoctorDetails';

import { fetchEmployee } from './redux';

import styles from './style.scss';

@withStyles(styles)
@translate()
@withRouter
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id))
})
@connect(state => state.pages.EmployeeDetailPage)
export default class EmployeeDetailPage extends React.Component {
  render() {
    const {
      t,
      employee: {
        id,
        status,
        start_date,
        end_date,
        position,
        doctor,
        party: {
          id: partyId,
          last_name,
          first_name,
          second_name,
          tax_id,
          birth_date,
          gender,
          phones,
          documents = []
        } = {}
      } = {}
    } = this.props;

    const fullName = `${last_name} ${first_name} ${second_name}`;

    return (
      <div id="employee-detail-page">
        <Helmet
          title={`${t('Employee')} - ${fullName}`}
          meta={[
            { property: 'og:title', content: `${t('Employee')} - ${fullName}` }
          ]}
        />

        <BackLink to="/employees">{t('Back to employees list')}</BackLink>

        <Line />

        <div className={styles.main}>
          <DataList list={[{ name: t('User ID'), value: id }]} />

          <Line />

          <div className={styles.strong}>
            <DataList
              theme="small"
              list={[
                { name: t('Full name'), value: fullName },
                { name: t('Tax ID'), value: tax_id }
              ]}
            />
          </div>

          <Line />

          <DataList
            theme="min"
            list={[
              {
                name: t('Birth date'),
                value: format(birth_date, 'DD/MM/YYYY')
              },
              {
                name: t('Sex'),
                value: <DictionaryValue dictionary="GENDER" value={gender} />
              }
            ]}
          />

          <Line />

          <DataList
            theme="min"
            list={[
              {
                name: t('Phones'),
                value: <InlineList list={phones.map(item => item.number)} />
              },
              {
                name: t('Documents'),
                value: (
                  <ul className={styles.docs}>
                    {documents.map(({ number, type }) => (
                      <li key={number}>
                        <DictionaryValue
                          dictionary="DOCUMENT_TYPE"
                          value={type}
                        />
                        &nbsp; № {number}
                      </li>
                    ))}
                  </ul>
                )
              }
            ]}
          />

          <Line />

          <DataList
            theme="min"
            list={[
              { name: t('Employee ID'), value: partyId },
              {
                name: t('Status'),
                value: (
                  <DictionaryValue
                    dictionary="EMPLOYEE_STATUS"
                    value={status}
                  />
                )
              },
              {
                name: t('Start work date'),
                value: format(start_date, 'DD/MM/YYYY')
              },
              {
                name: t('End work date'),
                value: format(end_date, 'DD/MM/YYYY')
              },
              {
                name: t('Position'),
                value: (
                  <DictionaryValue dictionary="POSITION" value={position} />
                )
              },
              doctor && {
                name: t('Education and qualifications'),
                value: <DoctorDetails doctor={doctor} />
              }
            ]}
          />

          <div className={styles.buttons}>
            <Button
              onClick={() => this.props.router.goBack()}
              theme="border"
              color="blue"
              icon="back"
              block
            >
              {t('Back to list')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
