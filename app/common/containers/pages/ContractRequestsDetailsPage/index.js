import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";

import { Signer } from "vendor/react-iit-digital-signature/src";
import { SIGN_URL } from "config";

import ContractDetail from "containers/blocks/ContractDetail";
import ContractForm from "containers/forms/ContractForm";

import { getContract } from "reducers";
import { updateContract, signNhs } from "redux/contracts";

import { fetchContractRequest, getContractPrintoutContent } from "./redux";

import Button from "components/Button";
import styles from "./styles.scss";

class ContractRequestsDetailsPage extends React.Component {
  state = {
    approveSign: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.contract && nextProps.contract.printout_content) {
      const contractFrame = window.frames["contract"];
      if (contractFrame) {
        contractFrame.document.write(nextProps.contract.printout_content);
      }
    }
  }
  render() {
    const {
      contract,
      getContractPrintoutContent,
      updateContract,
      signNhs,
      params: { id }
    } = this.props;
    if (!contract) return null;
    return (
      <div id="contract-detail-page">
        <ContractDetail
          contract={contract}
          getPrintoutContent={getContractPrintoutContent}
        />
        {contract.status === "NEW" && (
          <ContractForm
            contract={contract}
            onSubmit={v => updateContract(id, v)}
            key="form"
          />
        )}
        {contract.status === "PENDING_NHS_SIGN" && (
          <div>
            <Button
              size="middle"
              color="orange"
              type="button"
              onClick={() => {
                getContractPrintoutContent(id);
                this.setState({
                  approveSign: !this.state.approveSign
                });
              }}
            >
              Оформити, наклавши ЕЦП
            </Button>
            {this.state.approveSign && (
              <div>
                <iframe
                  className={styles.iframe}
                  id="contract"
                  name="contract"
                />
                <Signer.Parent
                  url={SIGN_URL}
                  features={{ width: 640, height: 589 }}
                >
                  {({ signData }) => (
                    <div>
                      <div>
                        <br />
                        <b>
                          {"Увага!\n" +
                            "Затверджуючи запит, ПІДТВЕРДЖУЄТЕ дійсність намірів, " +
                            "а також те, що він не носить характеру мнимого та удаваного " +
                            "і не є правочином зловмисним, а також що зміст правочину " +
                            "ВІДПОВІДАЄ ВАШІЇЙ ВОЛІ ТА ПІДПИСАНИЙ ОСОБИСТО ВАМИ."}
                        </b>
                      </div>
                      <br />
                      <div className={styles.buttonGroup}>
                        <div className={styles.button}>
                          <Button
                            theme="border"
                            size="middle"
                            color="orange"
                            onClick={() =>
                              this.setState({
                                approveSign: !this.state.approveSign
                              })
                            }
                          >
                            Відміна
                          </Button>
                        </div>
                        <div className={styles.button}>
                          <Button
                            size="middle"
                            color="orange"
                            onClick={() => {
                              signData(contract).then(({ signedContent }) => {
                                if (signedContent) {
                                  signNhs(id, {
                                    signed_content: signedContent,
                                    signed_content_encoding: "base64"
                                  });
                                }
                              });
                            }}
                          >
                            Затвердити, наклавши ЕЦП
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Signer.Parent>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
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
