import React from "react";
import { translate } from "react-i18next";
import {
  addValidation,
  ErrorMessages,
  ErrorMessage
} from "react-nebo15-validate";

import isUuidValid from "helpers/validators/uuid";

addValidation("uuid", isUuidValid);

@translate()
export default class ErrorMessagesTranslated extends React.Component {
  render() {
    const { children, t, ...rest } = this.props;
    return (
      <ErrorMessages {...rest}>
        {children}
        <ErrorMessage when="required">{t("Required field")}</ErrorMessage>
        <ErrorMessage when="email">{t("Invalid email format")}</ErrorMessage>
        <ErrorMessage when="userName">{t("Invalid surname")}</ErrorMessage>
        <ErrorMessage when="maxLength">
          {t("Length must be less than <%= params %>")}
        </ErrorMessage>
        <ErrorMessage when="card_number">
          {t("Invalid card number")}
        </ErrorMessage>
        <ErrorMessage when="uniqueCardName">
          {t("Card with such names already exist")}
        </ErrorMessage>
        <ErrorMessage when="uniqueCardNumber">
          {t("Card with such number already exist")}
        </ErrorMessage>
        <ErrorMessage when="cardType">
          {t("Support only {{types}} cards", {
            types:
              this.props.error.cardType && this.props.error.cardType.join(", ")
          })}
        </ErrorMessage>
        <ErrorMessage when="min">
          {t("Minimal value is <%= params %>")}
        </ErrorMessage>
        <ErrorMessage when="max">
          {t("Maximum value is <%= params %>")}
        </ErrorMessage>

        <ErrorMessage when="accountPasswordMismatch">
          {t("Account, password combination is mismatch")}
        </ErrorMessage>
        <ErrorMessage when="uuid">Некоректний формат ID</ErrorMessage>
      </ErrorMessages>
    );
  }
}
