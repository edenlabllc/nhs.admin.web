import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';
import InnmDosagesCreateForm from 'containers/forms/InnmDosagesCreateForm';

import { createInnmDosage } from 'redux/innm-dosages';
import { getAllInnms, getDictionary } from 'reducers';

@withRouter
@translate()
@connect(state => ({
  innms: getAllInnms(state),
  medication_unit: getDictionary(state, 'MEDICATION_UNIT'),
  medication_form: getDictionary(state, 'MEDICATION_FORM'),
}), { createInnmDosage })
export default class InnmDosagesCreatePage extends React.Component {

  render() {
    const { t, router, innms = [], medication_unit = [], medication_form = [] } = this.props;
    console.log(medication_form);
    return (
      <div id="innm-dosages-create-page">
        <Helmet
          title={t('Innm dosages create page')}
          meta={[
            { property: 'og:title', content: t('Innm dosages create page') },
          ]}
        />
        <BackLink onClick={() => router.goBack()}>Додати форму хімічної сполуки</BackLink>
        <Line />

        <InnmDosagesCreateForm
          onSubmit={v => createInnmDosage(v).then(resp =>
            router.push(`/innm-dosages/${resp.payload.data.id}`))}
          data={{ innms, medication_unit, medication_form }}
        />


      </div>
    );
  }
}
