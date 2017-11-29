import request from "request";
import * as config from "../../common/config";

/**
 * We need this endpoint to send HTTP GET request to our backend
 * with auth headers. So this simple "proxy" endpoint just gets token from GET param
 * and proxies it to backend with headers.
 *
 * @param req Express Request object.
 * @param res Express Response object.
 */
const reimbursementReportDownload = (req, res) => {
  if (
    !req.query.date_from_dispense ||
    !req.query.date_to_dispense ||
    !req.query.token
  ) {
    res.redirect("/internal-error");
  }

  const options = {
    method: "GET",
    url: config.API_HOST + "/api/reimbursement_report_download",
    qs: {
      date_from_dispense: req.query.date_from_dispense,
      date_to_dispense: req.query.date_to_dispense
    },
    headers: {
      "cache-control": "no-cache",
      authorization: "Bearer " + req.query.token
    }
  };

  /**
   * @link https://www.npmjs.com/package/request
   */
  request(options, (error, response, body) => {
    if (
      response.statusCode === 200 &&
      response.headers["content-type"] === "text/csv; charset=utf-8"
    ) {
      res.setHeader("content-type", "text/csv; charset=utf-8");
      res.send(body);
    } else {
      res.redirect("/internal-error");
    }
  });
};

export default reimbursementReportDownload;
