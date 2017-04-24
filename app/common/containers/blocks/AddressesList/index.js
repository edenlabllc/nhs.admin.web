import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export default withStyles(styles)(({ list = [] }) => (
  <ul className={styles.list}>
    {list.map((item, i) => (
      <li key={i}>
        {item.settlement}, {item.street} {item.building},
        ap. {item.apartment} ({item.zip})

        <span>
          Area: {item.area}, region: {item.region}
        </span>
      </li>
    ))}
  </ul>
));
