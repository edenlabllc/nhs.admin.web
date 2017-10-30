import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import Line from 'components/Line';
import DataList from 'components/DataList';
import { Confirm } from 'components/Popup';
import Button from 'components/Button';

import BackLink from 'containers/blocks/BackLink';
import ShowMore from 'containers/blocks/ShowMore';
// import DictionaryValue from 'containers/blocks/DictionaryValue';
import ShowWithScope from 'containers/blocks/ShowWithScope';
import Icon from 'components/Icon';
import DictionaryValue from 'containers/blocks/DictionaryValue';

import { getInnmDosage } from 'reducers';

import { deactivateInnmDosage } from 'redux/innm-dosages';

import { fetchInnmsDosages } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchInnmsDosages(id))
})
@connect(
  (state, { params: { id } }) => ({
    innm_dosage: getInnmDosage(state, id)
  }),
  { deactivateInnmDosage }
)
export default class InnmDosagesDetailPage extends React.Component {
  state = {
    showDeactivateConfirm: false
  };

  deactivateInnmDosage() {
    this.props.deactivateInnmDosage(this.props.params.id).then(action => {
      this.setState({
        showDeactivateConfirm: false
      });
      return this.props.router.push(`/innm-dosages/${action.payload.data.id}`);
    });
  }

  render() {
    const { innm_dosage = {}, t } = this.props;

    return (
      <div id="innm-dosages-detail-page">
        <Helmet
          title="Деталі лікарської форми"
          meta={[{ property: 'og:title', content: 'Деталі лікарської форми' }]}
        />
        <BackLink onClick={() => this.props.router.push('/innm-dosages')}>
          Повернутися до списку лікарських форм
        </BackLink>
        <Line />
        <DataList list={[{ name: 'ID Форми', value: innm_dosage.id }]} />
        <Line />
        <DataList list={[{ name: 'Назва', value: innm_dosage.name }]} />
        <Line width={630} />
        {innm_dosage.ingredients && (
          <DataList
            theme="min"
            list={[
              {
                name: 'Складові',
                value: (
                  <div>
                    <p>{innm_dosage.ingredients[0].name}</p>
                    <br />
                    <p>{innm_dosage.ingredients[0].id}</p>
                    <br />
                    <p>
                      {`${innm_dosage.ingredients[0].dosage
                        .denumerator_value} `}
                      <DictionaryValue
                        dictionary="MEDICATION_UNIT"
                        value={
                          innm_dosage.ingredients[0].dosage.denumerator_unit
                        }
                      />
                      {`${t(' містить')} ${innm_dosage.ingredients[0].dosage
                        .numerator_value} `}
                      <DictionaryValue
                        dictionary="MEDICATION_UNIT"
                        value={innm_dosage.ingredients[0].dosage.numerator_unit}
                      />
                    </p>
                    <p>
                      {innm_dosage.ingredients[0].is_primary && (
                        <span>
                          <Icon name="check-right" /> &nbsp; Діюча речовина
                        </span>
                      )}
                    </p>
                    <br />
                    {innm_dosage.ingredients.length > 1 && (
                      <ShowMore name="Показати інші складові" show_block>
                        {innm_dosage.ingredients.map((i, key) => {
                          if (key === 0) return null;
                          return (
                            <div key={key}>
                              <p>{i.name}</p>
                              <br />
                              <p>{i.id}</p>
                              <br />
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
                                {innm_dosage.ingredients[key].is_primary &&
                                  'Діюча речовина'}
                              </p>
                              <br />
                              <Line width={300} />
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
        <DataList list={[{ name: 'Форма', value: innm_dosage.form }]} />
        <Line width={630} />
        <DataList
          list={[
            {
              name: 'Активна',
              value: innm_dosage.is_active ? (
                <Icon name="check-right" color="green" />
              ) : (
                '-'
              )
            }
          ]}
        />

        <Line width={630} />
        {innm_dosage.is_active && (
          <div className={styles.buttons}>
            <div className={styles.buttons__row}>
              <div className={styles.buttons__column}>
                <Button
                  onClick={() => this.props.router.push('/innm-dosages')}
                  theme="border"
                  color="blue"
                  icon="back"
                  block
                >
                  {t('Back to list')}
                </Button>
              </div>
              {
                <ShowWithScope scope="innm_dosage:deactivate">
                  <div className={styles.buttons__column}>
                    <Button
                      onClick={() =>
                        this.setState({ showDeactivateConfirm: true })}
                      theme="fill"
                      color="red"
                      icon="check-right"
                      block
                    >
                      Деактивувати форму
                    </Button>
                  </div>
                </ShowWithScope>
              }
            </div>
          </div>
        )}
        <Confirm
          title={`Деактивувати лікарську форму ${innm_dosage.name}?`}
          active={this.state.showDeactivateConfirm}
          theme="error"
          cancel={t('Cancel')}
          confirm={t('Yes')}
          onCancel={() => this.setState({ showDeactivateConfirm: false })}
          onConfirm={() => this.deactivateInnmDosage()}
        />
      </div>
    );
  }
}
