import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { reset } from 'redux-form';

import { resetAuthMethod } from 'redux/persons';

import ResetAuthenticationMethodForm from 'containers/forms/ResetAuthenticationMethodForm';

import { H1 } from 'components/Title';
import Button from 'components/Button';
import { Confirm, Alert } from 'components/Popup';

@connect(null, { resetAuthMethod, reset })
export default class ResetAuthenticationMethodPage extends Component {
  state = {};

  render() {
    const { person_id, showResetAuthConfirm, showResetAuthAlert } = this.state;

    return (
      <div>
        <Helmet
          title="Скинути метод авторизації"
          meta={[
            { property: 'og:title', content: 'Скинути метод авторизації' }
          ]}
        />

        <H1>Скинути метод авторизації</H1>

        <ResetAuthenticationMethodForm
          onSubmit={({ person_id }) =>
            this.setState({ person_id, showResetAuthConfirm: true })}
        />

        <Confirm
          title="Скинути метод авторизації?"
          active={showResetAuthConfirm}
          theme="error"
          cancel="Скасувати"
          confirm="Так"
          onCancel={() => this.setState({ showResetAuthConfirm: false })}
          onConfirm={this.resetAuthMethod}
        />

        <Alert
          title="Метод авторизації успішно скинутий"
          active={showResetAuthAlert}
          theme="success"
          ok="Ok"
          onClose={() => this.setState({ showResetAuthAlert: false })}
        />
      </div>
    );
  }

  resetAuthMethod = () => {
    const { resetAuthMethod, reset } = this.props;
    const { person_id } = this.state;

    resetAuthMethod(person_id).then(({ error }) => {
      this.setState({
        person_id: null,
        showResetAuthConfirm: false,
        showResetAuthAlert: !error
      });

      if (!error) return reset('reset-authentication-method-form');
    });
  };
}
