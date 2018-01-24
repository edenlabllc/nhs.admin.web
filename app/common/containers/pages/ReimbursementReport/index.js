import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Helmet from "react-helmet";

import { H1 } from "../../../components/Title/index";
import DateFilterForm from "../../forms/DateFilterForm/index";
import { createUrl } from "../../../helpers/url";
import { API_URL } from "../../../config";

const FILTER_DATE = ["date_from_dispense", "date_to_dispense"];

@withRouter
export default class ReimbursementReportPage extends React.Component {
  render() {
    return (
      <div id="reimbursement-report">
        <Helmet
          title={"Звіт"}
          meta={[{ property: "og:title", content: "Звіт" }]}
        />

        <H1>Звіт</H1>

        <DateFilterForm
          items={FILTER_DATE}
          initialValues={[].reduce(
            (filter, name) => ({ ...filter, [name]: location.query[name] }),
            {}
          )}
          onSubmit={this.onSubmit}
          submitTitle={"Завантажити"}
        />
      </div>
    );
  }

  /**
   * @param {Object} values - Object with date_from_dispense and
   *                          date_to_dispense properties from DateFilterForm.
   */
  onSubmit = ({ date_from_dispense, date_to_dispense }) => {
    if (!date_from_dispense || !date_to_dispense) return;

    const url = createUrl(`${API_URL}/api/reimbursement_report`, {
      date_from_dispense,
      date_to_dispense
    });

    window.open(url, "_blank");
  };
}
