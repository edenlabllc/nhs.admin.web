import React from 'react';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export default withStyles(styles)(translate()(({ list = [], t }) => (
  <ul className={styles.list}>
    {list.map((item, i) => (
      <li key={i}>
        {item.settlement}, {item.street} {item.building},
        { t('ap.') } {item.apartment} ({item.zip})

        <span>
          { t('Area') }: {item.area}, { t('region') }: {item.region}
        </span>
      </li>
    ))}
  </ul>
)));
