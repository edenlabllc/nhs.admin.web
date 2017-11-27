import React from "react";
import withStyles from "withStyles";
import classnames from "classnames";

import styles from "./styles.scss";

const ListHeaderComponent = ({ button, children, ...props }) => (
  <div className={styles.header} {...props}>
    {children}
    {button && <div className={styles.header__btn}>{button}</div>}
  </div>
);

export const ListHeader = withStyles(styles)(ListHeaderComponent);

const ListFilterComponent = props => (
  <div className={styles.filter} {...props} />
);

export const ListFilter = withStyles(styles)(ListFilterComponent);

const ListShowByComponent = props => (
  <div className={styles.showBy} {...props} />
);

export const ListShowBy = withStyles(styles)(ListShowByComponent);

const ListTableComponent = props => <div className={styles.table} {...props} />;

export const ListTable = withStyles(styles)(ListTableComponent);

const ListStatusComponent = ({ verified, ...props }) => (
  <span
    className={classnames(styles.status, {
      [styles.status_verified]: verified
    })}
    {...props}
  />
);

export const ListStatus = withStyles(styles)(ListStatusComponent);

const ListPaginationComponent = props => (
  <div className={styles.pagination} {...props} />
);

export const ListPagination = withStyles(styles)(ListPaginationComponent);
