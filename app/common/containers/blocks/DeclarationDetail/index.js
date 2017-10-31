import React, { Component } from 'react';
import format from 'date-fns/format';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { resetAuthMethod } from 'redux/persons';

import Line from 'components/Line';
import { H3 } from 'components/Title';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import { DetailRow, DetailRowRight } from 'components/Detail';
import Button from 'components/Button';
import { Confirm } from 'components/Popup';

import BackLink from 'containers/blocks/BackLink';
import AddressesList from 'containers/blocks/AddressesList';
import DictionaryValue from 'containers/blocks/DictionaryValue';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@connect(null, { resetAuthMethod })
export default class DeclarationDetailPage extends Component {
  state = {};

  render() {
    const { declaration = {}, router, t } = this.props;
    const { showResetAuthConfirm } = this.state;

    const fullName = [
      declaration.person.last_name,
      declaration.person.first_name,
      declaration.person.second_name
    ].join(' ');

    return (
      <div>
        <Helmet
          title={`${t('Declaration')} ${fullName}`}
          meta={[
            { property: 'og:title', content: `${t('Declaration')} ${fullName}` }
          ]}
        />

        <BackLink onClick={() => router.goBack()}>
          {t('Back to declarations list')}
        </BackLink>

        <Line />

        <DataList
          list={[{ name: t('Declaration ID'), value: declaration.id }]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            {
              name: t('Start date'),
              value: format(declaration.start_date, 'DD/MM/YYYY')
            },
            {
              name: t('End date'),
              value: format(declaration.end_date, 'DD/MM/YYYY')
            },
            {
              name: t('Scope'),
              value: (
                <DictionaryValue
                  dictionary="SPECIALITY_TYPE"
                  value={(declaration.scope || '').toUpperCase()}
                />
              )
            }
          ]}
        />

        <Line />

        <DataList
          list={[{ name: t('Division ID'), value: declaration.division.id }]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            {
              name: t('Division type'),
              value: (
                <DictionaryValue
                  dictionary="DIVISION_TYPE"
                  value={(declaration.division.type || '').toUpperCase()}
                />
              )
            },
            { name: t('Division name'), value: declaration.division.name },
            {
              name: t('Phones'),
              value: (
                <InlineList
                  list={(declaration.division.phones || []).map(
                    item => item.number
                  )}
                />
              )
            },
            { name: t('Email'), value: declaration.division.email },
            {
              name: t('Addresses'),
              value: <AddressesList list={declaration.division.addresses} />
            }
          ]}
        />

        <Line />

        <div className={styles.row}>
          <div>
            <DataList
              list={[
                { name: t('Employee ID'), value: declaration.employee.id }
              ]}
            />
          </div>
          <ShowWithScope scope="employee:read">
            <div className={styles.right}>
              <BackLink
                iconPosition="right"
                to={`/employees/${declaration.employee.id}`}
              >
                {t('Go to employee')}
              </BackLink>
            </div>
          </ShowWithScope>
        </div>

        {declaration.employee.party && <Line />}

        <div className={styles.strong}>
          {declaration.employee.party && (
            <DataList
              theme="min"
              list={[
                {
                  name: t('Full name'),
                  value: `${declaration.employee.party.last_name} ${declaration
                    .employee.party.first_name} ${declaration.employee.party
                    .second_name}`
                },
                { name: t('Tax ID'), value: declaration.employee.party.tax_id },
                {
                  name: t('Position'),
                  value: (
                    <DictionaryValue
                      dictionary="POSITION"
                      value={declaration.employee.position}
                    />
                  )
                }
              ]}
            />
          )}
        </div>

        <Line />

        <div className={styles.row}>
          <div>
            <DataList
              list={[
                { name: t('Clinic ID'), value: declaration.legal_entity.id }
              ]}
            />
          </div>
          <ShowWithScope scope="legal_entity:read">
            <div className={styles.right}>
              <BackLink
                iconPosition="right"
                to={`/clinics/${declaration.legal_entity.id}`}
              >
                {t('Go to clinic')}
              </BackLink>
            </div>
          </ShowWithScope>
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
                  {declaration.legal_entity.addresses && (
                    <div>
                      <p>
                        {declaration.legal_entity.addresses[0].zip},{' '}
                        {declaration.legal_entity.addresses[0].area} {t('area')},{' '}
                        {t('city')}{' '}
                        {declaration.legal_entity.addresses[0].settlement},
                      </p>
                      <p>
                        {declaration.legal_entity.addresses[0].street},&nbsp;
                        {declaration.legal_entity.addresses[0].building}
                      </p>
                    </div>
                  )}
                  <small>
                    {t('Residense address is equal to registration address')}
                  </small>
                </div>
              )
            }
          ]}
        />

        <Line />

        <DetailRow>
          <div>
            {declaration.person.id && (
              <DataList
                list={[{ name: t('Person ID'), value: declaration.person.id }]}
              />
            )}

            <DataList
              theme="min"
              list={[
                {
                  name: t('Person name'),
                  value: fullName
                },
                { name: t('Tax ID'), value: declaration.person.tax_id },
                {
                  name: t('Phones'),
                  value: (
                    <InlineList
                      list={(declaration.person.phones || []).map(
                        item => item.number
                      )}
                    />
                  )
                }
              ]}
            />
          </div>

          <DetailRowRight>
            <Button
              theme="border"
              color="red"
              onClick={() => this.setState({ showResetAuthConfirm: true })}
            >
              Скинути метод авторизації
            </Button>
          </DetailRowRight>
        </DetailRow>

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            {
              name: t('Birth date'),
              value: format(declaration.person.birth_date, 'DD/MM/YYYY')
            },
            {
              name: t('Birth place'),
              value: [
                declaration.person.birth_country,
                declaration.person.birth_settlement
              ]
                .filter(i => i)
                .join(' ,')
            }
          ]}
        />

        {declaration.person.documents && (
          <div>
            <Line />
            <H3>{t('Documents')}:</H3>

            <DataList
              theme="min"
              list={declaration.person.documents.map(item => ({
                name: (
                  <DictionaryValue
                    dictionary="DOCUMENT_TYPE"
                    value={item.type}
                  />
                ),
                value: item.number
              }))}
            />
          </div>
        )}
        <Confirm
          title="Скинути метод авторизації?"
          active={showResetAuthConfirm}
          theme="error"
          cancel={t('Cancel')}
          confirm={t('Yes')}
          onCancel={() => this.setState({ showResetAuthConfirm: false })}
          onConfirm={this.resetAuthMethod}
        />
      </div>
    );
  }

  resetAuthMethod = () => {
    const { declaration, resetAuthMethod } = this.props;

    resetAuthMethod(declaration.person.id).then(() => {
      this.setState({ showResetAuthConfirm: false });
    });
  };
}
