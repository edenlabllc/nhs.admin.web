import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const BlocksList = ({ children }) => (
  <ul className={styles.list}>{children}</ul>
);

export default withStyles(styles)(BlocksList);
