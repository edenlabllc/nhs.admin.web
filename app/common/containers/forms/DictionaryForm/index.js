import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, getFormValues } from 'redux-form';
import { collectionOf, reduxFormValidate, ErrorMessages, ErrorMessage } from 'react-nebo15-validate';

import Form, { FormRow, FormBlock, FormButtons, FormColumn, FormError } from 'components/Form';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';

const getValues = getFormValues('dictionary-form');

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
    }, {
      required: true,
      minLength: 1,
      uniqueKey: 'key',
    }),
  }),
})
@connect(state => ({
  values: getValues(state),
}))
export default class DictionaryForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      savedValues: props.initialValues,
    };
  }
  onSubmit(values, ...args) {
    if (typeof this.props.onSubmit !== 'function') {
      this.setState({
        savedValues: values,
      });
      return true;
    }
    const submitRes = this.props.onSubmit(values, ...args);
    if (typeof submitRes !== 'function') {
      this.setState({
        savedValues: values,
      });
      return submitRes;
    }

    submitRes.then(() => {
      this.setState({
        savedValues: values,
      });
    });

    return submitRes;
  }
  get isChanged() {
    const { values = [] } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.savedValues);
  }
  render() {
    const { handleSubmit, readOnly, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock title="General">
          <FormRow>
            <Field name="is_active" labelText="Is active" component={FieldCheckbox} readOnly={readOnly} />
          </FormRow>
        </FormBlock>
        <FieldArray name="values" component={renderFields} readOnly={readOnly} />
        <FormButtons>
          <ButtonsGroup>
            <Button type="submit" disabled={!this.isChanged}>{
              submitting ? 'Saving...' : (this.isChanged ? 'Save Dictionary' : 'Saved')
            }</Button>
          </ButtonsGroup>
        </FormButtons>
      </Form>
    );
  }
}

const renderFields = ({ fields, readOnly, meta }) => (
  <FormBlock title="Values">
    {fields.map((item, index) =>
      <FormRow key={index}>
        <FormColumn>
          <Field
            name={`${item}.key`}
            labelText={index === 0 && 'Key'}
            component={FieldInput}
            placeholder="Item key"
            readOnly={readOnly}
          />
        </FormColumn>
        <FormColumn>
          <Field
            name={`${item}.value`}
            labelText={index === 0 && 'Description'}
            component={FieldInput}
            placeholder="Item description"
            readOnly={readOnly}
          />
        </FormColumn>
        {
          !readOnly && (
            <FormColumn align="bottom">
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
    { meta.error && (
      <FormError>
        <ErrorMessages error={meta.error}>
          <ErrorMessage when="uniqueKey">{'You have not unique values in key: <%= params %>'}</ErrorMessage>
        </ErrorMessages>
      </FormError>
    )}
  </FormBlock>
);
