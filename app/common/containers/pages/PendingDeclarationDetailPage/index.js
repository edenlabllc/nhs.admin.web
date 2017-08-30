import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';

import { H2 } from 'components/Title';
import Line from 'components/Line';
import Button, { ButtonsGroup } from 'components/Button';
import Gallery from 'components/Gallery';
import { Confirm } from 'components/Popup';

import DeclarationDetail from 'containers/blocks/DeclarationDetail';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import { getDeclaration, getScope } from 'reducers';
import { hasScope } from 'helpers/scope';

import { approveDeclaration, rejectDeclaration, getDeclarationImage } from 'redux/declarations';

import { fetchDeclaration } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@withRouter
@provideHooks({
  fetch: ({ dispatch, getState, params: { id } }) => {
    const promises = [dispatch(fetchDeclaration(id))];
    const state = getState();

    if (hasScope('declaration_documents:read', getScope(state))) {
      promises.push(dispatch(getDeclarationImage(id)).catch(e => e));
    }

    return Promise.all(promises);
  },
})
@connect((state, { params: { id } }) => ({
  declaration: getDeclaration(state, id),
}), { approveDeclaration, rejectDeclaration })
export default class PendingDeclarationDetailPage extends React.Component {
  state = {
    showApproveConfirm: false,
    showRejectConfirm: false,
  };

  approve() {
    this.setState({ showApproveConfirm: false });
    this.props.approveDeclaration(this.props.params.id).then(() => {
      this.props.router.goBack();
    });
  }

  reject() {
    this.setState({ showRejectConfirm: false });
    this.props.rejectDeclaration(this.props.params.id).then(() => {
      this.props.router.goBack();
    });
  }

  render() {
    const { declaration = { }, t } = this.props;

    return (
      <div id="declaration-detail-page">
        <DeclarationDetail declaration={declaration} />

        <Line />

        <ShowWithScope scope="declaration_documents:read">
          { declaration.images && (
            <div>
              <H2>{ t('Scans') }</H2>
              <Gallery images={declaration.images} />
              <Line />
            </div>
          )}
        </ShowWithScope>
        <ShowWithScope scope="declaration:write">
          <div>
            <ButtonsGroup>
              <Button theme="border" onClick={() => this.setState({ showRejectConfirm: true })} color="red">
                { t('Reject') }
              </Button>
              <Button theme="border" onClick={() => this.setState({ showApproveConfirm: true })} color="green">
                { t('Accept') }
              </Button>
            </ButtonsGroup>
            <Confirm
              title={t('Approve declaration?')}
              active={this.state.showApproveConfirm}
              theme="success"
              cancel={t('Cancel')}
              confirm={t('Yes')}
              onCancel={() => this.setState({ showApproveConfirm: false })}
              onConfirm={() => this.approve()}
            />

            <Confirm
              title={t('Reject declaration?')}
              active={this.state.showRejectConfirm}
              theme="error"
              cancel={t('Cancel')}
              confirm={t('Yes')}
              onCancel={() => this.setState({ showRejectConfirm: false })}
              onConfirm={() => this.reject()}
            />
          </div>
        </ShowWithScope>
      </div>
    );
  }
}
