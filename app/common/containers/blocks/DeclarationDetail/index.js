import React from 'react';
import format from 'date-fns/format';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import Line from 'components/Line';
import { H3 } from 'components/Title';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';

import BackLink from 'containers/blocks/BackLink';
import AddressesList from 'containers/blocks/AddressesList';
import DictionaryValue from 'containers/blocks/DictionaryValue';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
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
          title={`${t('Declaration')} ${fullName}`}
          meta={[
            { property: 'og:title', content: `${t('Declaration')} ${fullName}` },
          ]}
        />

        <BackLink onClick={() => this.props.router.goBack()}>{ t('Back to declarations list') }</BackLink>

        <Line />

        <DataList
          list={[
            { name: t('Declaration ID'), value: declaration.id },
          ]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            { name: t('Start date'), value: format(declaration.start_date, 'DD/MM/YYYY') },
            { name: t('End date'), value: format(declaration.end_date, 'DD/MM/YYYY') },
            { name: t('Scope'), value: declaration.scope },
          ]}
        />

        <Line />

        <DataList
          list={[
            { name: t('Division ID'), value: declaration.division.id },
          ]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            { name: t('Division type'), value: <DictionaryValue dictionary="DIVISION_TYPE" value={declaration.division.type.toUpperCase()} /> },
            { name: t('Division name'), value: declaration.division.name },
            { name: t('Phones'), value: <InlineList list={(declaration.division.phones || []).map(item => item.number)} /> },
            { name: t('Email'), value: declaration.division.email },
            {
              name: t('Addresses'),
              value: <AddressesList list={declaration.division.addresses} />,
            },
          ]}
        />

        <Line />

        <div className={styles.row}>
          <div>
            <DataList
              list={[
                { name: t('Employee ID'), value: declaration.employee.id },
              ]}
            />
          </div>
          <div className={styles.right}>
            <BackLink iconPosition="right" to={`/employees/${declaration.employee.id}`}>
              { t('Go to employee') }
            </BackLink>
          </div>
        </div>

        <Line />

        <div className={styles.strong}>
          <DataList
            theme="min"
            list={[
              {
                name: t('Full name'),
                value: `${declaration.employee.party.last_name} ${declaration.employee.party.first_name} ${declaration.employee.party.second_name}`,
              },
              { name: t('Tax ID'), value: declaration.employee.party.tax_id },
              { name: t('Position'), value: <DictionaryValue dictionary="POSITION" value={declaration.employee.position} /> },
            ]}
          />
        </div>

        <Line />

        <div className={styles.row}>
          <div>
            <DataList
              list={[
                { name: t('Clinic ID'), value: declaration.legal_entity.id },
              ]}
            />
          </div>
          <div className={styles.right}>
            <BackLink iconPosition="right" to={`/clinics/${declaration.legal_entity.id}`}>
              { t('Go to clinic') }
            </BackLink>
          </div>
        </div>

        <Line />

        <DataList
          list={[
            { name: t('Full name'), value: declaration.legal_entity.name },
            { name: t('edrpou'), value: declaration.legal_entity.edrpou },
            {
              name: t('Registration address'),
              value: (
                <div className={styles.address}>
                  {
                    declaration.legal_entity.addresses && (<div>
                      <p>
                        {declaration.legal_entity.addresses[0].zip}, {declaration.legal_entity.addresses[0].area} { t('area') }, { t('city') } {declaration.legal_entity.addresses[0].settlement},
                      </p>
                      <p>
                        {declaration.legal_entity.addresses[0].street},&nbsp;
                        {declaration.legal_entity.addresses[0].building}
                      </p>
                    </div>
                    )
                  }
                  <small>{t('Residense address is equal to registration address')}</small>
                </div>
              ),
            },
          ]}
        />

        <Line />

        {
          declaration.person.id && (
            <DataList
              list={[
                { name: t('Person ID'), value: declaration.person.id },
              ]}
            />
          )
        }

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            {
              name: t('Person name'),
              value: fullName,
            },
            { name: t('Tax ID'), value: declaration.person.tax_id },
            { name: t('Phones'), value: <InlineList list={(declaration.person.phones || []).map(item => item.number)} /> },
          ]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            {
              name: t('Birth date'),
              value: format(declaration.person.birth_date, 'DD/MM/YYYY'),
            },
            { name: t('Birth place'), value: `${declaration.person.birth_country}, ${declaration.person.birth_settlement}` },
          ]}
        />

        {declaration.person.documents && <div>
          <Line />
          <H3>{ t('Documents') }:</H3>

          <DataList
            theme="min"
            list={declaration.person.documents.map(item => ({
              name: <DictionaryValue dictionary="DOCUMENT_TYPE" value={item.type} />,
              value: item.number,
            }))}
          />
        </div>}
        {declaration.person.authentication_methods && <div>
          <Line />
          <H3>{ t('Authentication methods') }</H3>

          <DataList
            list={declaration.person.authentication_methods.map(item => ({
              name: item.type,
              value: item.phone_number,
            }))}
          />
        </div>}
      </div>
    );
  }
}
