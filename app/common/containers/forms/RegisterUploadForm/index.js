import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import { reduxForm, Field, getFormValues } from "redux-form";
import {
  reduxFormValidate,
  collectionOf,
  ErrorMessage
} from "react-nebo15-validate";
import FieldInput from "components/reduxForm/FieldInput";

import Button from "components/Button";
import { FormRow, FormColumn } from "components/Form";
import { SelectUniversal } from "components/SelectUniversal";

import ShowWithScope from "containers/blocks/ShowWithScope";
import { PERSON_TYPE } from "helpers/enums";

import styles from "./styles.scss";

@withStyles(styles)
@reduxForm({
  form: "register-upload-form",
  validate: reduxFormValidate({
    type: {
      required: true
    },
    person_type: {
      required: true
    }
  })
})
@connect(state => ({
  values: getFormValues("register-upload-form")(state)
}))
export default class RegisterUploadForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onSubmit = () => {},
      data: { registerTypes },
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <FormRow>
            <FormColumn>
              <Field
                name="type"
                component={SelectUniversal}
                labelText="Тип особи"
                label_bold
                placeholder="Оберіть тип особи"
                options={Object.keys(PERSON_TYPE).map(key => ({
                  name: key,
                  title: PERSON_TYPE[key]
                }))}
              >
                <ErrorMessage when="required">Обов'якове поле</ErrorMessage>
              </Field>
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="person_type"
                component={SelectUniversal}
                labelText="Тип файлу"
                label_bold
                placeholder="Оберіть тип файлу"
                options={registerTypes.map(({ key, value }) => ({
                  name: key,
                  title: value
                }))}
              >
                <ErrorMessage when="required">Обов'якове поле</ErrorMessage>
              </Field>
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <ShowWithScope scope="register:write">
                <div>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Збереження" : "Зберегти файл"}
                  </Button>
                </div>
              </ShowWithScope>
            </FormColumn>
          </FormRow>
        </div>
      </form>
    );
  }
}
