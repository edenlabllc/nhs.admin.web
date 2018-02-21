import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import { reduxForm, Field, getFormValues } from "redux-form";
import {
  reduxFormValidate,
  collectionOf,
  ErrorMessage
} from "react-nebo15-validate";
import ReactFileReader from "react-file-reader";

import FieldTextarea from "components/reduxForm/FieldTextarea";

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
  state = {
    file_name: null,
    file: null
  };

  handleFiles = file => {
    this.setState(() => ({
      file: file.base64,
      file_name: file.fileList[0].name
    }));
  };

  onSubmit({ person_type, type, reason_description }) {
    const { file, file_name } = this.state;
    return this.props.onSubmit({
      person_type: person_type.name,
      type: type.name,
      file: file.replace("data:text/csv;base64,", ""),
      file_name,
      reason_description
    });
  }

  render() {
    const { handleSubmit, data: { registerTypes } } = this.props;
    const { file, file_name } = this.state;

    return (
      <form onSubmit={handleSubmit(v => this.onSubmit(v)).bind(this)}>
        <div className={styles.form}>
          <FormRow>
            <FormColumn>
              <Field
                name="person_type"
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
                name="type"
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
              <Field
                name="reason_description"
                component={FieldTextarea}
                labelText="Причина дії"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <ReactFileReader
                fileTypes={[".csv"]}
                base64={true}
                multipleFiles={false}
                handleFiles={this.handleFiles}
              >
                <Button size="small" color="blue">
                  Завантажити файл
                </Button>
                {file_name && (
                  <span>
                    <b>{` ${file_name}*`}</b>
                  </span>
                )}
              </ReactFileReader>
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <ShowWithScope scope="register:write">
                <div>
                  <Button type="submit" disabled={!file && !file_name}>
                    {!file && !file_name ? "Завантажте файл" : "Зберегти файл"}
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
