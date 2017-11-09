import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import { reduxFormValidate } from 'react-nebo15-validate';
import Select from 'components/Select';
import { FormRow, FormColumn } from 'components/Form';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'active-filter-form'
})
export default class ActiveFilterForm extends React.Component {
  render() {
    const { onChange = () => {}, active = null } = this.props;
    return (
      <div>
        <form className={styles.main}>
          <FormRow>
            <FormColumn align="baseline">
              <Select
                name="is_active"
                labelText="Активні/Не активні"
                active={active}
                options={[
                  { title: 'Активні', name: true },
                  { title: 'Не активні', name: false }
                ]}
                onChange={active => onChange(active)}
              />
            </FormColumn>
          </FormRow>
        </form>
      </div>
    );
  }
}
