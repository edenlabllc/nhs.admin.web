import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import ShowWithScope from 'containers/blocks/ShowWithScope';
import BackLink from 'containers/blocks/BackLink';
import Checkbox from 'components/Checkbox';

import DataList from 'components/DataList';
import { Confirm } from 'components/Popup';
import { H1, H2 } from 'components/Title';
import Button from 'components/Button';
import Line from 'components/Line';

import { getMedicalProgram } from 'reducers';

import { fetchMedicalProgram } from './redux';
import { deactivateMedicalProgram } from 'redux/medical-programs';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchMedicalProgram(id))
})
@connect(
  state => ({
    medical_program: getMedicalProgram(
      state,
      state.pages.MedicalProgramDetailPage.medical_program
    )
  }),
  { deactivateMedicalProgram }
)
export default class MedicalProgramDetailPage extends React.Component {
  state = {
    showDeactivateConfirm: false
  };

  deactivateMedicalProgram() {
    this.props.deactivateMedicalProgram(this.props.params.id).then(() => {
      this.setState({
        showDeactivateConfirm: false
      });
      return this.props.router.push(
        `/medical-programs/${this.props.params.id}`
      );
    });
  }

  render() {
    const { medical_program = {}, t } = this.props;
    return (
      <div id="medical-program-detail-page">
        <Helmet
          title={t('Medication detail')}
          meta={[{ property: 'og:title', content: t('Medication detail') }]}
        />
        <BackLink onClick={() => this.props.router.goBack()}>
          {t('Back to list')}
        </BackLink>
        <br />
        <br />
        <DataList list={[{ name: 'ID Програми', value: medical_program.id }]} />
        <Line width={630} />
        <DataList list={[{ name: 'Назва', value: medical_program.name }]} />
        <Line width={630} />
        <br />
        <DataList
          list={[
            {
              name: 'Активна',
              value: <Checkbox checked={medical_program.is_active} />
            }
          ]}
        />
        {medical_program.is_active && (
          <div className={styles.buttons}>
            <div className={styles.buttons__row}>
              <div className={styles.buttons__column}>
                <Button
                  onClick={() => this.props.router.push('/medical-programs')}
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
                      Деактивувати програму
                    </Button>
                  </div>
                </ShowWithScope>
              }
            </div>
          </div>
        )}

        <Confirm
          title={t('Деактивувати медичну програму {{name}}?', {
            name: medical_program.name
          })}
          active={this.state.showDeactivateConfirm}
          theme="error"
          cancel={t('Cancel')}
          confirm={t('Yes')}
          onCancel={() => this.setState({ showDeactivateConfirm: false })}
          onConfirm={() => this.deactivateMedicalProgram()}
        />
      </div>
    );
  }
}
