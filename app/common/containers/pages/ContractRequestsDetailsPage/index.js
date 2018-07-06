import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";

import ContractDetail from "containers/blocks/ContractDetail";
import SignContract from "containers/blocks/SignContract";
import ContractForm from "containers/forms/ContractForm";

import { getContract } from "reducers";
import { updateContract, signNhs } from "redux/contracts";

import { fetchContractRequest, getContractPrintoutContent } from "./redux";

class ContractRequestsDetailsPage extends React.Component {
  state = {
    isOpenSignForm: false
  };
  render() {
    if (!this.props.contract) return null;
    const {
      contract,
      getContractPrintoutContent,
      updateContract,
      params: { id }
    } = this.props;
    const {
      nhs_signer,
      nhs_signer_base,
      nhs_contract_price,
      nhs_payment_method,
      issue_city
    } = contract;
    return (
      <div id="contract-detail-page">
        <ContractDetail
          contract={contract}
          getPrintoutContent={getContractPrintoutContent}
          isOpenSignForm={this.state.isOpenSignForm}
        />
        {contract.status === "NEW" && (
          <ContractForm
            contract={contract}
            onSubmit={v => updateContract(id, v)}
            initialValues={{
              nhs_signer_id: (nhs_signer && nhs_signer.id) || "",
              nhs_signer_base: nhs_signer_base || "",
              nhs_contract_price: nhs_contract_price || "",
              nhs_payment_method: nhs_payment_method || "",
              issue_city: issue_city || ""
            }}
            key="form"
          />
        )}
        {contract.status === "PENDING_NHS_SIGN" && (
          <SignContract
            contract={contract}
            signNhs={this.props.signNhs}
            openSignForm={this.openSignForm}
            isOpenedSignForm={this.state.isOpenSignForm}
            getPrintoutContent={getContractPrintoutContent}
          />
        )}
      </div>
    );
  }
  openSignForm = () => {
    this.setState(({ isOpenSignForm }) => ({
      isOpenSignForm: !isOpenSignForm
    }));
  };
}

export default compose(
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, params: { id } }) => dispatch(fetchContractRequest(id))
  }),
  connect(
    (state, { params: { id } }) => ({
      contract: getContract(state, id)
    }),
    { getContractPrintoutContent, updateContract, signNhs }
  )
)(ContractRequestsDetailsPage);