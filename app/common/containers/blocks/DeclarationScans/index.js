import React from "react";

import { H2 } from "components/Title";
import Line from "components/Line";
import Gallery from "components/Gallery";
import ShowWithScope from "containers/blocks/ShowWithScope";

import { getDeclaration, getScope } from "reducers";
import { hasScope } from "helpers/scope";

import { getDeclarationImage } from "redux/declarations";

export default class DeclarationScans extends React.Component {
  render() {
    const { declaration = {} } = this.props;

    return (
      <ShowWithScope scope="declaration_documents:read">
        {declaration.images ? (
          <div>
            <H2>Скани документів</H2>

            <Gallery images={declaration.images} />
            <Line />
          </div>
        ) : null}
      </ShowWithScope>
    );
  }
}
