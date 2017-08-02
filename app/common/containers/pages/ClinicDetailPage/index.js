import React from 'react';
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
import { Confirm } from 'components/Popup';
import Button from 'components/Button';

import BlocksList from 'containers/blocks/BlocksList';
import BackLink from 'containers/blocks/BackLink';
import ColoredText from 'components/ColoredText';
import ShowMore from 'containers/blocks/ShowMore';
import DictionaryValue from 'containers/blocks/DictionaryValue';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import { getClinic } from 'reducers';

import { verifyClinic, deactivateClinic } from 'redux/clinics';

import { fetchClinic } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => Promise.all([
    dispatch(fetchClinic(id)),
  ]),
})
@connect((state, { params: { id } }) => ({
  clinic: getClinic(state, id),
}), { verifyClinic, deactivateClinic })
export default class ClinicDetailPage extends React.Component {
  state = {
    showVerifyConfirm: false,
    showDeactivateConfirm: false,
  };

  verifyClinic() {
    this.props.verifyClinic(this.props.params.id).then(() => {
      this.props.history.goBack();
    });
  }

  deactivateClinic() {
    this.props.deactivateClinic(this.props.params.id).then(() => {
      this.props.history.goBack();
    });
  }

  render() {
    const { clinic = { }, t } = this.props;
    const { accreditation, licenses } = clinic.medical_service_provider;

    return (
      <div id="clinic-detail-page">
        <Helmet
          title={clinic.name}
          meta={[
            { property: 'og:title', content: clinic.name },
          ]}
        />

        <BackLink onClick={() => this.props.history.goBack()}>{ t('Back to clinics list') }</BackLink>

        <Line />

        <div className={styles.row}>
          <div>
            <DataList
              list={[
                { name: t('Clinic ID'), value: clinic.id },
              ]}
            />
          </div>
          <ShowWithScope scope="employee:read">
            <div className={styles.right}>
              <BackLink iconPosition="right" to={`/employees?legal_entity_id=${clinic.id}`}>
                { t('Go to clinic employees list') }
              </BackLink>
            </div>
          </ShowWithScope>
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
                    {clinic.kveds.map(name => <p>{<DictionaryValue dictionary="KVEDS" value={name} />}</p>)}
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
            { name: t('Property type'), value: <DictionaryValue dictionary="OWNER_PROPERTY_TYPE" value={clinic.owner_property_type} /> },
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
              value: <ShowMore name={t('Show documents')}>
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
                      value: <DictionaryValue dictionary="ACCREDITATION_CATEGORY" value={accreditation.category} />,
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
                      <Upper>{item.license_number}</Upper>
                      <p>
                        <ColoredText color="gray">
                          {item.what_licensed}
                        </ColoredText>
                      </p>
                      <div>
                        { t('Issued') }: {item.issued_date}, { t('expiry') }: {item.expiry_date}
                      </div>
                      <ColoredText color="gray">
                        {item.issued_by}
                      </ColoredText>
                    </li>
                  ))}
                </BlocksList>
              </ShowMore>,
            },
          ]}
        />

        <Line width={630} />

        {!clinic.nhs_verified && <div className={styles.buttons}>
          <div className={styles.buttons__row}>
            <div className={styles.buttons__column}>
              <Button onClick={() => this.props.history.goBack()} theme="border" color="blue" icon="back" block>
                { t('Back to list') }
              </Button>
            </div>
            <ShowWithScope scope="legal_entity:nhs_verify">
              <div className={styles.buttons__column}>
                <Button onClick={() => this.setState({ showVerifyConfirm: true })} theme="fill" color="green" icon="check-right" block>
                  { t('Approve clinic') }
                </Button>
              </div>
            </ShowWithScope>
          </div>
          <ShowWithScope scope="legal_entity:deactivate">
            <div className={styles.buttons__row}>
              <div className={styles.buttons__column}>
                <Button onClick={() => this.setState({ showDeactivateConfirm: true })} theme="border" color="red" icon="close" block>
                  { t('Cancel verification') }
                </Button>
              </div>
            </div>
          </ShowWithScope>
        </div>}
        <Confirm
          title={t('Verify clinic {{name}}?', { name: clinic.name })}
          active={this.state.showVerifyConfirm}
          theme="success"
          cancel={t('Cancel')}
          confirm={t('Yes')}
          onCancel={() => this.setState({ showVerifyConfirm: false })}
          onConfirm={() => this.verifyClinic()}
        />

        <Confirm
          title={t('Deactivate clinic {{name}}?', { name: clinic.name })}
          active={this.state.showDeactivateConfirm}
          theme="error"
          cancel={t('Cancel')}
          confirm={t('Yes')}
          onCancel={() => this.setState({ showDeactivateConfirm: false })}
          onConfirm={() => this.deactivateClinic()}
        />
      </div>
    );
  }
}
