import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import FieldInput from 'components/reduxForm/FieldInput';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'edrpou-filter-form',
  validate: reduxFormValidate({
    edrpou: {
      maxLength: 10,
    },
  }),
})
export default class EdrpouFilterForm extends React.Component {
  render() {
    const { handleSubmit, submitting, t } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field type="number" placeholder={t('edrpou')} name="edrpou" component={FieldInput} />
        </div>
        <div>
          <button className={styles.button} disabled={submitting} type="submit">
            { t('Search') }
          </button>
        </div>
      </form>
    );
  }
}
