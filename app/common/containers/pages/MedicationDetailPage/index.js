import React from 'react';
import { translate } from 'react-i18next';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import Line from 'components/Line';
import DataList from 'components/DataList';
import { Confirm } from 'components/Popup';
import Button from 'components/Button';
import Icon from 'components/Icon';
import DictionaryValue from 'containers/blocks/DictionaryValue';

import BackLink from 'containers/blocks/BackLink';
import ShowMore from 'containers/blocks/ShowMore';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import { getMedication } from 'reducers';
import { deactivateMedication } from 'redux/medications';

import { fetchMedication } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchMedication(id))
})
@connect(
  (state, { params: { id } }) => ({
    medication: getMedication(state, id)
  }),
  { deactivateMedication }
)
export default class MedicationDetailPage extends React.Component {
  state = {
    showDeactivateConfirm: false
  };

  deactivateMedication() {
    this.props.deactivateMedication(this.props.params.id).then(action => {
      this.setState({
        showDeactivateConfirm: false
      });
      return this.props.router.push(`/medications/${this.props.params.id}`);
    });
  }

  render() {
    const { medication = {}, t } = this.props;

    return (
      <div id="medication-detail-page">
        <Helmet
          title={t('Medication detail')}
          meta={[{ property: 'og:title', content: t('Medication detail') }]}
        />
        <BackLink onClick={() => this.props.router.push('/medications')}>
          {t('Back to list')}
        </BackLink>
        <Line />
        <div className={styles.row}>
          <DataList
            list={[{ name: 'ID торгівельної назви', value: medication.id }]}
          />
        </div>
        <Line width={630} />
        <DataList list={[{ name: t('Name'), value: medication.name }]} />
        <Line width={630} />
        <DataList
          list={[
            { name: 'Код АТХ', value: medication.code_atc },
            { name: 'Кількість ліків', value: medication.package_qty },
            {
              name: 'Мін. к-сть ліків',
              value: medication.package_min_qty
            }
          ]}
        />
        <Line width={630} />
        {medication.ingredients && (
          <DataList
            theme="min"
            list={[
              {
                name: 'Складові',
                value: (
                  <div>
                    <p>{medication.ingredients[0].name}</p>
                    <br />
                    <p>{medication.ingredients[0].id}</p>
                    <br />
                    <p>
                      {`${medication.ingredients[0].dosage.denumerator_value} `}
                      <DictionaryValue
                        dictionary="MEDICATION_UNIT"
                        value={
                          medication.ingredients[0].dosage.denumerator_unit
                        }
                      />
                      {`${t(' містить')} ${medication.ingredients[0].dosage
                        .numerator_value} `}
                      <DictionaryValue
                        dictionary="MEDICATION_UNIT"
                        value={medication.ingredients[0].dosage.numerator_unit}
                      />
                    </p>
                    <p>
                      {medication.ingredients[0].is_primary && 'Діюча речовина'}
                    </p>
                    <br />
                    {medication.ingredients.length > 1 && (
                      <ShowMore name="Показати інші складові" show_block>
                        {medication.ingredients.map((i, key) => {
                          if (key === 0) return null;
                          return (
                            <div key={key}>
                              <p>{medication.ingredients[0].name}</p>
                              <br />
                              <p>{medication.ingredients[0].id}</p>
                              <p>
                                {`${i.dosage.denumerator_value} `}
                                <DictionaryValue
                                  dictionary="MEDICATION_UNIT"
                                  value={i.dosage.denumerator_unit}
                                />
                                {` містить ${i.dosage.numerator_value} `}
                                <DictionaryValue
                                  dictionary="MEDICATION_UNIT"
                                  value={i.dosage.numerator_unit}
                                />
                              </p>
                              <p>
                                {medication.ingredients[key].is_primary &&
                                  'Діюча речовина'}
                              </p>
                              <br />
                            </div>
                          );
                        })}
                      </ShowMore>
                    )}
                  </div>
                )
              }
            ]}
          />
        )}
        <Line width={630} />
        <DataList
          list={[
            {
              name: 'Країна, Виробник',
              value: (
                <div>
                  <span>
                    <DictionaryValue
                      dictionary="COUNTRY"
                      value={medication.manufacturer.country}
                    />
                  </span>
                  <br />
                  <span>{medication.manufacturer.name}</span>
                </div>
              )
            },
            {
              name: 'Упаковка',
              value: (
                <div>
                  <span>
                    {`${medication.container.numerator_value} `}
                    <DictionaryValue
                      dictionary="MEDICATION_UNIT"
                      value={medication.container.numerator_unit}
                    />
                    &nbsp;на 1{' '}
                    <DictionaryValue
                      dictionary="MEDICATION_UNIT"
                      value={medication.container.denumerator_unit}
                    />
                  </span>
                </div>
              )
            }
          ]}
        />
        <Line width={630} />
        <DataList
          list={[
            {
              name: 'Активна',
              value: medication.is_active ? (
                <Icon name="check-right" color="green" />
              ) : (
                '-'
              )
            }
          ]}
        />
        <Line width={630} />
        <DataList
          list={[
            { name: 'Сертифікат', value: medication.certificate },
            {
              name: 'Дата закінчення',
              value: format(medication.certificate_expired_at, 'DD/MM/YYYY')
            }
          ]}
        />

        <Line width={630} />
        {medication.is_active && (
          <div className={styles.buttons}>
            <div className={styles.buttons__row}>
              <div className={styles.buttons__column}>
                <Button
                  onClick={() => this.props.router.push('/medications')}
                  theme="border"
                  color="blue"
                  icon="back"
                  block
                >
                  {t('Back to list')}
                </Button>
              </div>
              {
                <ShowWithScope scope="medical_program:deactivate">
                  <div className={styles.buttons__column}>
                    <Button
                      onClick={() =>
                        this.setState({ showDeactivateConfirm: true })}
                      theme="fill"
                      color="red"
                      icon="check-right"
                      block
                    >
                      Деактивувати торгову назву
                    </Button>
                  </div>
                </ShowWithScope>
              }
            </div>
          </div>
        )}
        <Confirm
          title={t('Деактивувати торгову назву {{name}}?', {
            name: medication.name
          })}
          active={this.state.showDeactivateConfirm}
          theme="error"
          cancel={t('Cancel')}
          confirm={t('Yes')}
          onCancel={() => this.setState({ showDeactivateConfirm: false })}
          onConfirm={() => this.deactivateMedication()}
        />
      </div>
    );
  }
}
