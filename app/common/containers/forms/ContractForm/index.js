import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import { reduxForm, Field, getFormValues } from "redux-form";

import { SIGN_URL } from "config";

import FieldInput from "components/reduxForm/FieldInput";
import FieldSelect from "components/reduxForm/FieldSelect";
import FieldTextarea from "components/reduxForm/FieldTextarea";
import { FormRow, FormColumn } from "components/Form";

import { getEmployees } from "reducers";
import {
  declineContract,
  approveContract,
  fetchContractEmployees
} from "redux/contracts";

import { SelectUniversal } from "components/SelectUniversal";
import Button from "components/Button";

import ShowWithScope from "containers/blocks/ShowWithScope";
import { Signer } from "vendor/react-iit-digital-signature/src";

import styles from "./styles.scss";

const DeclineFormView = ({
  toggleDecline,
  signData,
  declineContract,
  values,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form}>
        <div>
          <div className={styles.label}>Причина відхилення запиту</div>
          <Field
            name="status_reason"
            component={FieldTextarea}
            placeholder="Будь ласка, вкажіть причину"
          />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <div className={styles.button}>
          <Button
            theme="border"
            size="middle"
            color="red"
            onClick={toggleDecline}
          >
            Відміна
          </Button>
        </div>
        <div className={styles.button}>
          <Button type="submit" theme="border" size="middle" color="red">
            Відхилити, наклавши ЕЦП
          </Button>
        </div>
      </div>
    </form>
  );
};

const DeclineForm = compose(
  reduxForm({
    form: "contract-request-decline-form"
  })
)(DeclineFormView);

class ContractForm extends React.Component {
  state = {
    decline: false,
    updateFormError: false,
    employees: []
  };
  async componentDidMount() {
    try {
      const {
        payload: { data: employees }
      } = await this.props.fetchContractEmployees({
        employee_type: "NHS"
      });
      this.setState({
        employees
      });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const {
      contract: {
        id,
        contractor_legal_entity: { edrpou, id: cleId, name },
        nhs_signer,
        nhs_signer_base,
        nhs_contract_price,
        nhs_payment_method,
        issue_city
      },
      handleSubmit,
      onSubmit = () => {},
      submitting,
      paymentMethod,
      declineContract,
      approveContract
    } = this.props;

    const { values: { BACKWARD, FORWARD } } = paymentMethod;
    const fullName = obj =>
      [obj.last_name, obj.first_name, obj.second_name].join(" ");
    const data = {
      id,
      contractor_legal_entity: {
        id: cleId,
        name,
        edrpou
      },
      text:
        "Увага! Затверджуючи запит, ПІДТВЕРДЖУЄТЕ дійсність намірів, а також те, що він не носить характеру мнимого та удаваного і не є правочином зловмисним, а також що зміст правочину ВІДПОВІДАЄ ВАШІЇЙ ВОЛІ ТА ПІДПИСАНИЙ ОСОБИСТО ВАМИ."
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <div>
              <Field
                name="nhs_signer_id"
                labelText="Підписант зі сторони Замовника"
                component={FieldSelect}
                options={this.state.employees.map(({ id, party }) => ({
                  name: id,
                  title: fullName(party)
                }))}
                labelBold
              />
            </div>
            <div>
              <Field
                name="nhs_signer_base"
                labelText="Що діє на підставі"
                component={FieldInput}
                placeholder="Вкажіть підставу"
                label_bold
              />
            </div>
            <div>
              <Field
                parse={val =>
                  isNaN(parseInt(val, 10)) ? null : parseInt(val, 10)
                }
                name="nhs_contract_price"
                labelText="Ціна договору"
                component={FieldInput}
                placeholder="1 - 1 000 000 000"
                label_bold
              />
            </div>
            <div>
              <Field
                name="nhs_payment_method"
                labelText="Спосіб оплати"
                component={FieldSelect}
                options={[
                  {
                    title: BACKWARD,
                    name: "BACKWARD"
                  },
                  {
                    title: FORWARD,
                    name: "FORWARD"
                  }
                ]}
                labelBold
              />
            </div>
            <div>
              <Field
                name="issue_city"
                labelText="Вкажіть місто"
                component={FieldInput}
                placeholder="Вкажіть"
                label_bold
              />
            </div>
            {this.state.updateFormError && (
              <div className={styles.error}>
                Не всі поля заповнені. Заповніть будь-ласка поля
              </div>
            )}
          </div>
          <ShowWithScope scope="contract_request:update">
            <div className={styles.buttonGroup}>
              <div className={styles.button}>
                <Button
                  theme="border"
                  size="middle"
                  color="orange"
                  type="submit"
                  disabled={submitting}
                  onClick={() => {
                    this.setState({
                      updateFormError: false
                    });
                  }}
                >
                  {submitting ? "Збереження" : "Зберегти зміни"}
                </Button>
              </div>
              <div className={styles.button}>
                <Button
                  theme="border"
                  size="middle"
                  color="red"
                  type="button"
                  onClick={() =>
                    this.setState({
                      decline: !this.state.decline,
                      approve: false
                    })
                  }
                >
                  Відхилити запит
                </Button>
              </div>
              <div className={styles.button}>
                <Button
                  size="middle"
                  color="orange"
                  type="button"
                  onClick={() =>
                    this.setState({
                      approve: !this.state.approve,
                      decline: false
                    })
                  }
                >
                  Затвердити запит
                </Button>
              </div>
            </div>
          </ShowWithScope>
        </form>
        {this.state.approve && (
          <Signer.Parent url={SIGN_URL} features={{ width: 640, height: 589 }}>
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
                          approve: !this.state.approve
                        })
                      }
                    >
                      Відміна
                    </Button>
                  </div>
                  <div className={styles.button}>
                    <Button
                      theme="border"
                      size="middle"
                      color="orange"
                      onClick={() => {
                        if (
                          nhs_signer &&
                          nhs_signer_base &&
                          nhs_contract_price &&
                          nhs_payment_method &&
                          issue_city
                        ) {
                          signData(data).then(({ signedContent }) => {
                            if (signedContent) {
                              approveContract(id, {
                                signed_content: signedContent,
                                signed_content_encoding: "base64"
                              });
                            }
                          });
                        } else {
                          this.setState({
                            updateFormError: true
                          });
                        }
                      }}
                    >
                      Затвердити, наклавши ЕЦП
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Signer.Parent>
        )}
        {this.state.decline && (
          <Signer.Parent url={SIGN_URL} features={{ width: 640, height: 589 }}>
            {({ signData }) => (
              <DeclineForm
                onSubmit={async values => {
                  const { signedContent } = await signData({
                    ...data,
                    status_reason: values.status_reason
                  });
                  if (signedContent) {
                    declineContract(id, {
                      signed_content: signedContent,
                      signed_content_encoding: "base64"
                    });
                  }
                }}
                toggleDecline={this.toggleDecline}
              />
            )}
          </Signer.Parent>
        )}
      </div>
    );
  }
  toggleDecline = () => this.setState({ decline: !this.state.decline });
}

export default compose(
  reduxForm({
    form: "contract-request-update-form"
  }),
  connect(
    state => ({
      values: getFormValues("contract-request-update-form")(state),
      paymentMethod: state.data.dictionaries.CONTRACT_PAYMENT_METHOD
    }),
    { declineContract, approveContract, fetchContractEmployees }
  )
)(ContractForm);
