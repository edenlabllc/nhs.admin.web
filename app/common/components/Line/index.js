import React from "react";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import styles from "./styles.scss";

const Line = ({ width }) => (
  <hr className={styles.line} style={{ width: `${width}px` }} />
);

export default withStyles(styles)(Line);
