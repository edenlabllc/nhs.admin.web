import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { provideHooks } from "redial";

import ContractDetail from "containers/blocks/ContractDetail";

import { getContract } from "reducers";
import { hasScope } from "helpers/scope";

import { fetchContract } from "./redux";

class ContractDetailsPage extends React.Component {
  render() {
    const { contract = {} } = this.props;
    return (
      <div id="contract-detail-page">
        <ContractDetail contract={contract} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  provideHooks({
    fetch: ({ dispatch, getState, params: { id } }) =>
      dispatch(fetchContract(id))
  }),
  connect((state, { params: { id } }) => ({
    contract: getContract(state, id)
  }))
)(ContractDetailsPage);
