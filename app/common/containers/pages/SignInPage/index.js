import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';

import SignInForm from 'containers/forms/SignInForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@connect(null, { onSubmit })
export default class SignInPage extends React.Component {
  render() {
    const { onSubmit, t } = this.props;

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
          <article className={styles.form}>
            <SignInForm onSubmit={onSubmit} />
          </article>
        </div>
      </section>
    );
  }
}
