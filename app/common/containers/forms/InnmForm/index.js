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
    sctid: {
      required: true,
    },
    name: {
      required: true,
    },
    name_original: {
      required: true,
    },
  }),
})
@connect(state => ({
  values: getFormValues('innm-form')(state),
}))
export default class InnmForm extends React.Component {
  get isChanged() {
    const { values = {}, initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { handleSubmit, onSubmit = () => {}, submitting, t, disabled = false } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <div>
            <Field
              name="sctid"
              labelText={t('sctid innm')}
              component={FieldInput}
              disabled={disabled}
            />
          </div>
          <div>
            <Field
              name="name"
              labelText={t('Innm name')}
              component={FieldInput}
              disabled={disabled}
            />
          </div>
          <div>
            <Field
              name="name_original"
              labelText={t('Innm original name')}
              component={FieldInput}
              disabled={disabled}
            />
          </div>
          {
            !disabled && (
              <ShowWithScope scope="innm:write">
                <div>
                  <Button type="submit" disabled={!this.isChanged || submitting}>
                    { submitting ? t('Saving...') : t('Save innm') }
                  </Button>
                </div>
              </ShowWithScope>
            )
          }
        </div>
      </form>
    );
  }
}
