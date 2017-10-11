import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const Boxes = ({ children }) => <div className={styles.boxes}>{children}</div>;

export default withStyles(styles)(Boxes);
