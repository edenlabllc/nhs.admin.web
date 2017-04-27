import React from 'react';
import { translate } from 'react-i18next';

import { H1 } from 'components/Title';
import Button from 'components/Button';

@translate()
export default class NotFoundPage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div id="not-found-page">
        <H1>{ t('Page Not Found') }</H1>
        <p>
          { t('Requested page not found. Maybe you are looking for') }
          <Button theme="link" to="/dashboard" >{ t('Go to dashboard') }</Button>.
        </p>
      </div>
    );
  }
}
