import React from "react";
import { Signer } from "vendor/react-iit-digital-signature/src";
import { SIGN_URL } from "config";

import Button from "components/Button";
import styles from "./styles.scss";

export default class SignContract extends React.Component {
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
      getPrintoutContent,
      signNhs,
      isOpenedSignForm,
      openSignForm
    } = this.props;
    delete contract.urgent;
    return (
      <div>
        <Button
          size="middle"
          color="orange"
          type="button"
          onClick={() => {
            getPrintoutContent(contract.id);
            openSignForm();
          }}
        >
          Оформити, наклавши ЕЦП
        </Button>
        {isOpenedSignForm && (
          <div>
            <iframe className={styles.iframe} id="contract" name="contract" />
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
                        onClick={() => openSignForm()}
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
                              signNhs(contract.id, {
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
    );
  }
}
