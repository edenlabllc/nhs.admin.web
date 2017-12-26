import React from "react";
import withStyles from "withStyles";
import { Field } from "redux-form";

import styles from "./styles.scss";

import FieldCheckbox from "components/reduxForm/FieldCheckbox";

const CheckboxFilterField = ({ name, title }) => (
  <div className={styles.checkbox}>
    <Field name={name} labelText={title} component={FieldCheckbox} />
  </div>
);

export default withStyles(styles)(CheckboxFilterField);
