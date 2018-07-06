import React from "react";
import classnames from "classnames";
import withStyles from "withStyles";
import { Field } from "redux-form";

import styles from "./styles.scss";

import FieldCheckbox from "components/reduxForm/FieldCheckbox";

const CheckboxFilterField = ({ name, title, fullWidth }) => (
  <div
    className={classnames(styles.checkbox, {
      [styles.fullWidth]: fullWidth
    })}
  >
    <Field name={name} labelText={title} component={FieldCheckbox} />
  </div>
);

export default withStyles(styles)(CheckboxFilterField);
