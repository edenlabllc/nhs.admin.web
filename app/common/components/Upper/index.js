import React from "react";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import styles from "./styles.scss";

const Upper = ({ children }) => (
  <span className={styles.upper}>{children}</span>
);

export default withStyles(styles)(Upper);
