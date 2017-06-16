import Express from 'express';

import * as config from '../common/config';
import { CLIENT_SECRET } from './config';

const router = new Express.Router();

const createSessionToken = code => fetch(`${config.API_HOST}/oauth/tokens`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    token: {
      grant_type: 'authorization_code',
      client_id: config.CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: config.OAUTH_REDIRECT_URL,
      scope: config.SCOPES,
      code,
    },
  }),
}).then(response => response.json());

router.get(config.OAUTH_REDIRECT_PATH, (req, resp) => {
  if (!req.query.code) {
    resp.redirect('/sign-in');
    return;
  }

  createSessionToken(req.query.code).then(({ data, meta }) => {
    if (data.error) {
      resp.redirect(`/sign-in?error=${meta.code}`);
      return;
    }

    resp.cookie(config.AUTH_COOKIE_NAME, data.value);
    resp.redirect('/');
  });
});

export default router;
