import React from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';
import Upper from 'components/Upper';

import Button from 'components/Button';
import BlocksList from 'containers/blocks/BlocksList';
import BackLink from 'containers/blocks/BackLink';
import ColoredText from 'components/ColoredText';

import { getClinic } from 'reducers';

import { fetchClinic } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchClinic(id)),
})
@connect((state, { params: { id } }) => ({
  clinic: getClinic(state, id),
}))
export default class ClinicDetailPage extends React.Component {
  state = {
    showDocuments: false,
  };

  render() {
    const { clinic = { }, t } = this.props;
    const { accreditation, licenses } = clinic.medical_service_provider;
    const { showDocuments } = this.state;

    return (
      <div id="clinic-detail-page">
        <Helmet
          title={clinic.name}
          meta={[
            { property: 'og:title', content: clinic.name },
          ]}
        />

        <BackLink to="/clinics">{ t('Back to clinics list') }</BackLink>

        <Line />

        <div className={styles.row}>
          <div>
            <DataList
              list={[
                { name: t('Clinic ID'), value: clinic.id },
              ]}
            />
          </div>
          <div className={styles.right}>
            <BackLink iconPosition="right" to={`/employees?legal_enyity_id=${clinic.id}`}>
              { t('Go to clinic employees list') }
            </BackLink>
          </div>
        </div>

        <Line />

        <div className={styles.bold}>
          <DataList
            list={[
              { name: t('Full name'), value: clinic.name },
              { name: t('edrpou'), value: clinic.edrpou },
              {
                name: t('Registration address'),
                value: (
                  <div className={styles.address}>
                    <p>
                      {clinic.addresses[0].zip}, {clinic.addresses[0].area} { t('area') }, { t('city') } {clinic.addresses[0].settlement},
                    </p>
                    <p>
                      {clinic.addresses[0].street}, {clinic.addresses[0].building}
                    </p>
                    <small>{t('Residense address is equal to registration address')}</small>
                  </div>
                ),
              }, {
                name: t('KVEDs'),
                value: (
                  <div>
                    {clinic.kveds.map(name => <p>{name}</p>)}
                  </div>
                ),
              },
            ]}
          />
        </div>

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            { name: t('Short name'), value: clinic.short_name },
            { name: t('Public name'), value: clinic.public_name },
          ]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            { name: t('Property type'), value: clinic.owner_property_type },
            { name: t('Type'), value: clinic.type },
          ]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            { name: t('Phones'), value: <InlineList list={clinic.phones.map(item => item.number)} /> },
            { name: t('Email'), value: clinic.email },
          ]}
        />

        <Line width={630} />

        <DataList
          theme="min"
          list={[
            {
              name: t('License and accreditation'),
              value: <div>
                <button
                  onClick={() => this.setState({ showDocuments: !showDocuments })}
                  className={classnames(styles.button, showDocuments && styles.button_active)}
                >
                  { t('Show documents') } <span>▾</span>
                </button>

                {showDocuments && <div className={styles.documents}>
                  <H3>{ t('Accreditation') }</H3>

                  <DataList
                    theme="min"
                    list={[
                      {
                        name: t('Order No.'),
                        value: (
                          <Upper>{accreditation.order_no}</Upper>
                        ),
                      }, {
                        name: t('Category'),
                        value: accreditation.category,
                      }, {
                        name: t('Expiry date'),
                        value: accreditation.expiry_date,
                      }, {
                        name: t('Issued date'),
                        value: accreditation.issued_date,
                      }, {
                        name: t('Order date'),
                        value: accreditation.order_date,
                      },
                    ]}
                  />

                  <Line />

                  <H3>{ t('Licenses') }</H3>

                  <BlocksList>
                    {licenses.map((item, i) => (
                      <li key={i}>
                        <Upper>{item.license_number}</Upper>, KVED {item.kved}
                        <p>
                          <ColoredText color="gray">
                            {item.what_licensed}
                          </ColoredText>
                        </p>
                        <div>
                          { t('Issued') }: {item.issued_date}, expiry: {item.expiry_date}
                        </div>
                        <ColoredText color="gray">
                          {item.issued_by}
                        </ColoredText>
                      </li>
                    ))}
                  </BlocksList>
                </div>}
              </div>,
            },
          ]}
        />

        {!clinic.nhs_verified && <div className={styles.buttons}>
          <div className={styles.buttons__row}>
            <div className={styles.buttons__column}>
              <Button onClick={() => this.props.history.goBack()} theme="border" color="blue" icon="back" block>
                { t('Back to list') }
              </Button>
            </div>
            <div className={styles.buttons__column}>
              <Button theme="fill" color="green" icon="check-right" block>
                { t('Approve clinic') }
              </Button>
            </div>
          </div>
          <div className={styles.buttons__row}>
            <div className={styles.buttons__column}>
              <Button theme="border" color="red" icon="close" block>
                { t('Cancel verification') }
              </Button>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}
