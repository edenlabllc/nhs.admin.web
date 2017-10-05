import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';
import MedicationsCreateForm from 'containers/forms/MedicationsCreateForm';
import { getAllInnms, getDictionary } from 'reducers';

import { onSubmit } from './redux';

@withRouter
@translate()
@connect(state => ({
  innms: getAllInnms(state),
  medication_unit: getDictionary(state, 'MEDICATION_UNIT'),
  medication_form: getDictionary(state, 'MEDICATION_FORM'),
}), { onSubmit })
export default class MedicationCreatePage extends React.Component {

  render() {
    const {
      t,
      router,
      innms = [],
      medication_unit = [],
      medication_form = [],
      onSubmit,
    } = this.props;

    return (
      <div id="innm-dosages-create-page">
        <Helmet
          title={t('Innm dosages create page')}
          meta={[
            { property: 'og:title', content: t('Innm dosages create page') },
          ]}
        />
        <BackLink onClick={() => router.goBack()}>Додати торгову назву</BackLink>
        <Line />

        <MedicationsCreateForm
          onSubmit={onSubmit}
          data={{ innms, medication_unit, medication_form }}
        />
      </div>
    );
  }
}
