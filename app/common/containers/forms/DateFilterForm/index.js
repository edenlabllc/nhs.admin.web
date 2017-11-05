import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import { reduxFormValidate } from 'react-nebo15-validate';
import FieldDate from 'components/reduxForm/FieldDatepicker';
import { FormRow, FormColumn } from 'components/Form';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'dates-range-filter-form',
  validate: reduxFormValidate({
    created_from: {
      required: true
    }
  })
})
export default class DateFilterForm extends React.Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <form className={styles.main} onSubmit={handleSubmit}>
          <FormRow>
            <FormColumn align="baseline">
              <Field
                name="created_from"
                component={FieldDate}
                dateFormat="YYYY-MM-DD"
                labelText="Початкова дата"
                placeholder="22/01/2018"
              />
            </FormColumn>
            <FormColumn align="baseline">
              <Field
                name="created_to"
                component={FieldDate}
                dateFormat="YYYY-MM-DD"
                labelText="Кінцева дата"
                placeholder="26/01/2018"
              />
            </FormColumn>
            <FormColumn align="baseline">
              <button
                className={styles.button}
                disabled={submitting}
                type="submit"
              >
                Пошук
              </button>
            </FormColumn>
          </FormRow>
        </form>
      </div>
    );
  }
}
