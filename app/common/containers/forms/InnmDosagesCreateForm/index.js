import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { reduxFormValidate, collectionOf, ErrorMessage } from 'react-nebo15-validate';
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
    name: {
      required: true,
    },
    form: {
      required: true,
    },
    'one.ingredients.id': {
      required: true,
    },
    'one.ingredients.denumerator_value': {
      required: true,
    },
    'one.ingredients.numerator_value': {
      required: true,
    },
    'one.ingredients.numerator_unit': {
      required: true,
    },
    'one.ingredients.denumerator_unit': {
      required: true,
    },
    ingredients: collectionOf({
      id: {
        required: true,
      },
      denumerator_value: {
        required: true,
      },
      numerator_value: {
        required: true,
      },
      numerator_unit: {
        required: true,
      },
      denumerator_unit: {
        required: true,
      },
    }),
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
              name="name"
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
              >
                <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
              </Field>
            </FormColumn>
          </FormRow>
          <div className={styles.title}>
            &#8545;. Складові
          </div>
          <FormRow>
            <FormColumn>
              <Field
                name="one.ingredients.id"
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
              >
                <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
              </Field>
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn size="1/4">
              <Field
                type="number"
                name="one.ingredients.numerator_value"
                labelText="Кількість"
                component={FieldInput}
                label_bold
                placeholder="0-1000"
              />
            </FormColumn>
            <FormColumn size="1/3">
              <Field
                name="one.ingredients.numerator_unit"
                component={SelectUniversal}
                labelText="Одиниці"
                options={[{
                  name: 'MG',
                  title: 'мг',
                }, {
                  name: 'MKG',
                  title: 'мкг',
                }]}
              >
                <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
              </Field>
            </FormColumn>
            <FormColumn size="1/3">
              <Field
                name="one.ingredients.denumerator_unit"
                component={SelectUniversal}
                labelText="На одну"
                options={Object.keys(data.medication_unit.values).map(
                  i => ({
                    title: data.medication_unit.values[i],
                    name: i,
                  })
                )}
              >
                <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
              </Field>
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
                    { submitting ? t('Додаємо...') : 'Додати форму хімічної сполуки' }
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
