import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { reduxForm, Field, getFormValues } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';

import ShowWithScope from 'containers/blocks/ShowWithScope';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'system-configuration-form',
  validate: reduxFormValidate({
    declaration_term: {
      required: true,
    },
    declaration_request_expiration: {
      required: true,
    },
    employee_request_expiration: {
      required: true,
    },
    verification_request_expiration: {
      required: true,
    },
    adult_age: {
      required: true,
    },
    billing_date: {
      required: true,
      min: 1,
      max: 28,
    },
  }),
})
@connect(state => ({
  values: getFormValues('system-configuration-form')(state),
}))
export default class ApiForm extends React.Component {
  get isChanged() {
    const { values = {}, initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { handleSubmit, onSubmit, submitting, t } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <div>
            <Field name="declaration_term" labelText={t('Declaration term')} component={FieldInput} />
          </div>
          <div>
            <Field name="declaration_request_expiration" labelText={t('Declaration request expiration')} component={FieldInput} />
          </div>
          <div>
            <Field name="employee_request_expiration" labelText={t('Employ request expiration')} component={FieldInput} />
          </div>
          <div>
            <Field name="verification_request_expiration" labelText={t('Verification request expiration')} component={FieldInput} />
          </div>
          <div>
            <Field type="number" name="adult_age" labelText={t('Adult age')} component={FieldInput} />
          </div>
          <div>
            <Field min="1" max="28" type="number" name="billing_date" labelText={t('Billing date')} component={FieldInput} />
          </div>
          <ShowWithScope scope="global_parameters:write">
            <div>
              <Button type="submit" disabled={!this.isChanged || submitting}>
                { submitting ? t('Saving...') : t('Save config') }
              </Button>
            </div>
          </ShowWithScope>
        </div>
      </form>
    );
  }
}
