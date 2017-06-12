import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import SignInForm from 'containers/forms/SignInForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class SignInPage extends React.Component {
  render() {
    const { onSubmit } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <div className={styles.main__content}>
          <header className={styles.header}>
            {
              // <img src="/images/logo-login.svg" alt="Logo" />
            }
          </header>
          <article className={styles.form}>
            <SignInForm onSubmit={onSubmit} />
          </article>
        </div>
      </section>
    );
  }
}
