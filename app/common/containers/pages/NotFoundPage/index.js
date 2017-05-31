import React from 'react';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';


import { H1 } from 'components/Title';
import Button from 'components/Button';

import styles from './styles.scss';

@withStyles(styles)
@translate()
export default class NotFoundPage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <section className={styles.error} id="not-found-page">
        <div className={styles.error__main}>
          <H1>{ t('Page Not Found') }</H1>
          <p>
            { t('Requested page not found. Maybe you are looking for') }
            <Button theme="link" to="/dashboard" >{ t('Go to dashboard') }</Button>.
          </p>
        </div>
      </section>
    );
  }
}
