import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'withStyles';

import Icon from 'components/Icon';

import styles from './styles.scss';

export default withStyles(styles)(({ children, to, iconPosition = 'left' }) => (
  <div className={classnames(styles.back, styles[`back_icon_${iconPosition}`])}>
    <Link to={to}>
      <span className={styles.back__icon}>
        <Icon name="back" />
      </span>
      <div className={styles.back__content}>{children}</div>
    </Link>
  </div>
));
