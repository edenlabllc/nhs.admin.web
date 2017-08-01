import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import ColoredText from 'components/ColoredText';
import Button from 'components/Button';

import BlocksList from 'containers/blocks/BlocksList';
import BackLink from 'containers/blocks/BackLink';
import ShowMore from 'containers/blocks/ShowMore';
import DictionaryValue from 'containers/blocks/DictionaryValue';

import { fetchEmployee } from './redux';

import styles from './style.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id)),
})
@connect(state => state.pages.EmployeeDetailPage)
export default class EmployeeDetailPage extends React.Component {
  render() {
    const { employee = { }, t } = this.props;

    const fullName = `${employee.party.last_name} ${employee.party.first_name} ${employee.party.second_name}`;

    return (
      <div id="employee-detail-page">
        <Helmet
          title={`${t('Employee')} - ${fullName}`}
          meta={[
            { property: 'og:title', content: `${t('Employee')} - ${fullName}` },
          ]}
        />

        <BackLink to="/employees">{ t('Back to employees list') }</BackLink>

        <Line />

        <div className={styles.main}>
          <DataList
            list={[
              { name: t('User ID'), value: employee.id },
            ]}
          />

          <Line />

          <div className={styles.strong}>
            <DataList
              theme="small"
              list={[
                { name: t('Full name'), value: fullName },
                { name: t('Tax ID'), value: employee.party.tax_id },
              ]}
            />
          </div>

          <Line />

          <DataList
            theme="min"
            list={[
              { name: t('Birth date'), value: format(employee.party.birth_date, 'DD/MM/YYYY') },
              { name: t('Sex'), value: <DictionaryValue dictionary="GENDER" value={employee.party.gender} /> },
            ]}
          />

          <Line />

          <DataList
            theme="min"
            list={[
              {
                name: t('Phones'),
                value: <InlineList list={employee.party.phones.map(item => item.number)} />,
              },
              {
                name: t('Documents'),
                value: <ul className={styles.docs}>
                  {(employee.party.documents || []).map(item => (
                    <li key={item.number}>
                      <DictionaryValue dictionary="DOCUMENT_TYPE" value={item.type} />
                      &nbsp; № {item.number}
                    </li>
                  ))}
                </ul>,
              },
            ]}
          />

          <Line />

          <DataList
            theme="min"
            list={[
              { name: t('Employee ID'), value: employee.party.id },
              { name: t('Status'), value: <DictionaryValue dictionary="EMPLOYEE_STATUS" value={employee.status} /> },
              { name: t('Start work date'), value: format(employee.start_date, 'DD/MM/YYYY') },
              { name: t('End work date'), value: format(employee.end_date, 'DD/MM/YYYY') },
              { name: t('Position'), value: <DictionaryValue dictionary="POSITION" value={employee.position} /> },
              {
                name: t('Education and qualifications'),
                value: <ShowMore name={t('Show documents')}>
                  <H3>{ t('Educations') }</H3>

                  <BlocksList>
                    {(employee.doctor.educations || []).map((item, index) => (
                      <li key={index}>
                        <div>
                          {item.issued_date}, {item.institution_name}
                        </div>
                        <div>
                          <ColoredText color="gray">{item.country}, {item.city}</ColoredText>
                        </div>
                        {item.speciality}
                        <div>
                          <ColoredText color="gray">
                            <DictionaryValue dictionary="EDUCATION_DEGREE" value={item.degree} />, { t('diploma') }: {item.diploma_number}
                          </ColoredText>
                        </div>
                      </li>
                    ))}
                  </BlocksList>

                  <Line />

                  <H3>{ t('Qualifications') }</H3>

                  <BlocksList>
                    {employee.doctor.qualifications.map((item, index) => (
                      <li key={index}>
                        <div>
                          {item.issued_date}, {item.institution_name}
                        </div>
                        {item.speciality}
                        <div>
                          <ColoredText color="gray">
                            <DictionaryValue dictionary="QUALIFICATION_TYPE" value={item.type} />, { t('certificate') }: {item.certificate_number}
                          </ColoredText>
                        </div>
                      </li>
                    ))}
                  </BlocksList>
                </ShowMore>,
              },
            ]}
          />

          <div className={styles.buttons}>
            <Button onClick={() => this.props.history.goBack()} theme="border" color="blue" icon="back" block>
              { t('Back to list') }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
