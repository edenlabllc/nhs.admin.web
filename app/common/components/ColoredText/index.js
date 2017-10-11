import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const ColoredText = ({ color, children }) => (
  <span className={styles[color]}>{children}</span>
);

export default withStyles(styles)(ColoredText);
