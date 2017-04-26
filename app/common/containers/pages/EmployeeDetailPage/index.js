import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import { YesNo } from 'helpers/text';

import { H2, H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import Button from 'components/Button';
import Upper from 'components/Upper';
import ColoredText from 'components/ColoredText';

import HeaderWithSub from 'containers/blocks/HeaderWithSub';
import Boxes from 'containers/blocks/Boxes';
import BlocksList from 'containers/blocks/BlocksList';

import { getEmployee } from 'reducers';

import { fetchEmployee } from './redux';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id)),
})
@connect((state, { params: { id } }) => ({
  employee: getEmployee(state, id),
}))
export default class EmployeeDetailPage extends React.Component {
  render() {
    const { employee = { } } = this.props;

    return (
      <div id="employee-detail-page">
        <HeaderWithSub title={`${employee.party.last_name} ${employee.party.first_name} ${employee.party.second_name}`}>
          Dates: <b>{format(employee.start_date, 'DD.MM.YYYY hh:mm')} - {format(employee.end_date, 'DD.MM.YYYY hh:mm')}</b>
          <p>
            Position: <b>{employee.position}</b>,
            status: <b>{employee.status}</b>
          </p>
          <p>
            Birth date: <b>{format(employee.party.birth_date, 'DD.MM.YYYY')}</b>
          </p>
        </HeaderWithSub>

        <Boxes>
          <div>
            <H3>Contacts:</H3>

            <DataList
              list={[
                {
                  name: 'Email',
                  value: employee.party.email,
                }, {
                  name: 'Phones',
                  value: <InlineList list={employee.party.phones.map(item => item.number)} />,
                },
              ]}
            />
          </div>
          <div>
            <H3>Division:</H3>

            <DataList
              list={[
                {
                  name: 'ID',
                  value: <Upper>{employee.division.id}</Upper>,
                }, {
                  name: 'Type',
                  value: employee.division.type,
                }, {
                  name: 'Mountain',
                  value: employee.division.mountain_group,
                },
              ]}
            />
          </div>
          <div>
            <H3>Documents:</H3>

            <DataList
              list={employee.party.documents.map(item => ({
                name: item.type,
                value: item.number,
              }))}
            />
          </div>

          <div>
            <H3>Clinic:</H3>

            <Button theme="link" to={`/clinic/${employee.legal_entity.id}`}>
              {employee.legal_entity.name}
            </Button>
          </div>
        </Boxes>

        <Line />

        <H2>Educations</H2>

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
                  {item.degree}, diploma: {item.diploma_number}
                </ColoredText>
              </div>
            </li>
          ))}
        </BlocksList>

        <Line />

        <H2>Qualifications</H2>

        <BlocksList>
          {employee.doctor.qualifications.map((item, index) => (
            <li key={index}>
              <div>
                {item.issued_date}, {item.institution_name}
              </div>
              {item.speciality}
              <div>
                <ColoredText color="gray">
                  {item.type}, certificate: {item.certificate_number}
                </ColoredText>
              </div>
            </li>
          ))}
        </BlocksList>

        <Line />

        <H2>Specialities</H2>

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
                  certificate: {item.certificate_number}
                  <br />

                  Speciality officio: {YesNo(item.speciality_officio)}
                </ColoredText>
              </div>
            </li>
          ))}
        </BlocksList>

        <Line />

        <H2>Science degree</H2>

        <DataList
          list={[
            {
              name: 'Degree',
              value: employee.doctor.science_degree.degree,
            }, {
              name: 'Diploma',
              value: employee.doctor.science_degree.diploma_number,
            }, {
              name: 'Location',
              value: `${employee.doctor.science_degree.country}, ${employee.doctor.science_degree.city}, ${employee.doctor.science_degree.institution_name}`,
            }, {
              name: 'Date',
              value: employee.doctor.science_degree.issued_date,
            }, {
              name: 'Speciality',
              value: employee.doctor.science_degree.speciality,
            },
          ]}
        />
      </div>
    );
  }
}
