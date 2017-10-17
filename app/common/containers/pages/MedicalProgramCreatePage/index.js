import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';
import MedicalProgramCreateForm from 'containers/forms/MedicalProgramCreateForm';
import BackLink from 'containers/blocks/BackLink';
import Line from 'components/Line';

import { createMedicalProgram } from 'redux/medical-programs';

@withRouter
@translate()
@connect(null, { createMedicalProgram })
export default class MedicalProgramCreatePage extends React.Component {
  render() {
    const { createMedicalProgram = () => {}, t, router } = this.props;

    return (
      <div id="innm-create-page">
        <Helmet
          title="Сторінка створення Медичної Программи"
          meta={[
            {
              property: 'og:title',
              content: 'Сторінка створення Медичної Программи'
            }
          ]}
        />
        <BackLink onClick={() => router.goBack()}>
          Повернутися до списку Медичних Програм
        </BackLink>
        <Line />

        <H1>Cтворення Медичної Программи</H1>

        <MedicalProgramCreateForm
          create
          onSubmit={v =>
            createMedicalProgram(v).then(resp =>
              router.push(`/medical-program/${resp.payload.data.id}`)
            )}
        />
      </div>
    );
  }
}
