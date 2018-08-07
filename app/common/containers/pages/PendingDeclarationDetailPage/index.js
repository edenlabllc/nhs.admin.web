import React from "react";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import withStyles from "withStyles";

import { H2 } from "components/Title";
import Line from "components/Line";
import Button, { ButtonsGroup } from "components/Button";
import { Confirm } from "components/Popup";

import DeclarationDetail from "containers/blocks/DeclarationDetail";
import DeclarationScans from "containers/blocks/DeclarationScans";

import ShowWithScope from "containers/blocks/ShowWithScope";

import { getDeclaration, getScope } from "reducers";
import { hasScope } from "helpers/scope";

import {
  approveDeclaration,
  rejectDeclaration,
  getDeclarationImage
} from "redux/declarations";

import { fetchDeclaration } from "./redux";

import styles from "./styles.scss";

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, getState, params: { id } }) => {
    const canReadDocuments = hasScope(
      "declaration_documents:read",
      getScope(getState())
    );

    return Promise.all([
      dispatch(fetchDeclaration(id)),
      canReadDocuments && dispatch(getDeclarationImage(id))
    ]);
  }
})
@connect(
  (state, { params: { id } }) => ({
    declaration: getDeclaration(state, id)
  }),
  { approveDeclaration, rejectDeclaration }
)
export default class PendingDeclarationDetailPage extends React.Component {
  state = {
    showApproveConfirm: false,
    showRejectConfirm: false
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
    const { declaration = {} } = this.props;

    return (
      <div id="declaration-detail-page">
        <DeclarationDetail declaration={declaration} />

        <Line />

        <DeclarationScans declaration={declaration} />

        <ShowWithScope scope="declaration:write">
          <div>
            <ButtonsGroup>
              <Button
                theme="border"
                onClick={() => this.setState({ showRejectConfirm: true })}
                color="red"
              >
                Відхилити
              </Button>
              <Button
                theme="border"
                onClick={() => this.setState({ showApproveConfirm: true })}
                color="green"
              >
                Прийняти
              </Button>
            </ButtonsGroup>
            <Confirm
              title="Прийняти декларацію?"
              active={this.state.showApproveConfirm}
              theme="success"
              cancel="Скасувати"
              confirm="Так"
              onCancel={() => this.setState({ showApproveConfirm: false })}
              onConfirm={() => this.approve()}
            />

            <Confirm
              title="Відхилити декларацію?"
              active={this.state.showRejectConfirm}
              theme="error"
              cancel="Скасувати"
              confirm="Так"
              onCancel={() => this.setState({ showRejectConfirm: false })}
              onConfirm={() => this.reject()}
            />
          </div>
        </ShowWithScope>
      </div>
    );
  }
}
