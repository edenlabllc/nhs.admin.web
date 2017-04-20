import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray, getFormValues } from 'redux-form';

import Form, { FormRow, FormButtons } from 'components/Form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import Button, { ButtonsGroup } from 'components/Button';
import Line from 'components/Line';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'dictionary-form',
  initialValues: {
    syntax: 'mustache_to_html',
  },
  validate: reduxFormValidate({

  }),
})
@connect(state => ({
  values: getFormValues('dictionary-form')(state),
}))
export default class DictionaryForm extends React.Component {
  get isChanged() {
    const { values = [], initialValues = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }

  render() {
    const { dictionary, onDelete, isEdit } = this.props;

    return (
      <Form>
        <Line />
        <FormRow>
          <Field name="is_active" labelText="IS ACTIVE" checked={dictionary.is_active} component={FieldCheckbox} />
        </FormRow>
        {
          Object.keys(dictionary.values).map(item => <div>
            <FormRow key={item}>
              <Field
                name={item}
                labelText={item}
                component={FieldInput}
                value={dictionary.values[item]}
              />
            </FormRow>
          </div>
          )
        }
        <Line />
        <FormRow>
          <FieldArray name="dictionary.values" component={renderFields} />
        </FormRow>
        <FormButtons>
          <ButtonsGroup>
            <Button type="submit" disabled={!this.isChanged}>
              {isEdit ? 'Save Dictionary' : 'Update Dictionary'}
            </Button>
            {isEdit && (
              <Button id="delete-dictionary-button" type="button" onClick={onDelete} color="red" >
                Delete Dictionary
              </Button>
            )}
          </ButtonsGroup>
        </FormButtons>
      </Form>
    );
  }
}
const renderFields = ({ fields }) => (
  <ul>
    {fields.map((item, index) =>
      <li key={index}>
        <div className={styles.columns}>
          <div>
            <Field
              name={`${item}.name`}
              type="text"
              component={FieldInput}
              placeholder="New item key"
            />
          </div>
          <div>
            <Field
              name={`${item}.value`}
              type="text"
              component={FieldInput}
              placeholder="Value"
            />
          </div>
          <div>
            <Button color="red" type="button" onClick={() => fields.remove(index)}>Cancel</Button>
          </div>
        </div>
      </li>
    )}
    <li>
      <Button type="button" color="blue" onClick={() => fields.push({})}>Add Item</Button>
    </li>
  </ul>
);

