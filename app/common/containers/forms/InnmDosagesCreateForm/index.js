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
  state ={
    innms_search: '',
  };
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
          <FormRow>
            <Field
              name="innm_name"
              labelText="Назва"
              component={FieldInput}
              disabled={disabled}
              label_bold
              placeholder="Назва хімічної сполуки"
            />
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
          <div className={styles.title}>
            &#8545;. Складові
          </div>
          <FormRow>
            <FormColumn>
              <Field
                name="ingredients.denumerator_value"
                component={SelectUniversal}
                labelText="Назва речовини"
                emptyText="Не знайдено"
                placeholder="Почніть вводити назву"
                label_bold
                searchable
                onChangeSearch={val => this.setState({ innms_search: val.toLowerCase() })}
                options={data.innms
                  .filter(i => i.is_active)
                  .filter(i =>
                    new RegExp(this.state.innms_search)
                      .test(i.name.toLowerCase()) === true)
                    .map(i => ({
                      name: i.id,
                      title: i.name,
                    }))
                }
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn size="1/4">
              <Field
                type="number"
                name="ingredients.numerator_value"
                labelText="Кількість"
                component={FieldInput}
                label_bold
                placeholder="0-1000"
              />
            </FormColumn>
            <FormColumn size="1/3">
              <Field
                name="ingredients.numerator_unit"
                component={SelectUniversal}
                labelText="Одиниці"
                options={[{
                  name: 'MG',
                  title: 'мг',
                }, {
                  name: 'MKG',
                  title: 'мкг',
                }]}
              />
            </FormColumn>
            <FormColumn size="1/3">
              <Field
                name="ingredients.denumerator_unit"
                component={SelectUniversal}
                labelText="На одну"
                options={Object.keys(data.medication_unit.values).map(
                  i => ({
                    title: data.medication_unit.values[i],
                    name: i,
                  })
                )}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FieldArray name="ingredients" component={RenderIngredient} data={data} />
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
