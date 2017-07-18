import React from 'react';
import format from 'date-fns/format';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';

import { H2, H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import Button from 'components/Button';
import YesNo from 'components/YesNo';

import AddressesList from 'containers/blocks/AddressesList';
import HeaderWithSub from 'containers/blocks/HeaderWithSub';
import Boxes from 'containers/blocks/Boxes';

@translate()
export default class DeclarationDetailPage extends React.Component {
  render() {
    const { declaration = { }, t } = this.props;
    const fullName = [
      declaration.person.last_name,
      declaration.person.first_name,
      declaration.person.second_name,
    ].join(' ');

    return (
      <div>
        <Helmet
          title={`${t('Declaration')} ${declaration.fullName}`}
          meta={[
            { property: 'og:title', content: `${t('Declaration')} ${declaration.fullName}` },
          ]}
        />

        <HeaderWithSub title={`${t('Declaration')} ${fullName}`}>
          { t('Dates') }: <b>{format(declaration.start_date, 'DD.MM.YYYY hh:mm')} - {format(declaration.end_date, 'DD.MM.YYYY hh:mm')}</b>

          <p>
            { t('Active') }: <b><YesNo bool={declaration.active} /></b>,
            { t('scope') }: <b>{declaration.scope}</b>
          </p>
        </HeaderWithSub>

        <H2>{ t('Division') }</H2>

        <p>
          <b>{declaration.division.name}</b>
        </p>

        <br />

        <Boxes>
          <div>
            <H3>{ t('Contacts') }:</H3>

            <DataList
              list={[
                {
                  name: 'Email',
                  value: declaration.division.email,
                }, {
                  name: t('Phones'),
                  value: <InlineList list={declaration.division.phones.map(item => item.number)} />,
                },
              ]}
            />
          </div>
          <div>
            <H3>{ t('Addresses') }:</H3>

            <AddressesList list={declaration.division.addresses} />
          </div>
          <div>
            <H3>{ t('Other') }:</H3>

            <DataList
              list={[
                {
                  name: t('ID'),
                  value: declaration.division.id,
                }, {
                  name: t('Type'),
                  value: declaration.division.type,
                }, {
                  name: t('Mountain'),
                  value: declaration.division.mountain_group,
                },
              ]}
            />
          </div>
        </Boxes>

        <Line />

        <Button theme="link" to={`/clinics/${declaration.legal_entity.id}`}>
          { t('Clinic Detail') }
        </Button>

        <Line />

        <H2>{ t('Employee') }</H2>

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
          { t('Position') }: <b>{declaration.employee.position}</b>
        </p>

        <br />

        <H3>{ t('Contacts') }:</H3>

        <DataList
          list={[
            {
              name: 'Email',
              value: declaration.employee.party.email,
            }, {
              name: t('Phones'),
              value: <InlineList
                list={declaration.employee.party.phones.map(item => item.number)}
              />,
            },
          ]}
        />

        <Line />

        <H2>{ t('Person') }</H2>

        <p>
          <b>
            {fullName}
          </b>
        </p>
        <p>
          { t('Birth') }: {format(declaration.person.birth_date, 'DD.MM.YYYY')} { t('in') } {declaration.person.birth_place}
        </p>

        <br />

        <Boxes>
          <div>
            <H3>{ t('Contacts') }:</H3>

            <DataList
              list={[
                {
                  name: 'Email',
                  value: declaration.person.email,
                }, {
                  name: t('Phones'),
                  value: <InlineList
                    list={declaration.person.phones.map(item => item.number)}
                  />,
                },
              ]}
            />
          </div>
          <div>
            <H3>{ t('Documents') }:</H3>

            <DataList
              list={declaration.person.documents.map(item => ({
                name: item.type,
                value: item.number,
              }))}
            />
          </div>
          <div>
            <H3>{ t('Authentication methods') }</H3>

            <DataList
              list={declaration.person.authentication_methods.map(item => ({
                name: item.type,
                value: item.phone_number,
              }))}
            />
          </div>
        </Boxes>

        <br />

        <H3>{ t('Other') }</H3>

        <DataList
          list={[
            {
              name: t('Process data consent'),
              value: <YesNo bool={declaration.person.process_data_consent} />,
            }, {
              name: t('Renewal consent'),
              value: <YesNo bool={declaration.person.renewal_consent} />,
            }, {
              name: t('Patient signed'),
              value: <YesNo bool={declaration.person.patient_signed} />,
            }, {
              name: t('Disclosure consent'),
              value: <YesNo bool={declaration.person.disclosure_consent} />,
            },
          ]}
        />
      </div>
    );
  }
}
