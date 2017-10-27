import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { reduxForm, Field, getFormValues } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import ShowWithScope from 'containers/blocks/ShowWithScope';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'innm-form',
  validate: reduxFormValidate({
    sctid: {
      length: 8
    },
    name: {
      required: true
    },
    name_original: {
      required: true
    }
  })
})
@connect(state => ({
  values: getFormValues('innm-form')(state)
}))
export default class InnmForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onSubmit = () => {},
      submitting,
      t,
      disabled = false,
      create,
      initialValues = {}
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          {!create && (
            <div>
              <Field
                name="id"
                labelText="ID"
                component={FieldInput}
                disabled={disabled}
              />
            </div>
          )}
          <div>
            <Field
              name="name"
              labelText="Назва МНН"
              component={FieldInput}
              disabled={disabled}
              placeholder="Аміодарон"
            />
          </div>
          <div>
            <Field
              name="name_original"
              labelText="Оригінальна назва МНН"
              component={FieldInput}
              disabled={disabled}
              placeholder="Amiodarone"
            />
          </div>
          {!create && (
            <div>
              <Field
                name="sctid"
                labelText={t('sctid МНН')}
                component={FieldInput}
                placeholder="-"
              />
            </div>
          )}
          {create && (
            <div>
              <Field
                name="sctid"
                labelText={t('sctid МНН')}
                component={FieldInput}
                disabled={disabled}
                placeholder="98730785"
              />
            </div>
          )}
          {!disabled && (
            <ShowWithScope scope="innm:write">
              <div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? t('Saving...') : t('Створити МНН')}
                </Button>
              </div>
            </ShowWithScope>
          )}
        </div>
      </form>
    );
  }
}
