import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export default withStyles(styles)(({ color, children }) => (
  <span className={styles[color]}>{children}</span>
));
