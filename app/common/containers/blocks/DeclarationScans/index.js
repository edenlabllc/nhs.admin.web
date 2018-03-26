import React from "react";
import { translate } from "react-i18next";

import { H2 } from "components/Title";
import Line from "components/Line";
import Gallery from "components/Gallery";
import ShowWithScope from "containers/blocks/ShowWithScope";

import { getDeclaration, getScope } from "reducers";
import { hasScope } from "helpers/scope";

import { getDeclarationImage } from "redux/declarations";

@translate()
export default class DeclarationScans extends React.Component {
  render() {
    const { declaration = {}, t } = this.props;
    console.log(declaration.images);
    return (
      <ShowWithScope scope="declaration_documents:read">
        {declaration.images ? (
          <div>
            <H2>{t("Scans")}</H2>

            <Gallery images={declaration.images} />
            <Line />
          </div>
        ) : null}
      </ShowWithScope>
    );
  }
}
