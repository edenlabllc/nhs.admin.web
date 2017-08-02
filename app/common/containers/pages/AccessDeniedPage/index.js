import React from 'react';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';

@translate()
export default class NotFoundPage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <section id="access-denied-page">
        <Helmet
          title={t('Access denied')}
          meta={[
            { property: 'og:title', content: t('Access denied') },
          ]}
        />
        <H1>{ t('Access denied') }</H1>
        <p>
          { t('You have no access to this page. Try to re-login with new role or call to support.') }
        </p>
      </section>
    );
  }
}
