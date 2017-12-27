import React, { Component } from "react";
import withStyles from "withStyles";
import { Field } from "redux-form";

import FieldDate from "components/reduxForm/FieldDatepicker";

import styles from "./styles.scss";

@withStyles(styles)
export default class DateFilterField extends Component {
  componentDidMount() {
    this.initForm();
  }

  render() {
    const { filters } = this.props;

    return (
      <div className={styles.date}>
        {filters.map(({ name, title, placeholder }) => (
          <div key={name} className={styles.date__filter}>
            <Field
              name={name}
              component={FieldDate}
              dateFormat="YYYY-MM-DD"
              labelText={title}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    );
  }

  initForm() {
    const { initFields, filters, query } = this.props;

    const values = filters
      .filter(({ name }) => Object.hasOwnProperty.call(query, name))
      .reduce((fields, { name }) => ({ ...fields, [name]: query[name] }), {});

    initFields(values);
  }
}
