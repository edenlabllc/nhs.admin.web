import React from "react";
import { translate } from "react-i18next";

const YesNo = ({ bool, t }) => <span>{bool ? t("Yes") : t("No")}</span>;

export default translate()(YesNo);
