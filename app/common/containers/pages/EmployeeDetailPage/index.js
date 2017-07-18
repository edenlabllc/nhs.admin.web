import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import { H2, H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import Button from 'components/Button';
import Upper from 'components/Upper';
import ColoredText from 'components/ColoredText';
import YseNo from 'components/YesNo';

import HeaderWithSub from 'containers/blocks/HeaderWithSub';
import Boxes from 'containers/blocks/Boxes';
import BlocksList from 'containers/blocks/BlocksList';

import { getEmployee } from 'reducers';

import { fetchEmployee } from './redux';

@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id)),
})
@connect((state, { params: { id } }) => ({
  employee: getEmployee(state, id),
}))
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

        <HeaderWithSub title={fullName}>
          { t('Dates') }: <b>{format(employee.start_date, 'DD.MM.YYYY hh:mm')} - {format(employee.end_date, 'DD.MM.YYYY hh:mm')}</b>
          <p>
            { t('Position') }: <b>{employee.position}</b>,
            { t('status') }: <b>{employee.status}</b>
          </p>
          <p>
            { t('Birth date') }: <b>{format(employee.party.birth_date, 'DD.MM.YYYY')}</b>
          </p>
        </HeaderWithSub>

        <Boxes>
          <div>
            <H3>{ t('Contacts') }:</H3>

            <DataList
              list={[
                {
                  name: t('Email'),
                  value: employee.party.email,
                }, {
                  name: t('Phones'),
                  value: <InlineList list={employee.party.phones.map(item => item.number)} />,
                },
              ]}
            />
          </div>
          <div>
            <H3>{ t('Division') }:</H3>

            <DataList
              list={[
                {
                  name: 'ID',
                  value: <Upper>{employee.division.id}</Upper>,
                }, {
                  name: t('Type'),
                  value: employee.division.type,
                }, {
                  name: t('Mountain'),
                  value: employee.division.mountain_group,
                },
              ]}
            />
          </div>
          <div>
            <H3>{ t('Documents') }:</H3>

            <DataList
              list={employee.party.documents.map(item => ({
                name: item.type,
                value: item.number,
              }))}
            />
          </div>

          <div>
            <H3>{t('Clinic')}:</H3>

            <Button theme="link" to={`/clinic/${employee.legal_entity.id}`}>
              {employee.legal_entity.name}
            </Button>
          </div>
        </Boxes>

        <Line />

        <H2>{ t('Educations') }</H2>

        <BlocksList>
          {employee.doctor.educations.map((item, index) => (
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
                  {item.degree}, { t('diploma') }: {item.diploma_number}
                </ColoredText>
              </div>
            </li>
          ))}
        </BlocksList>

        <Line />

        <H2>{ t('Qualifications') }</H2>

        <BlocksList>
          {employee.doctor.qualifications.map((item, index) => (
            <li key={index}>
              <div>
                {item.issued_date}, {item.institution_name}
              </div>
              {item.speciality}
              <div>
                <ColoredText color="gray">
                  {item.type}, { t('certificate') }: {item.certificate_number}
                </ColoredText>
              </div>
            </li>
          ))}
        </BlocksList>

        <Line />

        <H2>{ t('Specialities') }</H2>

        <BlocksList>
          {employee.doctor.specialities.map((item, index) => (
            <li key={index}>
              <div>
                {item.speciality}
              </div>
              <div>
                <ColoredText color="gray">
                  {item.attestation_name}
                </ColoredText>
              </div>
              {item.qualification_type}, {item.level}
              <div>
                <ColoredText color="gray">
                  {item.attestation_date} - {item.valid_to_date},
                  { t('certificate') }: {item.certificate_number}
                  <br />

                  { t('Speciality officio') }: <YseNo bool={item.speciality_officio} />
                </ColoredText>
              </div>
            </li>
          ))}
        </BlocksList>

        <Line />

        <H2>{ t('Science degree') }</H2>

        <DataList
          list={[
            {
              name: t('Degree'),
              value: employee.doctor.science_degree.degree,
            }, {
              name: t('Diploma'),
              value: employee.doctor.science_degree.diploma_number,
            }, {
              name: t('Location'),
              value: `${employee.doctor.science_degree.country}, ${employee.doctor.science_degree.city}, ${employee.doctor.science_degree.institution_name}`,
            }, {
              name: t('Date'),
              value: employee.doctor.science_degree.issued_date,
            }, {
              name: t('Speciality'),
              value: employee.doctor.science_degree.speciality,
            },
          ]}
        />
      </div>
    );
  }
}
