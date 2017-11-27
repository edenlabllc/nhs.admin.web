import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Helmet from "react-helmet";

import { H1 } from "../../../components/Title/index";
import DateFilterForm from "../../forms/DateFilterForm/index";
import { createUrl } from "../../../helpers/url";
import { API_INTERNAL_PROXY } from "../../../config";
import { getToken } from "../../../reducers/index";

const FILTER_DATE = ["date_from_dispense", "date_to_dispense"];

@withRouter
@connect(state => ({
  token: getToken(state)
}))
export default class ReimbursementReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Don't need to use Redux logic because we just redirect user to another page.
   *
   * @param {Object} values - Object with date_from_dispense and
   *                          date_to_dispense properties from DateFilterForm.
   */
  onSubmit(values) {
    if (!values.date_from_dispense || !values.date_to_dispense) {
      return;
    }

    const options = Object.assign({}, values);
    options.token = this.props.token;

    const url = createUrl(
      `${API_INTERNAL_PROXY}/reimbursement_report_download`,
      options
    );

    window.open(url, "_blank");
  }

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
}
