import React from 'react';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';

import { OAUTH_URL, SCOPES, CLIENT_ID, OAUTH_REDIRECT_URL } from 'config';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
export default class SignInPage extends React.Component {
  render() {
    const { t, location: { query } } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <Helmet
          title={t('Sign in')}
          meta={[
            { property: 'og:title', content: t('Sign in') },
          ]}
        />

        <div className={styles.main__content}>
          <header className={styles.header}>
            <img src="/images/nhs-logo.svg" alt="Logo" />
          </header>
          { query.error && <section className={styles.error}>
            { t('Auth error {{code}}', { code: query.error }) }
          </section> }
          <article className={styles.form}>
            <a
              className={styles.button}
              href={`${OAUTH_URL}?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${OAUTH_REDIRECT_URL}`}
            >
              { t('Enter with EHEALTH') }
            </a>
          </article>
        </div>
      </section>
    );
  }
}
