module.exports = {
  'Reimbursement Report with incorrect params.': browser => {
    const url =
      'http://localhost:8080/api-internal/reimbursement_report_download?date_from_dispense=2017-11-05';

    browser
      .url(url)
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:8080/internal-error/') // Redirect to internal error page.
      .assert.title('NHS - Internal Error') // Correct title.
      .end();
  }
};
