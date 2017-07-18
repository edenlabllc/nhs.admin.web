import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';

import { Confirm } from 'components/Popup';

@translate()
@withRouter
export default class ConfirmFormChanges extends React.Component {
  state = {
    isConfirmed: false,
    showConfirm: false,
    location: null,
  };

  componentDidMount() {
    this.removeListener = this.props.router.listenBefore((location) => {
      if (this.state.isConfirmed || !this.props.isChanged || this.props.submitting) {
        return true;
      }

      this.setState({ showConfirm: true, location: location.pathname });

      return false;
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = null;

  confirmLocation() {
    this.setState({ showConfirm: false, isConfirmed: true }, () => {
      this.props.router.replace(this.state.location);
    });
  }

  render() {
    const { t } = this.props;

    return (
      <Confirm
        title={t('You have unsaved changes')}
        active={this.state.showConfirm}
        theme="error"
        confirm={t('Ok')}
        id="confirm-leave"
        onCancel={() => this.setState({ showConfirm: false })}
        onConfirm={() => this.confirmLocation()}
      >{ t('Are you sure want to leave this page?') }</Confirm>
    );
  }
}
