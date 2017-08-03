import React from 'react';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';


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
        <Helmet
          title={t('Page Not Found')}
          meta={[
            { property: 'og:title', content: t('Page Not Found') },
          ]}
        />
        <div className={styles.error__main}>
          <H1>{ t('Page Not Found') }</H1>
          <p>
            { t('Requested page not found. Maybe you are looking for') }
            <Button theme="link" to="/" >{ t('Go to dashboard') }</Button>.
          </p>
        </div>
      </section>
    );
  }
}
