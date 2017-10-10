import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';
import InnmForm from 'containers/forms/InnmForm';
import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';

import { createInnm } from 'redux/innms';

@withRouter
@translate()
@connect(null, { createInnm })
export default class InnmCreatePage extends React.Component {
  render() {
    const { createInnm = () => {}, t, router } = this.props;

    return (
      <div id="innm-create-page">
        <Helmet
          title={t('Innm create page')}
          meta={[
            { property: 'og:title', content: t('Innm create page') },
          ]}
        />
        <BackLink onClick={() => router.goBack()}>{ t('Back to innms list') }</BackLink>
        <Line />

        <H1>{ t('Innm create page') }</H1>

        <InnmForm
          create
          onSubmit={v => createInnm(v).then(resp =>
            router.push(`/innms/${resp.payload.data.id}`))}
        />
      </div>
    );
  }
}
