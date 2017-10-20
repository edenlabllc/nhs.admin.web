import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'withStyles';

import Icon from 'components/Icon';

import styles from './styles.scss';

const BackLink = ({
  children,
  to,
  iconPosition = 'left',
  detached,
  onClick
}) => (
  <div
    className={classnames(styles.back, styles[`back_icon_${iconPosition}`], {
      [styles.back_detached]: detached
    })}
  >
    <Link onClick={onClick} to={to}>
      <span className={styles.back__icon}>
        <Icon name="back" />
      </span>
      <div className={styles.back__content}>{children}</div>
    </Link>
  </div>
);

export default withStyles(styles)(BackLink);
