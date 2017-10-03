import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { reduxFormValidate } from 'react-nebo15-validate';
import { reduxForm, Field, FieldArray, getFormValues } from 'redux-form';

import { SelectUniversal } from 'components/SelectUniversal';
import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';
import { FormRow, FormColumn } from 'components/Form';
// import DictionaryValue from 'containers/blocks/DictionaryValue';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import RenderIngredient from './renderIngredient';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'inns-dosages-create-form',
  validate: reduxFormValidate({

  }),
})
@connect(state => ({
  values: getFormValues('inns-dosages-create-form')(state),
}))
export default class InnmDosagesCreateForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onSubmit = () => {},
      submitting,
      t,
      disabled = false,
      data,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <div className={styles.title}>
            &#8544;. Загальна інформація
          </div>
          <div>
            <Field
              name="innm_name"
              labelText="Назва"
              component={FieldInput}
              disabled={disabled}
              label_bold
              placeholder="Назва хімічної сполуки"
            />
          </div>
          <div className={styles.title}>
            &#8545;. Складові
          </div>
          <FormRow>
            <FieldArray name="ingredients" component={RenderIngredient} data={data} />
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="form"
                component={SelectUniversal}
                labelText="Форма"
                placeholder="Оберіть форму"
                options={Object.keys(data.medication_form.values)
                  .map(key => ({
                    name: key,
                    title: data.medication_form.values[key],
                  }))
                }
              />
            </FormColumn>
          </FormRow>
          {
            !disabled && (
              <ShowWithScope scope="innm_dosage:write">
                <div>
                  <Button type="submit" disabled={submitting}>
                    { submitting ? t('Saving...') : 'Додати форму хімічної сполуки' }
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
