import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const InlineList = ({ list = [], separator = ',' }) => (
  <ul className={styles.list}>
    {list.map((name, i) => (
      <li key={i}>
        {name}
        {i !== list.length - 1 && separator}
      </li>
    ))}
  </ul>
);

export default withStyles(styles)(InlineList);
