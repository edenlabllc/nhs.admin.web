import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H3 } from 'components/Title';
import { Confirm } from 'components/Popup';
import BackLink from 'containers/blocks/BackLink';
import ProgramMedicationUpdateForm from 'containers/forms/ProgramMedicationUpdateForm';

import { getProgramMedication } from 'reducers';

import { onUpdate, fetchProgramMedication } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchProgramMedication(id))
})
@connect(
  (state, { params: { id } }) => ({
    program_medication: getProgramMedication(state, id)
  }),
  { onUpdate }
)
export default class ProgramMedicationUpdatePage extends React.Component {
  render() {
    const { program_medication = {}, onUpdate, t } = this.props;

    return (
      <div id="program-medication-update-page">
        <Helmet
          title={program_medication.name}
          meta={[{ property: 'og:title', content: program_medication.name }]}
        />

        <BackLink onClick={() => this.props.router.goBack()}>
          Повернутись до деталей
        </BackLink>
        <H3>Оновлення учасника програми</H3>
        <ProgramMedicationUpdateForm
          initialValues={{
            ...program_medication,
            reimbursement: {
              reimbursement_amount:
                program_medication.reimbursement.reimbursement_amount,
              type:
                program_medication.reimbursement.type === 'fixed'
                  ? 'фіксована'
                  : 'динамічна'
            }
          }}
          onSubmit={v => onUpdate(v, program_medication.id)}
        />
      </div>
    );
  }
}
