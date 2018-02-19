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
    const { filters, requiredStar = false } = this.props;
    return (
      <div className={filters.length > 1 ? styles.date : styles.date__single}>
        {filters.map(({ name, labelText, placeholder, validate }) => (
          <div key={name} className={styles.date__filter}>
            <Field
              label_bold
              name={name}
              component={FieldDate}
              dateFormat="YYYY-MM-DD"
              labelText={labelText}
              requiredStar={requiredStar}
              placeholder={placeholder}
              validate={validate ? [validate] : undefined}
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
