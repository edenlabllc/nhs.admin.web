import React, { Component } from "react";
import withStyles from "withStyles";
import { Field } from "redux-form";

import FieldSelect from "components/reduxForm/FieldSelect";

import styles from "./styles.scss";

@withStyles(styles)
export default class SelectFilterField extends Component {
  componentDidMount() {
    this.initForm();
  }

  render() {
    const { name, title, options } = this.props;

    return (
      <div className={styles.select}>
        <Field
          component={FieldSelect}
          name={name}
          placeholder={title}
          options={options}
        />
      </div>
    );
  }

  initForm() {
    const { initFields, query, name } = this.props;
    const values = { [name]: query[name] };

    initFields(values);
  }
}
