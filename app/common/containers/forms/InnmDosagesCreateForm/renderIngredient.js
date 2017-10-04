import React from 'react';
import { Field } from 'redux-form';
import { translate } from 'react-i18next';
import { ErrorMessage } from 'react-nebo15-validate';

import { SelectUniversal } from 'components/SelectUniversal';
import FieldInput from 'components/reduxForm/FieldInput';
import { FormRow, FormColumn } from 'components/Form';
import Button from 'components/Button';
import Line from 'components/Line';

@translate()
export default class RenderIngredient extends React.Component {
  state = {
    innms_search: '',
  };

  render() {
    const { fields, meta: { error, submitFailed }, data, t } = this.props;
    return (
      <ul>
        { fields.map((ingredient, index) =>
          <li key={index}>
            <br />
            <FormRow>
              <FormColumn>
                <Field
                  name={`${ingredient}.id`}
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
                  name={`${ingredient}.numerator_value`}
                  labelText="Кількість"
                  component={FieldInput}
                  label_bold
                  placeholder="0-1000"
                />
              </FormColumn>
              <FormColumn size="1/3">
                <Field
                  name={`${ingredient}.numerator_unit`}
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
                  name={`${ingredient}.denumerator_unit`}
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
              <FormColumn>
                <Button theme="border" size="small" onClick={() => fields.remove(index)}>
                  Відміна
                </Button>
              </FormColumn>
            </FormRow>
            <Line />
          </li>
        )}
        <li>
          <br />
          <Button theme="border" size="small" color="orange" icon="add" onClick={() => fields.push({})}>
            Додати складову
          </Button>
          { submitFailed && error && <span>{error}</span> }
        </li>
      </ul>
    );
  }
}
