import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';
import InnmDosagesCreateForm from 'containers/forms/InnmDosagesCreateForm';
import { getAllInnms, getDictionary } from 'reducers';

import { onSubmit } from './redux';

@withRouter
@translate()
@connect(
  state => ({
    innms: getAllInnms(state),
    medication_unit: getDictionary(state, 'MEDICATION_UNIT'),
    medication_form: getDictionary(state, 'MEDICATION_FORM')
  }),
  { onSubmit }
)
export default class InnmDosagesCreatePage extends React.Component {
  render() {
    const {
      t,
      router,
      innms = [],
      medication_unit = [],
      medication_form = [],
      onSubmit
    } = this.props;

    return (
      <div id="innm-dosages-create-page">
        <Helmet
          title="Сторінка створення лікарської форми"
          meta={[
            {
              property: 'og:title',
              content: 'Сторінка створення лікарської форми'
            }
          ]}
        />
        <BackLink onClick={() => router.goBack()}>
          Додати лікарську форму
        </BackLink>
        <Line />

        <InnmDosagesCreateForm
          onSubmit={onSubmit}
          data={{ innms, medication_unit, medication_form }}
        />
      </div>
    );
  }
}
