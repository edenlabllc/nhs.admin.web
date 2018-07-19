import React from "react";
import { compose } from "redux";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import styles from "./styles.scss";

const AddressesList = ({ list = [] }) => (
  <ul className={styles.list}>
    {list.map((item, i) => (
      <li key={i}>
        {item.settlement}, {item.street} {item.building}, кв. {item.apartment} ({
          item.zip
        })
        <span>
          Область: {item.area}, Район: {item.region}
        </span>
      </li>
    ))}
  </ul>
);

export default compose(withStyles(styles))(AddressesList);
