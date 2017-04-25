import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export default withStyles(styles)(({ list = [] }) => (
  <dl className={styles.list}>
    {
      list.reduce((arr, item, index) => (
        arr.concat([
          <dt key={`dt-${index}`}>{item.name}</dt>,
          <dd key={`dd-${index}`}>{item.value}</dd>,
        ])
      ), [])
    }
  </dl>
));
