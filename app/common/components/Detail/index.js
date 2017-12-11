import React from "react";
import withStyles from "withStyles";
import classnames from "classnames";

import styles from "./styles.scss";

const DetailMainComponent = props => <div className={styles.main} {...props} />;

export const DetailMain = withStyles(styles)(DetailMainComponent);

const DetailRowComponent = props => <div className={styles.row} {...props} />;

export const DetailRow = withStyles(styles)(DetailRowComponent);

const DetailRowRightComponent = props => (
  <div className={styles.right} {...props} />
);

export const DetailRowRight = withStyles(styles)(DetailRowRightComponent);
