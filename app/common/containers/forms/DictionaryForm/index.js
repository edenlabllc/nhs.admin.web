import React from 'react';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray } from 'redux-form';

import Form, { FormRow, FormBlock, FormButtons, FormColumn } from 'components/Form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import Button, { ButtonsGroup } from 'components/Button';

import { reduxFormValidate, collectionOf } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'dictionary-form',
  validate: reduxFormValidate({
    values: collectionOf({
      key: {
        required: true,
      },
      value: {
        required: true,
      },
    }),
  }),
})
export default class DictionaryForm extends React.Component {
  get isChanged() {
    const { values = [], initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { handleSubmit, readOnly } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <FormBlock title="General">
          <FormRow>
            <Field name="is_active" labelText="Is active" component={FieldCheckbox} readOnly={readOnly} />
          </FormRow>
        </FormBlock>
        <FieldArray name="values" component={renderFields} readOnly={readOnly} />
        { !readOnly && (
          <FormButtons>
            <ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>Save Dictionary</Button>
            </ButtonsGroup>
          </FormButtons>
        )}
      </Form>
    );
  }
}

const renderFields = ({ fields, readOnly }) => (
  <FormBlock title="Values">
    {fields.map((item, index) =>
      <FormRow key={index}>
        <FormColumn>
          <Field
            name={`${item}.key`}
            component={FieldInput}
            placeholder="Item key"
            readOnly={readOnly}
          />
        </FormColumn>
        <FormColumn>
          <Field
            name={`${item}.value`}
            component={FieldInput}
            placeholder="Item description"
            readOnly={readOnly}
          />
        </FormColumn>
        {
          !readOnly && (
            <FormColumn>
              <Button color="red" type="button" size="small" onClick={() => fields.remove(index)} tabIndex={-1}>Remove</Button>
            </FormColumn>
          )
        }
      </FormRow>
    )}
    {
      !readOnly && (
        <FormButtons>
          <Button type="button" color="blue" size="small" onClick={() => fields.push({})}>Add Item</Button>
        </FormButtons>
      )
    }
  </FormBlock>
);
