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

import AddressesList from 'containers/blocks/AddressesList';
import HeaderWithSub from 'containers/blocks/HeaderWithSub';
import Boxes from 'containers/blocks/Boxes';

import { getDeclaration } from 'reducers';

import { fetchDeclaration } from './redux';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchDeclaration(id)),
})
@connect((state, { params: { id } }) => ({
  declaration: getDeclaration(state, id),
}))
export default class DeclarationDetailPage extends React.Component {
  render() {
    const { declaration = { } } = this.props;

    return (
      <div id="declaration-detail-page">
        <HeaderWithSub title={`Declaration #${declaration.id}`}>
          Dates: <b>{format(declaration.start_date, 'DD.MM.YYYY hh:mm')} - {format(declaration.end_date, 'DD.MM.YYYY hh:mm')}</b>

          <p>
            Active: <b>{YesNo(declaration.active)}</b>,
            scope: <b>{declaration.scope}</b>
          </p>
        </HeaderWithSub>

        <H2>Division</H2>

        <p>
          <b>{declaration.division.name}</b>
        </p>

        <br />

        <Boxes>
          <div>
            <H3>Contacts:</H3>

            <DataList
              list={[
                {
                  name: 'Email',
                  value: declaration.division.email,
                }, {
                  name: 'Phones',
                  value: <InlineList list={declaration.division.phones.map(item => item.number)} />,
                },
              ]}
            />
          </div>
          <div>
            <H3>Addresses:</H3>

            <AddressesList list={declaration.division.addresses} />
          </div>
          <div>
            <H3>Other:</H3>

            <DataList
              list={[
                {
                  name: 'ID',
                  value: declaration.division.id,
                }, {
                  name: 'Type',
                  value: declaration.division.type,
                }, {
                  name: 'Mountain',
                  value: declaration.division.mountain_group,
                },
              ]}
            />
          </div>
        </Boxes>

        <Line />

        <Button theme="link" to={`/clinics/${declaration.legal_entity.id}`}>
          Clinic Detail
        </Button>

        <Line />

        <H2>Employee</H2>

        <p>
          <b>
            {[
              declaration.employee.party.last_name,
              declaration.employee.party.first_name,
              declaration.employee.party.second_name,
            ].join(' ')}
          </b>
        </p>

        <p>
          Position: <b>{declaration.employee.position}</b>
        </p>

        <br />

        <H3>Contacts:</H3>

        <DataList
          list={[
            {
              name: 'Email',
              value: declaration.employee.party.email,
            }, {
              name: 'Phones',
              value: <InlineList
                list={declaration.employee.party.phones.map(item => item.number)}
              />,
            },
          ]}
        />

        <Line />

        <H2>Person</H2>

        <p>
          <b>
            {[
              declaration.person.last_name,
              declaration.person.first_name,
              declaration.person.second_name,
            ].join(' ')}
          </b>
        </p>
        <p>
          Birth: {format(declaration.person.birth_date, 'DD.MM.YYYY')} in {declaration.person.birth_place}
        </p>

        <br />

        <Boxes>
          <div>
            <H3>Contacts:</H3>

            <DataList
              list={[
                {
                  name: 'Email',
                  value: declaration.person.email,
                }, {
                  name: 'Phones',
                  value: <InlineList
                    list={declaration.person.phones.map(item => item.number)}
                  />,
                },
              ]}
            />
          </div>
          <div>
            <H3>Documents:</H3>

            <DataList
              list={declaration.person.documents.map(item => ({
                name: item.type,
                value: item.number,
              }))}
            />
          </div>
          <div>
            <H3>Authentication methods</H3>

            <DataList
              list={declaration.person.authentication_methods.map(item => ({
                name: item.type,
                value: item.phone_number,
              }))}
            />
          </div>
        </Boxes>

        <br />

        <H3>Other</H3>

        <DataList
          list={[
            {
              name: 'Process data consent',
              value: YesNo(declaration.person.process_data_consent),
            }, {
              name: 'Renewal consent',
              value: YesNo(declaration.person.renewal_consent),
            }, {
              name: 'Patient signed',
              value: YesNo(declaration.person.patient_signed),
            }, {
              name: 'Disclosure consent',
              value: YesNo(declaration.person.disclosure_consent),
            },
          ]}
        />
      </div>
    );
  }
}
