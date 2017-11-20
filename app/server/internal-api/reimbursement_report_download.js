import request from 'request';
import * as config from '../../common/config';

const reimbursementReportDownload = (req, res) => {
  if (
    !req.query.date_from_dispense ||
    !req.query.date_to_dispense ||
    !req.query.token
  ) {
    return;
  }

  const options = {
    method: 'GET',
    url: config.API_HOST + '/api/reimbursement_report_download',
    qs: {
      date_from_dispense: req.query.date_from_dispense,
      date_to_dispense: req.query.date_to_dispense
    },
    headers: {
      'cache-control': 'no-cache',
      authorization: 'Bearer ' + req.query.token
    }
  };

  request(options, (error, response, body) => {
    if (response.statusCode === 200) {
      res.setHeader('content-type', 'text/csv; charset=utf-8');
      res.send(body);
    } else {
      res.redirect('/internal-error');
    }
  });
};

export default reimbursementReportDownload;
