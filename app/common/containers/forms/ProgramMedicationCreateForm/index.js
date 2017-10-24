import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { reduxForm, Field, getFormValues } from 'redux-form';
import {
  reduxFormValidate,
  collectionOf,
  ErrorMessage
} from 'react-nebo15-validate';

import { SelectUniversal } from 'components/SelectUniversal';
import FieldInput from 'components/reduxForm/FieldInput';
import { FormRow, FormColumn } from 'components/Form';
import Button from 'components/Button';

import ShowWithScope from 'containers/blocks/ShowWithScope';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'program-medication-create-form',
  validate: reduxFormValidate({
    fixed: {
      required: true
    },
    'reimbursement.reimbursement_amount': {
      required: true
    }
  })
})
@connect(state => ({
  values: getFormValues('program-medication-create-form')(state)
}))
export default class ProgramMedicationCreateForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onSubmit = () => {},
      data = [],
      submitting,
      t,
      disabled = false,
      create,
      initialValues = {}
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <FormRow>
            <FormColumn>
              <Field
                name="medication_id"
                labelText="ID торгової назви"
                component={FieldInput}
                placeholder="Введіть ідентифікатор торгової назви"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="medical_program"
                labelText="Медична программа"
                component={SelectUniversal}
                options={Object.values(data)
                  .filter(i => i.id)
                  .filter(i => i.is_active)
                  .map(i => ({
                    title: i.name,
                    name: i.id
                  }))}
              >
                <ErrorMessage when="required">
                  {t('Required field')}
                </ErrorMessage>
              </Field>
            </FormColumn>
          </FormRow>
          <div>
            <Field
              name="reimbursement.reimbursement_amount"
              labelText="Ціна"
              component={FieldInput}
              placeholder="Введіть ціну в гривнях"
            />
          </div>
          <div>
            <Field
              name="reimbursement.type"
              component={SelectUniversal}
              labelText="Тип"
              options={[
                {
                  name: 'fixed',
                  title: 'Фіксована'
                },
                {
                  name: 'dinamic',
                  title: 'Динамічна'
                }
              ]}
            >
              <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
            </Field>
          </div>
          <ShowWithScope scope="program_medication:write">
            <div>
              <Button type="submit" disabled={submitting}>
                {submitting ? t('Saving...') : t('Створити')}
              </Button>
            </div>
          </ShowWithScope>
        </div>
      </form>
    );
  }
}
