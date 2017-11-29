import React from "react";
import classnames from "classnames";
import withStyles from "withStyles";

import styles from "./styles.scss";

const DataList = ({ list = [], theme = "default" }) => (
  <dl className={classnames(styles.list, styles[`list_theme_${theme}`])}>
    {list
      .filter(Boolean)
      .reduce(
        (arr, item, index) =>
          arr.concat([
            <dt key={`dt-${index}`}>{item.name}</dt>,
            <dd key={`dd-${index}`}>{item.value}</dd>
          ]),
        []
      )}
  </dl>
);

export default withStyles(styles)(DataList);
