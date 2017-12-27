import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router";
import withStyles from "withStyles";
import { translate } from "react-i18next";

import styles from "./styles.scss";

@translate()
@withStyles(styles)
@withRouter
export default class ShowBy extends Component {
  static defaultProps = {
    counts: ["5", "20", "50"]
  };

  state = {
    page_size: this.props.location.query.page_size || "5"
  };

  render() {
    const { counts, t } = this.props;
    const { page_size } = this.state;

    return (
      <div className={styles.main}>
        <span className={styles.text}>{t("Show by")}</span>
        {counts.map(count => (
          <button
            key={count}
            onClick={() => this.updateFilter(count)}
            className={classnames(styles.button, {
              [styles.button_active]: page_size === count
            })}
          >
            {count}
          </button>
        ))}
      </div>
    );
  }

  updateFilter(page_size) {
    const { location: { query, ...location }, router } = this.props;

    this.setState({ page_size });

    router.push({
      ...location,
      query: { ...query, page_size, page: 1 }
    });
  }
}
