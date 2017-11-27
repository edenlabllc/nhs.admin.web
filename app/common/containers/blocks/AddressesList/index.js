import React from "react";
import { compose } from "redux";
import { translate } from "react-i18next";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import styles from "./styles.scss";

const AddressesList = ({ list = [], t }) => (
  <ul className={styles.list}>
    {list.map((item, i) => (
      <li key={i}>
        {item.settlement}, {item.street} {item.building},
        {t("ap.")} {item.apartment} ({item.zip})
        <span>
          {t("Region")}: {item.area}, {t("District")}: {item.region}
        </span>
      </li>
    ))}
  </ul>
);

export default compose(withStyles(styles), translate())(AddressesList);
