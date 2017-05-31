import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';

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
        <div className={styles.main__content}>
          <header className={styles.header}>
            <H1>{ t('Please, enter your data') }</H1>
          </header>
          <article className={styles.form}>
            <SignInForm onSubmit={onSubmit} />
          </article>
        </div>
      </section>
    );
  }
}
