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
    const promises = [dispatch(fetchDeclaration(id))];
    const state = getState();

    if (hasScope("declaration_documents:read", getScope(state))) {
      promises.push(dispatch(getDeclarationImage(id)).catch(e => e));
    }

    return Promise.all(promises);
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
