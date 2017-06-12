import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import withStyles from 'withStyles';

import Icon from 'components/Icon';

import styles from './styles.scss';

export default withStyles(styles)(({ location, after = null, before = null }) => (
  <div className={styles.paging}>
    <div className={classnames(styles.paging__item, !before && styles.paging__item_disabled)}>
      <Link to={{ ...location, query: { ...location.query, ending_before: before } }}>
        <Icon name="arrow-left" />
      </Link>
    </div>
    <div className={classnames(styles.paging__item, !after && styles.paging__item_disabled)}>
      <Link to={{ ...location, query: { ...location.query, starting_after: after } }}>
        <Icon name="arrow-right" />
      </Link>
    </div>
  </div>
));
