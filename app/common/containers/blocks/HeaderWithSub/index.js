import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from 'components/Title';
import Line from 'components/Line';

import styles from './styles.scss';

const HeaderWithSub = ({ title, children }) => (
  <div>
    <H1>{title}</H1>
    <div className={styles.sub}>{children}</div>
    <Line />
  </div>
);

export default withStyles(styles)(HeaderWithSub);
