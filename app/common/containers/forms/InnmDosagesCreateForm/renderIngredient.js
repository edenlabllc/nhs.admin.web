import React from 'react';
import { Field } from 'redux-form';

import { SelectUniversal } from 'components/SelectUniversal';
import FieldInput from 'components/reduxForm/FieldInput';
import { FormRow, FormColumn } from 'components/Form';
import Button from 'components/Button';
import Line from 'components/Line';

export default class RenderIngredient extends React.Component {
  state = {
    innms_search: '',
  };

  render() {
    const { fields, meta: { error, submitFailed }, data } = this.props;
    return (
      <ul>
        { fields.map((ingredient, index) =>
          <li key={index}>
            <br />
            <FormRow>
              <FormColumn>
                <Field
                  name={`${ingredient}.denumerator_value`}
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
                  labelText=" "
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
                  name={`${ingredient}.denumerator_unit`}
                  component={SelectUniversal}
                  labelText=" "
                  options={Object.keys(data.medication_unit.values).map(
                    i => ({
                      title: i,
                      name: i,
                    })
                  )}
                />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <Button theme="border" size="small" onClick={() => fields.remove(index)}>
                  Відміна
                </Button>
              </FormColumn>
              <FormColumn>
                <Button theme="border" size="small" color="orange" onClick={() => fields.remove(index)}>
                  Додати складову
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
