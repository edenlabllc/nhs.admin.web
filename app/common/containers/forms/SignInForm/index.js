import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import {
  reduxForm,
  Field,
  getFormSyncErrors,
  getFormSubmitErrors
} from "redux-form";

import FieldInput from "components/reduxForm/FieldInput";
import Icon from "components/Icon";

import { reduxFormValidate } from "react-nebo15-validate";

import styles from "./styles.scss";

@withStyles(styles)
@connect(state => ({
  errors: {
    ...getFormSyncErrors("sign-in-form")(state),
    ...getFormSubmitErrors("sign-in-form")(state)
  }
}))
@reduxForm({
  form: "sign-in-form",
  validate: reduxFormValidate({
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    }
  })
})
export default class SignInForm extends React.Component {
  render() {
    const { handleSubmit, submitting, errors = {} } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            placeholder="E-mail"
            name="email"
            component={FieldInput}
            prefix={
              <span className={styles.envelope}>
                <Icon name="envelope" />
              </span>
            }
            postfix={
              errors.email ? (
                <span className={styles.errored}>
                  <Icon name="close" />
                </span>
              ) : (
                <span className={styles.ok}>
                  <Icon name="check-right" />
                </span>
              )
            }
          />
        </div>
        <div>
          <Field
            type="password"
            placeholder="Пароль"
            name="password"
            component={FieldInput}
            prefix={<Icon name="lock" />}
          />
        </div>
        <div>
          <button className={styles.button} type="submit" disabled={submitting}>
            Увійти
          </button>
        </div>
      </form>
    );
  }
}
