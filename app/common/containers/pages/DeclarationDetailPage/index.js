import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";

import { H2 } from "components/Title";
import DeclarationDetail from "containers/blocks/DeclarationDetail";
import DeclarationScans from "containers/blocks/DeclarationScans";
import Line from "components/Line";

import { getDeclaration, getScope } from "reducers";
import { hasScope } from "helpers/scope";

import { getDeclarationImage } from "redux/declarations";

import { fetchDeclaration } from "./redux";

@translate()
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
@connect((state, { params: { id } }) => ({
  declaration: getDeclaration(state, id)
}))
export default class DeclarationDetailPage extends React.Component {
  render() {
    const { declaration = {} } = this.props;
    return (
      <div id="declaration-detail-page">
        <DeclarationDetail declaration={declaration} />

        <Line />

        <DeclarationScans declaration={declaration} />
      </div>
    );
  }
}
