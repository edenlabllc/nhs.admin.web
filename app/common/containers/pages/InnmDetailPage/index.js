import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';
import InnmForm from 'containers/forms/InnmForm';
import { withRouter } from 'react-router';
import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';

import { getInnm } from 'reducers';
// import { deactivateInnms } from 'redux/innms';
import { fetchInnm } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) =>
    dispatch(fetchInnm(id)),
})
@connect((state, { params: { id } }) => ({
  innm: getInnm(state, id),
}))
export default class InnmDetailPage extends React.Component {
  render() {
    const { innm = {}, t } = this.props;

    return (
      <div id="innm-detail-page">
        <Helmet
          title={t('Innm detail page')}
          meta={[
            { property: 'og:title', content: t('Innm detail page') },
          ]}
        />
        <BackLink onClick={() => this.props.router.goBack()}>{ t('Back to innms list') }</BackLink>
        <Line />

        <H1>{ t('Innm detail page') }</H1>

        <InnmForm initialValues={innm} disabled />
      </div>
    );
  }
}
